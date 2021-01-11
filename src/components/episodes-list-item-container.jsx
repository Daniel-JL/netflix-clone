import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import getEpisodeData from '../helpers/getEpisodeData';
import EpisodesListItem from './episodes-list-item';

function EpisodesListItemContainer(props) {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [episodeName, setEpisodeName] = useState();
  const [episodeDescription, setEpisodeDescription] = useState();
  const [runtime, setRuntime] = useState('');

  const fetchEpisodeData = async () => {
    // const data = await getEpisodeData(props.mediaId, props.seasonNum, props.episodeNum);
    console.log(props.episodeData);
    setEpisodeName((episodeName) => props.episodeData.name);
    setEpisodeDescription((episodeDescription) => props.episodeData.overview);

    setDataLoaded(true);
  };

  useEffect(() => {
    if (!dataLoaded) {
      fetchEpisodeData();
    }
  }, []);

  return (
    <div>
      {dataLoaded
      && (
      <EpisodesListItem
        episodeName={episodeName}
        episodeDescription={episodeDescription}
      />
      )}
    </div>
  );
}

export default EpisodesListItemContainer;
