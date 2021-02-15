/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { SliderItemContainer } from './slider-item-container';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './media-slider.css';

const SliderContainer = styled.div`
  position: relative;
  z-index: 2;
  max-width: 100%;
  width: 100%;
  color: white;
`;

const ArrowButtonContainer = styled.div`
  height: 140px;
  width: 50px;
`;

function Arrow({className, style, onClick}) {
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  ); 
}

export function MediaSlider(
  {
    setModalProps,
    genreName,
    dataLoaded,
    numOfItems,
    movieTvShowType,
    movieTvShowIds,
    changeRowZIndex,
    setImagesLoaded,
  }
) {
  const numItemsLoaded = useRef(0);
  const handleArrowClick = (direction) => {
    console.log('direction');
  }

  const next = () => {
    this.slider.slickNext();
  };

  const previous = () => {
    this.slider.slickPrev();
  };

  const handleImageLoaded = () => {
    numItemsLoaded.current += 1;
    if (numItemsLoaded.current === 6) {
      setImagesLoaded(true);
    }
  };

  return (
    <div>
      {dataLoaded
        && (
        <SliderContainer>
          <Slider 
            arrows={true}
            draggable={false}
            dots={false}
            infinite={true}
            speed={500}
            slidesToScroll={6}
            slidesToShow={6} 
            className={'slides'}
            centerMode={false}
            variableWidth={false}
            useTransform={true}
            lazyLoad={'ondemand'}
            responsive={[
              {
                breakpoint: 1200,
                settings: {
                  slidesToShow: 5,
                  slidesToScroll: 5,
                  infinite: true,
                  dots: true
                }
              },
              {
                breakpoint: 1000,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 4,
                  initialSlide: 2
                }
              },
              {
                breakpoint: 800,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  initialSlide: 3
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  initialSlide: 2
                }
              },
              {
                breakpoint: 400,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]}
          >
            {/* { 
          [
            ...Array(maxNumScrollLoads - 1),
          ].map((value: undefined, index: number) => (
            scrollLimitReached + 1 > index && 
            React.Children.map(locoRow, (child) => 
              React.cloneElement(child, {
                genreName:genreTypeArr[index].genre.name,
                genreId:genreTypeArr[index].genre.id,
                mediaType:genreTypeArr[index].mediaType,
                numSlidersLoaded:index + 1,
              })
          )))
        } */}
            {
              [
                ...Array(numOfItems),
              ].map((value: undefined, index: number) => (
                <SliderItemContainer 
                  data-index={index} 
                  key={index}
                  setModalProps={setModalProps}
                  mediaType={movieTvShowType[index]} 
                  mediaId={movieTvShowIds[index]} 
                  changeRowZIndex={changeRowZIndex}
                  handleImageLoaded={handleImageLoaded}
                />
              ))
            }
          </Slider>
        </SliderContainer>
        )}
    </div>
  );
}
