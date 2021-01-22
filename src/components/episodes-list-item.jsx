import React, { useState } from 'react';
import styled from 'styled-components';

const ItemContainer = styled.div`
  width: 100%;
  border: 1px solid black;
  display: flex;
  align-items: center;
  
`;

const ImgContainer = styled.div`
  width: 10vw;
  margin: 10px;

`;

const EpisodeImage = styled.img`
  width: 10vw;
`;

const EpisodeDetailsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin: 5px;
  
`;

const EpisodeTitleRuntimeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 80%;
`;

const EpisodeDescriptionContainer = styled.div`
  font-size: 70%;
`;

function EpisodesListItem(props) {

  return (
    <ItemContainer id="episodes-list-item">
      {props.episodeNumber}
      {!props.imgLoadingErr
      && (
        <ImgContainer>
          <EpisodeImage
            alt="Slider image"
            src={props.imagePath}
            onError={() => props.handleImgLoadingErr()}
            onLoad={
              () => props.handleImgLoadedSuccess()
            }
          />
        </ImgContainer>
      )}
      <EpisodeDetailsContainer>
        <EpisodeTitleRuntimeContainer>
          <div>
            {props.episodeName}
          </div>
          <div>
            23m
          </div>
        </EpisodeTitleRuntimeContainer>
        <EpisodeDescriptionContainer>
          {props.episodeDescription}
        </EpisodeDescriptionContainer>
      </EpisodeDetailsContainer>
    </ItemContainer>
  );
}

export default EpisodesListItem;
