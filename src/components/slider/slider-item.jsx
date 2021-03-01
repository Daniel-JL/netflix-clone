/* eslint-disable import/prefer-default-export */
import React, { useRef, useState } from 'react';
import {
  Link,
  useLocation,
} from 'react-router-dom';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';
import {
  RoundPlayButton,
  RoundEpsAndInfoButton,
} from '../buttons';
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
  
`;

const ModalItem = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: rgb(40,40,40);
  color: white;
  
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
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  bottom: 10%;
  left: 2%;
  font-size: 1.3vw;
`;

export function SliderItem({
  mediaId,
  mediaType,
  sliderItemData,
  imgLoadedSuccess,
  imgLoadingErr,
  dataLoaded,
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
  const divRef = useRef();
  const location = useLocation();
  const [itemContainerRef, setItemContainerRef] = useState();

  const duration = 200;

  if (itemHoverActive && divRef.current && divRef.current.matches(':hover') === false) {
    handleMouseOut();
  }

  const defaultStyle = {
    transition: `all ${duration}ms ease-in-out`,
    opacity: 1,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    left: '0px',
    top: '0px',
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
            {sliderItemData.mediaTitle}
          </MediaTitle>
          <SliderItemImage
            alt="Slider image"
            src={sliderItemData.posterPath}
            onError={() => setImgLoadingErr()}
            onLoad={() => setImgLoadSuccess()}
          />
        </ImgTitleContainer>
      )}

      {/* {imgLoadedSuccess
      && <div id="imgSuccess" data-testid="imgSuccess" />} */}

      {itemHoverActive
        && (
        <Modal
          id="slider-item-modal"
          height={itemDimensions.height}
          width={itemDimensions.width}
          left={itemDimensions.left}
          top={itemDimensions.top}
          bottom={itemDimensions.bottom}
          right={itemDimensions.right}
        >
          <Transition
            appear
            in={itemHoverTransition}
            timeout={duration}
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
                ref={divRef}
              >
                <ImgTitleContainer>
                  <MediaTitle>
                    {sliderItemData.mediaTitle}
                  </MediaTitle>
                  <SliderItemImage
                    alt="Slider image"
                    src={sliderItemData.posterPath}
                    onError={() => setImgLoadingErr()}
                    onLoad={() => setImgLoadSuccess()}
                  />
                </ImgTitleContainer>
                <ItemDetails>
                  <div id="buttons">
                    <Link
                      key={1}
                      to="/watch"
                    >
                      <RoundPlayButton>
                        |>
                      </RoundPlayButton>
                    </Link>
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
                    {sliderItemData.ageRating}
                    {' '}
                    {sliderItemData.runtimeOrNumberOfSeasons > 1 && `${sliderItemData.runtimeOrNumberOfSeasons.length} Seasons`}
                    {sliderItemData.runtimeOrNumberOfSeasons === 1 && `${sliderItemData.runtimeOrNumberOfSeasons.length} Season`}
                  </div>
                  <div id="genres">
                    {sliderItemData.genres[0]}
                    {/* {'  '}
                    {'  '}
                    {genres[1]} */}
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
