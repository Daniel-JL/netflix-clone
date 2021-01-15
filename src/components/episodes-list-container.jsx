import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import getSeasonData from '../helpers/getSeasonData';
import EpisodesList from './episodes-list';

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

  const fetchAllSeasonData = async () => {
    const data = await getSeasonData(props.mediaId, props.numSeasons);
    console.log(data);

    for (let i = 0; i < data.length; i++) {
      setSeasonEpisodeData((seasonEpisodeData) => [...seasonEpisodeData,
        {
          seasonNum: i + 1,
          episodeData: data[i].episodes,
        },
      ]);
      // setEpsPerSeason((epsPerSeason) => [...epsPerSeason, data[i].episodes.length]);
    }
    setDataLoaded(true);
  };

  const changeSelectedSeason = (newSelectedSeason) => {
    setSelectedSeason((selectedSeason) => newSelectedSeason);
  };

  useEffect(() => {
    if (!dataLoaded) {
      fetchAllSeasonData();
    }
  }, []);

  useEffect(() => {
    if (dataLoaded) {
      console.log(seasonEpisodeData);
      console.log(selectedSeason);
    }
  });

  return (
    <Container>
      {dataLoaded
      && (
        <EpisodesList
          mediaId={props.mediaId}
          seasonEpisodeData={seasonEpisodeData}
          selectedSeason={selectedSeason}
          changeSelectedSeason={changeSelectedSeason}
          dataLoaded={dataLoaded}
        />
      )}
    </Container>
  );
}

export default EpisodesListContainer;
