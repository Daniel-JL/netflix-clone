/* eslint-disable import/prefer-default-export */
import React from 'react';
import styled from 'styled-components';
import { useFetch } from '../hooks/useFetch';

const BillboardRow = styled.div`
  width: 100%;
  padding-top: 40%;
`;

const BillboardRowEpsInfo = styled(BillboardRow)`
  padding-top: 1%;
`;

const BillboardImage = styled.img`
  position: absolute;
  width: 100%;
  top:0;
  z-index: 0;

  // height: 100%;
`;

const MotionBackgroundMediaContainer = styled.div`
  position: absolute;
  width: 100%;
  padding-top: 56.25%;
  top:0;
  z-index: 0;
`;

const MotionBackgroundMediaContainerEpsInfoBox = styled(MotionBackgroundMediaContainer)`
  position: static;
  z-index: 0;
  // padding-top: 0%;

  
`;

const MotionBackgroundContainer = styled.div`
  // position: relative;
  width: 100%;

`;

const baseURL = 'https://api.themoviedb.org/3/';

let url = ''.concat(baseURL, 'trending/all/week?api_key=', process.env.REACT_APP_MOVIE_DB_API_KEY);

export function MotionBackground() {

  return (
    <MotionBackgroundContainer>
      <MotionBackgroundMediaContainer>
        <BillboardImage src="http://image.tmdb.org/t/p/original/7nRrq4GGHd2RctkPJOB8u6aq1P0.jpg" />
        {/* <iframe src='https://www.youtube.com/embed/5794f65592514142a4002ec0'
        frameborder='0'
        allow='autoplay; encrypted-media'
        allowfullscreen
        title='video'
            /> */}
      </MotionBackgroundMediaContainer>

      <BillboardRow />
    </MotionBackgroundContainer>
  );
}

export function MotionBackGroundEpsInfoBox() {
  return (
    <MotionBackgroundContainer>
      <MotionBackgroundMediaContainerEpsInfoBox>
        <BillboardImage src="http://image.tmdb.org/t/p/original/7nRrq4GGHd2RctkPJOB8u6aq1P0.jpg" />
        {/* <iframe src='https://www.youtube.com/embed/5794f65592514142a4002ec0'
        frameborder='0'
        allow='autoplay; encrypted-media'
        allowfullscreen
        title='video'
            /> */}
      </MotionBackgroundMediaContainerEpsInfoBox>

      <BillboardRowEpsInfo />
    </MotionBackgroundContainer>
  );
}
