/* eslint-disable import/prefer-default-export */
import React from 'react';
import {
  Link,
  useLocation,
} from 'react-router-dom';
import styled from 'styled-components';
import {
  RoundPlayButton,
  RoundPlusButton,
  RoundThumbsUpButton,
  RoundThumbsDownButton,
  RoundEpsAndInfoButton,
} from './buttons';

const ISliderItemProps = {
  mediaName: 'name',
  imageID: 1,
  maturityRating: 'rating',
  numOfSeasons: 1,
};

const ItemContainer = styled.div`
  position: relative;
  height: 139px;
  width: 250px;
  border: 1px solid black;
  transition: width 0.2s, height 0.2s;

  ${({ active }) => active && `
    width: 400px;
    height: 222px;
    z-index: 2;
  `}
`;

const SliderItemImage = styled.img`
  width: 100%;
  height: 100%;
`;

const ItemDetails = styled.div`
  visibility: hidden;
  background-color: gray;

  ${({ active }) => active && `
    visibility: visible;
  `}
`;

export function SliderItem(props) {
  const location = useLocation();

  return (
    <ItemContainer
      onMouseOver={() => props.handleMouseOver()}
      onMouseOut={() => props.handleMouseOut()}
      active={props.itemHoverActive}
    >

      {props.dataLoaded && !props.imgLoadingErr
      && (
      <SliderItemImage
        alt="Slider image"
        src={props.posterPath}
        onError={() => props.setImgLoadingErr()}
        onLoad={() => props.setImgLoadSuccess()}
      />
      )}

      {props.imgLoadedSuccess
      && <div id="imgSuccess" data-testid="imgSuccess" />}

      <ItemDetails active={props.itemHoverActive}>
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
            <RoundEpsAndInfoButton>v</RoundEpsAndInfoButton>
          </Link>
        </div>
        <div id="media-info">
          {props.ageRating}
          {' '}
          {props.runtimeOrNumberOfSeasons}
        </div>
        <div id="genres">
          {props.genres[0]}
          {' '}
          *
          {' '}
          {props.genres[1]}
        </div>
      </ItemDetails>
    </ItemContainer>
  );
}
