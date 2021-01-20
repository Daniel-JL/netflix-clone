import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import getSimilar from '../helpers/getRecommendations';
import MoreLikeThisBox from './more-like-this-box';

const Container = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

function MoreLikeThisBoxContainer(props) {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [episodesListItemData, setEpisodesListItemData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alreadyLoaded, setAlreadyLoaded] = useState(false);
  const [imgSrcArray, setImgSrcArray] = useState([]);

  const fetchSimilarContentData = async () => {
    const data = await getSimilar(props.mediaType, props.mediaId);
     
    console.log(data);
    setIsLoading((isLoading) => true);

    handleSrcArray(data);

    // handleSeasonEpisodeData(data);
    setDataLoaded(true);
  };

  const handleSrcArray = (data) => {
    const srcArrayCopy = data.results.map((undefined, index) => (
      `http://image.tmdb.org/t/p/w780${data.results[index].backdrop_path}`
    ));

    setImgSrcArray((imgSrcArray) => srcArrayCopy);
  };

  // const handleSrcArray = (season) => {
  //   const srcArrayCopy = seasonEpisodeData[season - 1].episodeData.map((undefined, index) => (
  //     `http://image.tmdb.org/t/p/w780${seasonEpisodeData[season - 1].episodeData[index].still_path}`

  //   ));

  //   setSrcArray((srcArray) => srcArrayCopy);
  // };

  const cacheImages = async () => {
    const promises = await imgSrcArray.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();

        img.src = src;
        img.onload = resolve();
        img.onerror = reject();
      });
    });
    await Promise.all(promises);

    setIsLoading((isLoading) => false);
  };

  useEffect(() => {
    if (!dataLoaded) {
      fetchSimilarContentData();
    }
  }, []);

  useEffect(() => {
    cacheImages();
  }, [imgSrcArray]);

  // useEffect(() => {
  //   setAlreadyLoaded((alreadyLoaded) => false);
  //   setIsLoading((isLoading) => false);
  // }, [alreadyLoaded]);

  return (
    <Container>
      {dataLoaded
      && (
        <MoreLikeThisBox
          isLoading={isLoading}
          imgSrcArray={imgSrcArray}
        />
      )}
    </Container>
  );
}

export default MoreLikeThisBoxContainer;
