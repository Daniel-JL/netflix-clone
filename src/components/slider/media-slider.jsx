/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { SliderItemContainer } from './slider-item-container';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './media-slider.css';

const SliderContainer = styled.div`
  max-width: 100%;
  width: 100%;
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
    dataLoaded,
    maxIdsNeeded,
    movieTvShowType,
    movieTvShowIds,
  }
) {

  const handleArrowClick = (direction) => {
    console.log('direction');
  }

  const next = () => {
    this.slider.slickNext();
  };

  const previous = () => {
    this.slider.slickPrev();
  };

  return (
    <div>
      {dataLoaded
        && (
        <SliderContainer>
          <Slider 
            // nextArrow={<Arrow type="next" onClick={() => handleArrowClick}/>}
            // prevArrow={<Arrow type="prev" onClick={handleArrowClick}/>}
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
                // ...Array(maxIdsNeeded),
                ...Array(maxIdsNeeded),
              ].map((value: undefined, index: number) => (
                <div data-index={index} key={index} >
                  <SliderItemContainer 
                    setModalProps={setModalProps}
                    mediaType={movieTvShowType[index]} 
                    mediaId={movieTvShowIds[index]} 
                  />
                </div>
              ))
            }
          </Slider>
        </SliderContainer>
        )}
    </div>
  );
}
