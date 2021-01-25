import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import getSeasonData from '../../helpers/getSeasonData';
import EpisodesList from './episodes-list';
import EpisodesListItemContainer from './episodes-list-item-container';

const Container = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

function EpisodesListContainer(props) {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [seasonEpisodeData, setSeasonEpisodeData] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [episodesListItemData, setEpisodesListItemData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alreadyLoaded, setAlreadyLoaded] = useState(false);
  const [srcArray, setSrcArray] = useState([]);

  const fetchAllSeasonData = async () => {
    const data = await getSeasonData(props.mediaId, props.numSeasons);
    console.log(data);

    setIsLoading((isLoading) => true);

    handleInitialSrcArray(data);

    handleSeasonEpisodeData(data);
    setDataLoaded(true);
  };

  const handleSeasonEpisodeData = (data) => {
    const validEpisodes = [];

    for (let i = 0; i < data.length; i++) {
      validEpisodes.push([]);
      for (let j = 0; j < data[i].episodes.length; j++) {
        if (data[i].episodes[j].still_path !== null) {
          validEpisodes[i].push(data[i].episodes[j]);
        }
      }
    }

    const seasonEpisodeDataCopy = data.map((undefined, index) => (
      {
        seasonNum: index + 1,
        episodeData: validEpisodes[index],
      }));

    setSeasonEpisodeData((seasonEpisodeData) => seasonEpisodeDataCopy);
  };

  const handleInitialSrcArray = (data) => {
    const srcArrayCopy = data[selectedSeason - 1].episodes.map((undefined, index) => (
      `http://image.tmdb.org/t/p/w780${data[selectedSeason - 1].episodes[index].still_path}`

    ));

    setSrcArray((srcArray) => srcArrayCopy);
  };

  const handleSrcArray = (season) => {
    const srcArrayCopy = seasonEpisodeData[season - 1].episodeData.map((undefined, index) => (
      seasonEpisodeData[season - 1].episodeData[index].still_path
        ? `http://image.tmdb.org/t/p/w780${seasonEpisodeData[season - 1].episodeData[index].still_path}`
        : ''

    ));

    for (let i = 0; i < srcArrayCopy.length; i++) {
      if (srcArrayCopy[i] === '') {
        srcArrayCopy.splice(i, 1);
        i -= 1;
      }
    }

    setSrcArray((srcArray) => srcArrayCopy);
  };

  const initialiseEpisodesListItemData = () => {
    const episodesListItemDataInitial = seasonEpisodeData.map((undefined, index) => (
      {
        seasonNum: index + 1,
        episodeListItems: [],
      }
    ));

    episodesListItemDataInitial[selectedSeason - 1].episodeListItems = [
      ...Array(seasonEpisodeData[selectedSeason - 1].episodeData.length),
    ].map((undefined, index) => (
      <EpisodesListItemContainer
        key={index}
        mediaId={props.mediaId}
        episodeNum={index + 1}
        seasonNum={selectedSeason}
        episodeData={seasonEpisodeData[selectedSeason - 1].episodeData[index]}
      />
    ));
    setIsLoading((isLoading) => false);
    setEpisodesListItemData((episodesListItemData) => episodesListItemDataInitial);
  };

  const loadEpisodeListItemData = (season) => {
    if (episodesListItemData[season - 1].episodeListItems.length === 0) {
      setIsLoading((isLoading) => true);

      const episodesListItemDataCopy = episodesListItemData;

      episodesListItemDataCopy[season - 1].episodeListItems = [
        ...Array(seasonEpisodeData[season - 1].episodeData.length),
      ].map((undefined, index) => (
        <EpisodesListItemContainer
          key={index}
          mediaId={props.mediaId}
          episodeNum={index + 1}
          seasonNum={season}
          episodeData={seasonEpisodeData[season - 1].episodeData[index]}
          // handleImgLoaded={handleImgLoaded}
        />
      ));

      setEpisodesListItemData((episodesListItemData) => episodesListItemDataCopy);
    }
    setIsLoading((isLoading) => false);
  };

  const changeSelectedSeason = (newSelectedSeason) => {
    setIsLoading((isLoading) => true);

    setSelectedSeason((selectedSeason) => newSelectedSeason);

    if (episodesListItemData[newSelectedSeason - 1].episodeListItems.length === 0) {
      handleSrcArray(newSelectedSeason);
    } else {
      setAlreadyLoaded(true);
    }
  };

  const cacheImages = async (srcArray) => {
    const promises = await srcArray.map((src) => new Promise((resolve, reject) => {
      const img = new Image();

      img.src = src;
      img.onload = resolve();
      img.onerror = reject();
    }));

    await Promise.all(promises);
  };

  useEffect(() => {
    if (!dataLoaded) {
      fetchAllSeasonData();
    }
  }, []);

  useEffect(() => {
    if (seasonEpisodeData.length > 0) {
      cacheImages(srcArray);
      initialiseEpisodesListItemData();
    }
  }, [seasonEpisodeData]);

  useEffect(() => {
    if (seasonEpisodeData.length > 0) {
      const cacheTheImages = async () => {
        await cacheImages(srcArray);
      };
      cacheTheImages();
      loadEpisodeListItemData(selectedSeason);
    }
  }, [srcArray]);

  useEffect(() => {
    setAlreadyLoaded((alreadyLoaded) => false);
    setIsLoading((isLoading) => false);
  }, [alreadyLoaded]);

  return (
    <Container>
      {dataLoaded
      && (
        <EpisodesList
          mediaId={props.mediaId}
          seasonEpisodeData={seasonEpisodeData}
          episodesListItemData={episodesListItemData}
          selectedSeason={selectedSeason}
          changeSelectedSeason={changeSelectedSeason}
          dataLoaded={dataLoaded}
          isLoading={isLoading}
        />
      )}
    </Container>
  );
}

export default EpisodesListContainer;
