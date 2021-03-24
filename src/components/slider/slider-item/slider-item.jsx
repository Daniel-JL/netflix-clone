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
} from '../../common/buttons/buttons';
import Modal from '../../main-page/modal/modal';

const ItemContainer = styled.div`
  position: relative;
  width: ${({ itemWidth }) => itemWidth}px;
  border: 1px solid black;
  border-radius: 0.2vw;
  z-index: 2;
`;

const SliderItemImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 0.2vw;

  ${({ mouseOver }) => mouseOver
    && `
      border-top-right-radius: 0.2vw;
      border-top-left-radius: 0.2vw;
      border-bottom-right-radius: 0px;
      border-bottom-left-radius: 0px;
    `
} 
`;

const ItemDetails = styled.div`
  
`;

const ModalItem = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: rgb(33, 33, 33);
  color: white;
  border-radius: 0.2vw;
  
  left: ${({ coordsLeft }) => coordsLeft}px;
  top: ${({ coordsTop }) => coordsTop}px;
  width: ${({ itemWidth }) => itemWidth}px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 2%;
  width: 4.5vw;
`;

const InfoContainer = styled.div`
  display: flex;
  padding-left: 2%;
  padding-top: 2%;
  font-size: 13px;
`;

const AgeRatingContainer = styled.div`
  border: 0.1px solid white;
  padding: 0.5px;
  padding-left: 2px;
  padding-right: 2px;
`;

const GenreContainer = styled.div`
  display: flex;
  padding: 2%;
  font-size: 13px;
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

const SliderItem = ({
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
}) => {
  const divRef = useRef();
  const location = useLocation();
  const [itemContainerRef, setItemContainerRef] = useState();

  const duration = 200;

  if (itemHoverActive && divRef.current && divRef.current.matches(':hover') === false) {
    handleMouseOut();
    console.log(sliderItemData.runtimeOrNumberOfSeasons);
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
    exited: { transform: 'scale(0.5)' },
  };

  return (
    <ItemContainer
      ref={setItemContainerRef}
      onMouseEnter={() => handleMouseOver(itemContainerRef)}
      onMouseLeave={() => handleMouseOut()}
      active={itemHoverActive}
    >
      {/* If img is loaded correctly then it is mounted here */}
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

      {/* On hover over Modal is activated with a transition. Extra data added. */}
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
                {/* All things that are mounted and included in transition animation */}
                <ImgTitleContainer>
                  <MediaTitle>
                    {sliderItemData.mediaTitle}
                  </MediaTitle>
                  <SliderItemImage
                    alt="Slider image"
                    src={sliderItemData.posterPath}
                    onError={() => setImgLoadingErr()}
                    onLoad={() => setImgLoadSuccess()}
                    mouseOver
                  />
                </ImgTitleContainer>
                <ItemDetails>
                  <ButtonsContainer id="buttons">
                    <Link
                      key="watch"
                      to="/watch"
                    >
                      <RoundPlayButton />
                    </Link>
                    <Link
                      key="epsInfoBox"
                      to={{
                        pathname: `${location.pathname}/epsinfobox/${mediaType}/${mediaId}`,
                        state: { background: location },
                      }}
                    >
                      <RoundEpsAndInfoButton onClick={handleEpsAndInfoButtonClick} />
                    </Link>
                  </ButtonsContainer>
                  <InfoContainer id="media-info">
                    {sliderItemData.ageRating
                      && (
                      <AgeRatingContainer>
                        {sliderItemData.ageRating}
                      </AgeRatingContainer>
                      )}

                    {sliderItemData.ageRating
                      && (
                      <div>
                        &nbsp;
                        &nbsp;
                      </div>
                      )}

                    {mediaType === 'tv' && sliderItemData.runtimeOrNumberOfSeasons.length > 1 && `${sliderItemData.runtimeOrNumberOfSeasons.length} Seasons`}
                    {mediaType === 'tv' && sliderItemData.runtimeOrNumberOfSeasons.length === 1 && `${sliderItemData.runtimeOrNumberOfSeasons.length} Season`}
                    {mediaType === 'movie' && sliderItemData.runtimeOrNumberOfSeasons}
                  </InfoContainer>
                  <GenreContainer id="genres">
                    {sliderItemData.genres[0]}
                    {sliderItemData.genres[1] && (
                      <div>
                        &nbsp;
                        ·
                        &nbsp;
                        {sliderItemData.genres[1]}
                      </div>
                    )}
                  </GenreContainer>
                </ItemDetails>
              </ModalItem>
            )}
          </Transition>
        </Modal>
        )}
    </ItemContainer>
  );
};

export default SliderItem;
