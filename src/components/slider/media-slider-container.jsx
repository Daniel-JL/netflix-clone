/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { MediaSlider } from './media-slider';
import getTrendingMediaIdsAndTypes from '../../helpers/getTrendingMediaIdsAndTypes';

const Container = styled.div`
  width: 100%;
`;

export function MediaSliderContainer(props) {
  const [paginationPage, setPaginationPage] = useState(0);
  const [buttonHasBeenPressed, setButtonHasBeenPressed] = useState(false);
  const [numOfVisibleSliderItems, setNumOfVisibleSliderItems] = useState(6);
  const [dataLoaded, setDataLoaded] = useState(false);
  const maxIdsNeeded = 10;
  let mediaIdsAndTypes = useRef({});

  const fetchNow = async () => {
    mediaIdsAndTypes.current = await getTrendingMediaIdsAndTypes(maxIdsNeeded);

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
          setModalProps={props.setModalProps}
          dataLoaded={dataLoaded}
          maxIdsNeeded={maxIdsNeeded}
          movieTvShowType={mediaIdsAndTypes.current.types}
          movieTvShowIds={mediaIdsAndTypes.current.ids}
        />
        )}

    </Container>
  );
}
