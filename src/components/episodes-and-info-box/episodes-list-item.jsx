import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Link,
} from 'react-router-dom';

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

function EpisodesListItem({
  episodeNumber,
  episodeName,
  episodeDescription,
  imagePath,
  imgLoadedSuccess,
  imgLoadingErr,
  handleImgLoadingErr,
  handleImgLoadedSuccess,
}) {

  return (
    <Link
      key={1}
      to="/watch"
      style={{ color: 'inherit', textDecoration: 'inherit'}}
    >
      <ItemContainer id="episodes-list-item">
        {episodeNumber}
        {!imgLoadingErr
        && (
          <ImgContainer>
            <EpisodeImage
              alt="Slider image"
              src={imagePath}
              onError={() => handleImgLoadingErr()}
              onLoad={
                () => handleImgLoadedSuccess()
              }
            />
          </ImgContainer>
        )}
        <EpisodeDetailsContainer>
          <EpisodeTitleRuntimeContainer>
            <div>
              {episodeName}
            </div>
            <div>
              23m
            </div>
          </EpisodeTitleRuntimeContainer>
          <EpisodeDescriptionContainer>
            {episodeDescription}
          </EpisodeDescriptionContainer>
        </EpisodeDetailsContainer>
      </ItemContainer>
    </Link>
    
  );
}

export default EpisodesListItem;
