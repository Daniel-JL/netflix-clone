import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Link,
} from 'react-router-dom';
import EpisodesListItemLoadingSkeleton from './episodes-list-item-loading-skeleton';
import ImageWithOverlay from './image-with-overlay';
import { PlayButton } from '../buttons';

const ItemContainer = styled.div`
  width: 100%;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ItemInfoContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  ${({ imgLoaded }) => !imgLoaded
    && `display: none;`
} 

`;

const ImgContainer = styled.div`
  width: 25%;
  margin: 10px;

`;

const EpisodeImage = styled.img`
  width: 100%;
`;

const ImageButtonContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
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
  font-size: 90%;
`;

const EpisodeDescriptionContainer = styled.div`
  display: inline-block;
  font-size: 80%;
  width: 100%;
  height: 70%;
  max-width: 100%;
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
  mouseOver,
  handleMouseOver,
  handleMouseOut,
}) {
  return (
    <Link
      key={1}
      to="/watch"
      style={{ color: 'inherit', textDecoration: 'inherit'}}
    >
      <ItemContainer 
        id="episodes-list-item" 
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
      >
        {!imgLoadedSuccess && !imgLoadingErr && 
          <EpisodesListItemLoadingSkeleton />
        }
        <ItemInfoContainer imgLoaded={imgLoadedSuccess || imgLoadingErr}>
          {episodeNumber}
          {!imgLoadingErr
          && (
            <ImgContainer>
              <ImageWithOverlay 
                image={<EpisodeImage
                  alt="Slider image"
                  src={imagePath}
                  onError={() => handleImgLoadingErr()}
                  onLoad={
                    () => handleImgLoadedSuccess()
                  }
                />}
                overlayItem={<PlayButton>|></PlayButton>}
                fadeIn={mouseOver}
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
        </ItemInfoContainer>
        
      </ItemContainer>
    </Link>
    
  );
}

export default EpisodesListItem;
