import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import MediaSlider from './media-slider';
import SliderItemContainer from './slider-item-container';
import getTrendingMediaIdsAndTypes from '../../helpers/getTrendingMediaIdsAndTypes';
import getMediaListByGenre from '../../helpers/getMediaListByGenre';
import processIdsAndTypes from '../../helpers/processIdsAndTypes';

const Container = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
`;

const MediaSliderContainer = (
  {
    setModalProps,
    numSlidersLoaded,
    mediaType,
    genreName,
    genreId,
    handleItemLoaded
  },
) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const maxIdsNeeded = 42;
  const pagesNeeded = Math.ceil(maxIdsNeeded / 20);
  const mediaIdsAndTypes = useRef({});
  const numItemsLoaded = useRef(0);

  const fetchNow = async () => {
    let data;
    if (genreName === 'trending') {
      data = await getTrendingMediaIdsAndTypes(maxIdsNeeded, numSlidersLoaded, mediaType);
      mediaIdsAndTypes.current = processIdsAndTypes(data, maxIdsNeeded);
    } else {
      data = await getMediaListByGenre(mediaType, numSlidersLoaded, genreId, maxIdsNeeded);
      //  Check if we attempted to fetch data out of range of data available
      if (data[0].total_pages <= numSlidersLoaded + 1) {
        console.log(data[0].total_pages - pagesNeeded - 1);
        data = await getMediaListByGenre(mediaType, data[0].total_pages - pagesNeeded - 1, genreId, maxIdsNeeded);
      }
      mediaIdsAndTypes.current = processIdsAndTypes(data, maxIdsNeeded, mediaType);
    }

    setDataLoaded(true);
  };

  const handleImageLoaded = () => {
    numItemsLoaded.current += 1;
    if (numItemsLoaded.current === 6) {
      handleItemLoaded();
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
          dataLoaded={dataLoaded}
        >
          {
              [
                ...Array(mediaIdsAndTypes.current.ids.length),
              ].map((value: undefined, index: number) => (
                <SliderItemContainer 
                  data-index={index} 
                  key={index}
                  setModalProps={setModalProps}
                  mediaType={mediaIdsAndTypes.current.types[index]} 
                  mediaId={mediaIdsAndTypes.current.ids[index]} 
                  handleImageLoaded={handleImageLoaded}
                />
              ))
            }
        </MediaSlider>
        )}
    </Container>
  );
}

export default MediaSliderContainer;
