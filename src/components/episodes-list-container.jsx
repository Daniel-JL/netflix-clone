import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import getSeasonData from '../helpers/getSeasonData';
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
  const [epsPerSeason, setEpsPerSeason] = useState([]);
  const [seasonEpisodeData, setSeasonEpisodeData] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [episodesListItemData, setEpisodesListItemData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllSeasonData = async () => {
    const data = await getSeasonData(props.mediaId, props.numSeasons);
    console.log(data);

    const seasonEpisodeDataCopy = data.map((undefined, index) => (
      {
        seasonNum: index + 1,
        episodeData: data[index].episodes,
      }));

    const episodesListItemDataCopy = data.map((undefined, index) => (
      {
        seasonNum: index + 1,
        episodeListItems:
        [
          ...Array(data[index].episodes.length),
        ].map((undefined, inner_index) => (
          <EpisodesListItemContainer
            key={inner_index}
            mediaId={props.mediaId}
            episodeNum={inner_index + 1}
            seasonNum={index}
            episodeData={data[index].episodes[inner_index]}
          />
        )),
      }
    ));

    setSeasonEpisodeData((seasonEpisodeData) => seasonEpisodeDataCopy);
    setEpisodesListItemData((episodesListItemData) => episodesListItemDataCopy);
    setDataLoaded(true);
  };

  const changeSelectedSeason = (newSelectedSeason) => {
    setSelectedSeason((selectedSeason) => newSelectedSeason);
  };

  const toggleIsLoading = () => {
    setIsLoading((isLoading) => !isLoading);
  };

  useEffect(() => {
    if (!dataLoaded) {
      fetchAllSeasonData();
    }
  }, []);

  useEffect(() => {
    if (dataLoaded) {
      console.log(seasonEpisodeData);
      console.log(episodesListItemData);
    }
  });

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
          toggleIsLoading={toggleIsLoading}
        />
      )}
    </Container>
  );
}

export default EpisodesListContainer;
