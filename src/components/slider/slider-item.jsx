/* eslint-disable import/prefer-default-export */
import React, { useRef, useState } from 'react';
import {
  Link,
  useLocation,
  Route,
} from 'react-router-dom';
import styled from 'styled-components';
import ReactCSSTransitionGroup from 'react-transition-group';
import {
  RoundPlayButton,
  RoundEpsAndInfoButton,
} from '../buttons';
import { EpisodesAndInfoBox } from '../episodes-and-info-box/episodes-and-info-box';
import { Modal } from '../modal';

const ItemContainer = styled.div`
  position: relative;
  // height: 139px;
  width: ${({ itemWidth }) => itemWidth}px;
  border: 1px solid black;
  transition: width 0.8s, height 0.8s;
  z-index: 2;


  ${({ active }) => active && `
    transition: all .2s ease-in-out;
    transform: scale(1.2);
    // position: absolute;

  
    // width: 400px;
    // height: 222px;
    // width: 120%;
    // margin-left: -50%;
    // margin-top: -50%;
    // height: 400px;
    z-index: 20;
  `}
`;

const SliderItemImage = styled.img`
  width: 100%;
  height: 100%;
`;

const ItemDetails = styled.div`
  // position: relative;

  // visibility: visible;
  background-color: gray;

  // ${({ active }) => active && `
  //   visibility: visible;
  // `}
`;

const ModalItem = styled.div`
  position: absolute;
  display:flex;
  flex-direction:column;
  
  left: ${({ coordsLeft }) => coordsLeft}px;
  top: ${({ coordsTop }) => coordsTop}px;
  width: ${({ itemWidth }) => itemWidth}px;
  // border: 1px solid black;
  transition: all 1.5s ease-in-out;
  transform: scale(1.5);
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
  itemDimensions,
}) {
  const location = useLocation();
  const [itemContainerRef, setItemContainerRef] = useState();
  console.log(itemDimensions);
  return (
    <ItemContainer
      ref={setItemContainerRef}
      onMouseEnter={() => handleMouseOver(itemContainerRef)}
      onMouseLeave={() => handleMouseOut()}
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
        <Modal id="slider-item-modal">
          <ModalItem
            id="modal-item"
            coordsLeft={itemDimensions.left}
            coordsTop={itemDimensions.top}
            itemWidth={itemDimensions.width}
            onMouseLeave={() => handleMouseOut()}
          >
            <SliderItemImage
              alt="Slider image"
              src={posterPath}
              onError={() => setImgLoadingErr()}
              onLoad={() => setImgLoadSuccess()}
            />
            <ItemDetails>
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
          </ModalItem>

        </Modal>
        )}
      {/* {itemHoverActive
      && (
      <ItemDetails>
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
      )} */}
      {/* <ItemDetails active={itemHoverActive}>
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
      </ItemDetails> */}
    </ItemContainer>

  );
}
