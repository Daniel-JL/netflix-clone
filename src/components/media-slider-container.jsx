/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import { MediaSlider } from './media-slider';
import { getMediaIdsAndTypes } from '../helpers/getMediaIdsAndTypes';

export function MediaSliderContainer(props) {
  const [paginationPage, setPaginationPage] = useState(0);
  const [buttonHasBeenPressed, setButtonHasBeenPressed] = useState(false);
  const [numOfVisibleSliderItems, setNumOfVisibleSliderItems] = useState(6);
  const [dataLoaded, setDataLoaded] = useState(false);
  const maxIdsNeeded = 10;
  let mediaIdsAndTypes = useRef({});

  const fetchNow = async () => {
    mediaIdsAndTypes.current = await getMediaIdsAndTypes(maxIdsNeeded);

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
    <div>
      {dataLoaded
        && (
        <MediaSlider
          dataLoaded={dataLoaded}
          maxIdsNeeded={maxIdsNeeded}
          movieTvShowType={mediaIdsAndTypes.current.types}
          movieTvShowIds={mediaIdsAndTypes.current.ids}
        />
        )}

    </div>
  );
}
