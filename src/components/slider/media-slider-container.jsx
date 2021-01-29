/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { MediaSlider } from './media-slider';
import getTrendingMediaIdsAndTypes from '../../helpers/getTrendingMediaIdsAndTypes';
import getMediaListByGenre from '../../helpers/getMediaListByGenre';
import processIdsAndTypes from '../../helpers/processIdsAndTypes';

const Container = styled.div`
  width: 100%;
`;

export function MediaSliderContainer({ setModalProps, mediaType, genreName, genreId }) {
  const [paginationPage, setPaginationPage] = useState(0);
  const [buttonHasBeenPressed, setButtonHasBeenPressed] = useState(false);
  const [numOfVisibleSliderItems, setNumOfVisibleSliderItems] = useState(6);
  const [dataLoaded, setDataLoaded] = useState(false);
  const maxIdsNeeded = 10;
  let mediaIdsAndTypes = useRef({});

  const fetchNow = async () => {
    console.log(genreName);
    let data;
    if (genreName === 'trending') {
      data = await getTrendingMediaIdsAndTypes(maxIdsNeeded);
      console.log(data);
      mediaIdsAndTypes.current = processIdsAndTypes(data, maxIdsNeeded);
    } else {
      console.log('not trending');
      let data = await getMediaListByGenre('movie', genreId, maxIdsNeeded);
      console.log(data);
      mediaIdsAndTypes.current = processIdsAndTypes(data, maxIdsNeeded, 'movie');
    }
    console.log(mediaIdsAndTypes.current);
    if (mediaIdsAndTypes.current.ids.length >= maxIdsNeeded) {
      setDataLoaded(true);
    }
  };

  useEffect(() => {
    if (!dataLoaded) {
      fetchNow();
    }
  }, []);

  return (
    <Container>
      {dataLoaded
        && (
        <MediaSlider
          setModalProps={setModalProps}
          dataLoaded={dataLoaded}
          maxIdsNeeded={maxIdsNeeded}
          movieTvShowType={mediaIdsAndTypes.current.types}
          movieTvShowIds={mediaIdsAndTypes.current.ids}
        />
        )}

    </Container>
  );
}
