import React, { useState } from 'react';
import styled from 'styled-components';

const ItemContainer = styled.div`
  width: 100%;
  height: 200px;
  border: 1px solid black;
  display: flex;
  
`;

const EpisodeImage = styled.img`
  width: 17vw;
  height: 10vw;
`;

const EpisodeDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;

`;

const EpisodeTitleRuntimeContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

function EpisodesListItem(props) {

  return (
    <ItemContainer id="episodes-list-item">
      {props.episodeNumber}
      {!props.imgLoadingErr
      && (
        <EpisodeImage
          alt="Slider image"
          src={props.imagePath}
          onError={() => props.setImgLoadingErr()}
          onLoad={() => props.setImgLoadSuccess()}
        />
      )}
      <EpisodeDetailsContainer>
        <EpisodeTitleRuntimeContainer>
          {props.episodeName}
          23m
        </EpisodeTitleRuntimeContainer>
        {props.EpisodeDescription}
      </EpisodeDetailsContainer>
    </ItemContainer>
  );
}

export default EpisodesListItem;
