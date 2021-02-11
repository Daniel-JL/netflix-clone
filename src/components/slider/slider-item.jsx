/* eslint-disable import/prefer-default-export */
import React, { useRef, useState } from 'react';
import {
  Link,
  useLocation,
  Route,
} from 'react-router-dom';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';
import {
  RoundPlayButton,
  RoundEpsAndInfoButton,
} from '../buttons';
import { EpisodesAndInfoBox } from '../episodes-and-info-box/episodes-and-info-box';
import { Modal } from '../modal';

const ItemContainer = styled.div`
  position: relative;
  width: ${({ itemWidth }) => itemWidth}px;
  border: 1px solid black;
  z-index: 2;
`;

const SliderItemImage = styled.img`
  width: 100%;
  height: 100%;
`;

const ItemDetails = styled.div`
  background-color: gray;
`;

const ModalItem = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  
  left: ${({ coordsLeft }) => coordsLeft}px;
  top: ${({ coordsTop }) => coordsTop}px;
  width: ${({ itemWidth }) => itemWidth}px;

`;

const ImgTitleContainer = styled.div`
  position: relative;
`;

const MediaTitle = styled.div`
  position: absolute;
  color: white;
  bottom: 10%;
  left: 2%;
  font-size: 1.3vw;
`;

export function SliderItem({
  mediaTitle,
  mediaId,
  mediaType,
  ageRating,
  genres,
  imgLoadedSuccess,
  imgLoadingErr,
  dataLoaded,
  posterPath,
  runtimeOrNumberOfSeasons,
  itemHoverActive,
  itemHoverTransition,
  handleMouseOver,
  handleMouseOut,
  handleModalDismount,
  setImgLoadingErr,
  setImgLoadSuccess,
  handleEpsAndInfoButtonClick,
  itemDimensions,
}) {
  const location = useLocation();
  const [itemContainerRef, setItemContainerRef] = useState();

  const duration = 200;

  const defaultStyle = {
    transition: `all ${duration}ms ease-in-out`,
    opacity: 1,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',

    left: `${itemDimensions.left}px`,
    top: `${itemDimensions.top}px`,
    width: `${itemDimensions.width}px`,
  };

  const transitionStyles = {
    entering: {},
    entered: {
      opacity: 1,
      transform: 'scale(1.5)',
    },
    exiting: {},
    exited: {transform:'scale(0.5)'},
  };

  return (
    <ItemContainer
      ref={setItemContainerRef}
      onMouseEnter={() => handleMouseOver(itemContainerRef)}
      onMouseLeave={() => handleMouseOut()}
      active={itemHoverActive}
    >

      {dataLoaded && !imgLoadingErr
      && (
        <ImgTitleContainer>
          <MediaTitle>
            {mediaTitle}
          </MediaTitle>
          <SliderItemImage
            alt="Slider image"
            src={posterPath}
            onError={() => setImgLoadingErr()}
            onLoad={() => setImgLoadSuccess()}
          />
        </ImgTitleContainer>
      )}

      {imgLoadedSuccess
      && <div id="imgSuccess" data-testid="imgSuccess" />}

      {itemHoverActive
        && (
        <Modal id="slider-item-modal">
          <Transition
            appear
            in={itemHoverTransition}
            timeout={300}
            onExited={() => handleModalDismount()}
          >
            {(state) => (
              <ModalItem
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state],
                }}
                id="modal-item"
                coordsLeft={itemDimensions.left}
                coordsTop={itemDimensions.top}
                itemWidth={itemDimensions.width}
                onMouseLeave={() => handleMouseOut()}
              >
                <ImgTitleContainer>
                  <MediaTitle>
                    {mediaTitle}
                  </MediaTitle>
                  <SliderItemImage
                    alt="Slider image"
                    src={posterPath}
                    onError={() => setImgLoadingErr()}
                    onLoad={() => setImgLoadSuccess()}
                  />
                </ImgTitleContainer>
                <ItemDetails>
                  <div id="buttons">
                    <RoundPlayButton />
                    <Link
                      key={1}
                      to={{
                        pathname: `${location.pathname}/epsinfobox/${mediaType}/${mediaId}`,
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

            )}

          </Transition>
        </Modal>
        )}
    </ItemContainer>

  );
}
