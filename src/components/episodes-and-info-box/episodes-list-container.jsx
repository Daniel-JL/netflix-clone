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
  justify-self: center;
  padding-top: 0.6vw;
  margin: auto;
`;

function EpisodesListContainer({
  mediaId,
  numSeasons,
}) {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [seasonEpisodeData, setSeasonEpisodeData] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [seasonDataNeedsLoading, setSeasonDataNeedsLoading] = useState(false);
  const [episodesListItemData, setEpisodesListItemData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alreadyLoaded, setAlreadyLoaded] = useState(false);

  const fetchAllSeasonData = async () => {
    const data = await getSeasonData(mediaId, numSeasons);
    setIsLoading((isLoading) => true);

    handleSeasonEpisodeData(data);
    setDataLoaded(true);
  };

  const handleSeasonEpisodeData = (data) => {
    const validEpisodes = [];
    let episodeAirDate;
    let todaysDate = new Date();

    const dd = String(todaysDate.getDate()).padStart(2, '0');
    const mm = String(todaysDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = todaysDate.getFullYear();
    todaysDate = yyyy + '/' + mm + '/' + dd;

    for (let i = 0; i < data.length; i++) {
      validEpisodes.push([]);
      if (data[i].episodes) {
        for (let j = 0; j < data[i].episodes.length; j++) {
          episodeAirDate = data[i].episodes[j].air_date.replace(/-/g,'/');
          if (episodeAirDate < todaysDate) {
            validEpisodes[i].push(data[i].episodes[j]);
          }
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
        mediaId={mediaId}
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
      console.log(episodesListItemDataCopy);

      episodesListItemDataCopy[season - 1].episodeListItems = [
        ...Array(seasonEpisodeData[season - 1].episodeData.length),
      ].map((undefined, index) => (
        <EpisodesListItemContainer
          key={index}
          mediaId={mediaId}
          episodeNum={index + 1}
          seasonNum={season}
          episodeData={seasonEpisodeData[season - 1].episodeData[index]}
        />
      ));

      setEpisodesListItemData((episodesListItemData) => episodesListItemDataCopy);
    }
    setIsLoading((isLoading) => false);
    setSeasonDataNeedsLoading(false);
  };

  const changeSelectedSeason = (newSelectedSeason) => {
    setIsLoading((isLoading) => true);

    setSelectedSeason((selectedSeason) => newSelectedSeason);

    if (episodesListItemData[newSelectedSeason - 1].episodeListItems.length === 0) {
      setSeasonDataNeedsLoading(true);
    } else {
      setAlreadyLoaded(true);
    }
  };

  useEffect(() => {
    if (!dataLoaded) {
      fetchAllSeasonData();
    }
  }, []);

  useEffect(() => {
    if (seasonEpisodeData.length > 0) {
      initialiseEpisodesListItemData();
    }
  }, [seasonEpisodeData]);

  useEffect(() => {
    if (seasonEpisodeData.length > 0 && seasonDataNeedsLoading === true) {
      loadEpisodeListItemData(selectedSeason);
    }
  }, [seasonDataNeedsLoading]);

  useEffect(() => {
    setIsLoading((isLoading) => false);
    setAlreadyLoaded(false);
  }, [alreadyLoaded]);

  return (
    <Container id="epslistcontainer">
      {dataLoaded
      && (
        <EpisodesList
          mediaId={mediaId}
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
