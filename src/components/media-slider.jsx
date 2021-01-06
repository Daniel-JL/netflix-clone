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

export function MediaSlider(props) {

  return (
    <div>
      {props.dataLoaded
        && (
        <SliderContainer>
          <Slider 
            arrows={true}
            dots={false}
            infinite={true}
            speed={500}
            slidesToScroll={6}
            slidesToShow={6} 
            className={'slides'}
            centerMode={false}
            variableWidth={false}
            useTransform={true}
          >
            {
              [
                ...Array(props.maxIdsNeeded),
              ].map((value: undefined, index: number) => (
                <div data-index={index} key={index} >
                  <SliderItemContainer 
                    mediaType={props.movieTvShowType[index]} 
                    mediaId={props.movieTvShowIds[index]} 
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
