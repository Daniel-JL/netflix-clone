import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './media-slider.css';

const SliderContainer = styled.div`
  position: relative;
  z-index: 2;
  max-width: 100%;
  width: 100%;
  color: white;
`;

const MediaSlider = (
  {
    children,
    dataLoaded,
  },
) => (
  <div>
    {dataLoaded
        && (
        <SliderContainer>
          <Slider
            arrows
            draggable={false}
            dots={false}
            infinite
            speed={500}
            slidesToScroll={6}
            slidesToShow={6}
            className="slides"
            centerMode={false}
            variableWidth={false}
            useTransform
            lazyLoad="ondemand"
            responsive={[
              {
                breakpoint: 1200,
                settings: {
                  slidesToShow: 5,
                  slidesToScroll: 5,
                  infinite: true,
                  dots: true,
                },
              },
              {
                breakpoint: 1000,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 4,
                  initialSlide: 2,
                },
              },
              {
                breakpoint: 800,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  initialSlide: 3,
                },
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  initialSlide: 2,
                },
              },
              {
                breakpoint: 400,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
            ]}
          >
            {children}
          </Slider>
        </SliderContainer>
        )}
  </div>
);

export default MediaSlider;
