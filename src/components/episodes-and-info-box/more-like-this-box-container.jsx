import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import getSimilar from '../../helpers/getRecommendations';
import truncate from '../../helpers/truncate'
import MoreLikeThisBox from './more-like-this-box';

const Container = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  padding-top: 1vh;
  margin: auto;
`;

function MoreLikeThisBoxContainer({
  mediaId,
  mediaType,
}) {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [mediaDetails, setMediaDetails] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [episodesListItemData, setEpisodesListItemData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alreadyLoaded, setAlreadyLoaded] = useState(false);
  const [imgSrcArray, setImgSrcArray] = useState([]);

  const fetchSimilarContentData = async () => {
    const data = await getSimilar(mediaType, mediaId);
    setIsLoading((isLoading) => true);

    handleMediaDetails(data);

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

  const handleMediaDetails = (data) => {
    // const regex = /^.*?[\.!\?](?:\s|$)/;
    const mediaDetailsCopy = data.results.map((undefined, index) => (
      {
        name: data.results[index].name,
        // overview: data.results[index].overview.match(regex),
        overview: truncate(data.results[index].overview, 120),
      }
    ));
    console.log(mediaDetailsCopy);

    setMediaDetails((mediaDetails) => mediaDetailsCopy);
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
          mediaDetails={mediaDetails}
        />
      )}
    </Container>
  );
}

export default MoreLikeThisBoxContainer;
