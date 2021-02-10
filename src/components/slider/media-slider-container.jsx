/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { MediaSlider } from './media-slider';
import getTrendingMediaIdsAndTypes from '../../helpers/getTrendingMediaIdsAndTypes';
import getMediaListByGenre from '../../helpers/getMediaListByGenre';
import processIdsAndTypes from '../../helpers/processIdsAndTypes';

const Container = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
`;

export function MediaSliderContainer(
  {
    setModalProps,
    numSlidersLoaded,
    mediaType,
    genreName,
    genreId,
    changeRowZIndex,
  },
) {
  const [paginationPage, setPaginationPage] = useState(0);
  const [buttonHasBeenPressed, setButtonHasBeenPressed] = useState(false);
  const [numOfVisibleSliderItems, setNumOfVisibleSliderItems] = useState(6);
  const [dataLoaded, setDataLoaded] = useState(false);
  const maxIdsNeeded = 42;
  const mediaIdsAndTypes = useRef({});

  const fetchNow = async () => {
    let data;
    if (genreName === 'trending') {
      data = await getTrendingMediaIdsAndTypes(maxIdsNeeded, numSlidersLoaded, mediaType);
      mediaIdsAndTypes.current = processIdsAndTypes(data, maxIdsNeeded);
    } else {
      const data = await getMediaListByGenre(mediaType, numSlidersLoaded, genreId, maxIdsNeeded);
      mediaIdsAndTypes.current = processIdsAndTypes(data, maxIdsNeeded, mediaType);
    }
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
          changeRowZIndex={changeRowZIndex}
        />
        )}

    </Container>
  );
}
