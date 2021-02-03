/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useFetch } from '../hooks/useFetch';
import { getMediaData } from '../helpers/getMediaData';


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

const baseURL = 'https://image.tmdb.org/t/p/';

let url = ''.concat(baseURL, 'trending/all/week?api_key=', process.env.REACT_APP_MOVIE_DB_API_KEY);

export const MotionBackground = ({
  itemData,
}) => {
  const [posterPath, setPosterPath] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);

  const fetchItemData = async () => {
    console.log(itemData.mediaType);
    console.log(itemData.id);
    const data = await getMediaData(itemData.mediaType, itemData.id);
    console.log(data);
    setPosterPath((posterPath) => baseURL + 'original' + data.poster_path);
    setDataLoaded(true);
  };

  useEffect(() => {
    fetchItemData();
  }, []);
  // "http://image.tmdb.org/t/p/original/7nRrq4GGHd2RctkPJOB8u6aq1P0.jpg"
  return (
    <MotionBackgroundContainer>
      <MotionBackgroundMediaContainer>
        {dataLoaded &&
          <BillboardImage src={posterPath} />
        }
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
