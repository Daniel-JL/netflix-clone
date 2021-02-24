import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import getSimilar from '../../helpers/getRecommendations';
import truncate from '../../helpers/truncate'
import MoreLikeThisBox from './more-like-this-box';
import MoreLikeThisItem from './more-like-this-item';

const Container = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  padding-top: 1vh;
  margin: auto;
`;

const GridItem = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  align-self: center;
  margin: 1vw;
`;

function MoreLikeThisBoxContainer({
  mediaId,
  mediaType,
}) {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [mediaDetails, setMediaDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imgSrcArray, setImgSrcArray] = useState([]);

  const fetchSimilarContentData = async () => {
    const data = await getSimilar(mediaType, mediaId);
    const newData = removeMediaWithoutImg(data);
    
    setIsLoading((isLoading) => true);

    handleMediaDetails(newData);

    handleSrcArray(newData);

    setDataLoaded(true);
  };

  const removeMediaWithoutImg = (data) => {
    for (let i = 0; i < data.results.length; i++) {
      if(data.results[i].backdrop_path === null) {
        data.results.splice(i, 1);
        i--;
      }
    }
    return data;
  };

  const handleSrcArray = (data) => {
    const srcArrayCopy = data.results.map((undefined, index) => (
      `http://image.tmdb.org/t/p/w780${data.results[index].backdrop_path}`
    ));

    setImgSrcArray((imgSrcArray) => srcArrayCopy);
  };

  const handleMediaDetails = (data) => {
    // const regex = /^.*?[\.!\?](?:\s|$)/;
    const mediaDetailsCopy = data.results.map((undefined, index) => (
      {
        name: data.results[index].name ? data.results[index].name : data.results[index].title,
        // overview: data.results[index].overview.match(regex),
        overview: truncate(data.results[index].overview, 120),
      }
    ));

    setMediaDetails((mediaDetails) => mediaDetailsCopy);
  };

  useEffect(() => {
    if (!dataLoaded) {
      fetchSimilarContentData();
    }
  }, []);

  useEffect(() => {
    setIsLoading((isLoading) => false);
  }, [imgSrcArray]);

  return (
    <Container>
      {dataLoaded
      && (
        <MoreLikeThisBox
          isLoading={isLoading}
          imgSrcArray={imgSrcArray}
          mediaDetails={mediaDetails}
        >
          {
            [
              ...Array(imgSrcArray.length),
            ].map((value: undefined, index: number) => (
              <GridItem data-index={index} key={index}>
                <MoreLikeThisItem 
                  imgSrc={imgSrcArray[index]} 
                  mediaDetails={mediaDetails[index]}
                />
              </GridItem>
            ))
          }
          
        </MoreLikeThisBox>

        
      )}
    </Container>
  );
}

export default MoreLikeThisBoxContainer;
