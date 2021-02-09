/* eslint-disable import/prefer-default-export */
import React from 'react';
import {
  Link,
  useLocation,
  Route,
} from 'react-router-dom';
import styled from 'styled-components';
import {
  RoundPlayButton,
  RoundPlusButton,
  RoundThumbsUpButton,
  RoundThumbsDownButton,
  RoundEpsAndInfoButton,
} from '../buttons';
import { EpisodesAndInfoBox } from '../episodes-and-info-box/episodes-and-info-box';
import { Modal } from '../modal';

const ISliderItemProps = {
  mediaName: 'name',
  imageID: 1,
  maturityRating: 'rating',
  numOfSeasons: 1,
};

const ItemContainer = styled.div`
  position: relative;
  // height: 139px;
  width: 100%
  border: 1px solid black;
  // transition: width 0.2s, height 0.2s;

  ${({ active }) => active && `
    transition: all .2s ease-in-out;
    transform: scale(1.6);
    // width: 400px;
    // height: 222px;
    z-index: 10;
  `}
`;

const SliderItemImage = styled.img`
  width: 100%;
  height: 100%;
`;

const ItemDetails = styled.div`
  // visibility: hidden;
  background-color: gray;

  ${({ active }) => active && `
    visibility: visible;
  `}
`;

export function SliderItem({
  ageRating,
  genres,
  imgLoadedSuccess,
  imgLoadingErr,
  dataLoaded,
  posterPath,
  runtimeOrNumberOfSeasons,
  itemHoverActive,
  handleMouseOver,
  handleMouseOut,
  setImgLoadingErr,
  setImgLoadSuccess,
  handleEpsAndInfoButtonClick,
}) {
  const location = useLocation();

  return (
    <ItemContainer
      onMouseOver={() => handleMouseOver()}
      onMouseOut={() => handleMouseOut()}
      active={itemHoverActive}
    >

      {dataLoaded && !imgLoadingErr
      && (
        <SliderItemImage
          alt="Slider image"
          src={posterPath}
          onError={() => setImgLoadingErr()}
          onLoad={() => setImgLoadSuccess()}
        />
      )}

      {imgLoadedSuccess
      && <div id="imgSuccess" data-testid="imgSuccess" />}

      {itemHoverActive
      && (
      <ItemDetails >
        <div id="buttons">
          <RoundPlayButton />
          <Link
            key={1}
            to={{
              pathname: '/browse/epsinfobox',
              state: { background: location },
            }}
          >
            <RoundEpsAndInfoButton onClick={handleEpsAndInfoButtonClick}>
              v
            </RoundEpsAndInfoButton>
          </Link>
        </div>
        <div id="media-info">
          {ageRating}
          {' '}
          {runtimeOrNumberOfSeasons > 1 && `${runtimeOrNumberOfSeasons} Seasons`}
          {runtimeOrNumberOfSeasons === 1 && `${runtimeOrNumberOfSeasons} Season`}
        </div>
        <div id="genres">
          {genres[0]}
          {' '}
          *
          {' '}
          {genres[1]}
        </div>
      </ItemDetails>
      )}
      {/* <ItemDetails active={itemHoverActive}>
        <div id="buttons">
          <RoundPlayButton />
          <RoundPlusButton />
          <RoundThumbsUpButton />
          <RoundThumbsDownButton />
          <Link
            key={1}
            to={{
              pathname: '/browse/epsinfobox',
              state: { background: location },
            }}
          >
            <RoundEpsAndInfoButton onClick={handleEpsAndInfoButtonClick}>
              v
            </RoundEpsAndInfoButton>
          </Link>
        </div>
        <div id="media-info">
          {ageRating}
          {' '}
          {runtimeOrNumberOfSeasons > 1 && `${runtimeOrNumberOfSeasons} Seasons`}
          {runtimeOrNumberOfSeasons === 1 && `${runtimeOrNumberOfSeasons} Season`}
        </div>
        <div id="genres">
          {genres[0]}
          {' '}
          *
          {' '}
          {genres[1]}
        </div>
      </ItemDetails> */}
    </ItemContainer>

  );
}
