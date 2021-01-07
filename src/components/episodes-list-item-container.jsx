import React, { useState } from 'react';
import styled from 'styled-components';
import getEpisodeData from '../helpers/getEpisodeData';
import EpisodesListItem from './episodes-list-item';

function EpisodesListItemContainer(props) {

  const fetchEpisodeData = async () => {
    const data = await getEpisodeData(props.mediaId, props.seasonNum, props.episodeNum);

  };

  return (
    <EpisodesListItem>
    </EpisodesListItem>
  );
}

export default EpisodesListItemContainer;
