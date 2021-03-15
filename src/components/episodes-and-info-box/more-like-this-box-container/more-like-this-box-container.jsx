import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import getSimilar from '../../../helpers/getRecommendations';
import truncate from '../../../helpers/truncate'
import MoreLikeThisBox from '../more-like-this-box/more-like-this-box';
import MoreLikeThisItem from '../more-like-this-item/more-like-this-item';
import MoreLikeThisBoxLoadingSkeleton from '../more-like-this-box-loading-skeleton/more-like-this-box-loading-skeleton';

const Container = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  padding-top: 1vh;
  margin: auto;
`;

const BoxContainer = styled.div`
  display: none;

  ${({ imagesLoaded }) => imagesLoaded && `
      display: block;
  `}

  ${({ imagesAvailable }) => !imagesAvailable && `
      text-align: center;
  `}

`;

const GridItem = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  align-self: center;
  margin: 1vw;
`;

const MoreLikeThisBoxContainer = ({
  mediaId,
  mediaType,
}) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [mediaDetails, setMediaDetails] = useState([]);
  const [imgSrcArray, setImgSrcArray] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [imagesAvailable, setImagesAvailable] = useState(false);
  const [numItemsToLoad, setNumItemsToLoad] = useState();
  const numItemsLoaded = useRef(0);

  const fetchSimilarContentData = async () => {
    console.log(mediaType);
    console.log(mediaId);
    const data = await getSimilar(mediaType, mediaId);
    const newData = removeMediaWithoutImg(data);
    console.log(newData);

    if (newData.results.length > 0) {
      handleMediaDetails(newData);
      handleSrcArray(newData);
    } else {
      setImagesLoaded((imagesLoaded) => true);
    }
    
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

    setNumItemsToLoad((numItemsToLoad) => srcArrayCopy.length);
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

  const handleImgLoad = () => {
    numItemsLoaded.current += 1;

    if (numItemsLoaded.current >= numItemsToLoad) {
      setImagesLoaded((imagesLoaded) => true);
      setImagesAvailable((imagesAvailable) => true);
    }
  };

  useEffect(() => {
    if (!dataLoaded) {
      fetchSimilarContentData();
    }
  }, []);

  return (
    <Container>
      {!imagesLoaded && <MoreLikeThisBoxLoadingSkeleton />}
      {dataLoaded
      && (
        <BoxContainer imagesLoaded={imagesLoaded} imagesAvailable={imagesAvailable}>
          <MoreLikeThisBox
            imgSrcArray={imgSrcArray}
            mediaDetails={mediaDetails}
          >
            {imgSrcArray.length === 0 
            ? 'No similar items available'
            :  [
                ...Array(imgSrcArray.length),
              ].map((value: undefined, index: number) => (
                <GridItem data-index={index} key={index}>
                  <MoreLikeThisItem 
                    imgSrc={imgSrcArray[index]} 
                    mediaDetails={mediaDetails[index]}
                    handleImgLoad={handleImgLoad}
                  />
                </GridItem>
              ))
            }
          </MoreLikeThisBox>
        </BoxContainer>
      )}
    </Container>
  );
}

export default MoreLikeThisBoxContainer;
