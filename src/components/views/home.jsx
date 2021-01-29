/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import { MotionBackground } from '../motion-background';
import { LocoRow } from '../slider/loco-row';
import { InfiniteScroll } from '../infinite-scroll';
import getTrendingMediaIdsAndTypes from '../../helpers/getTrendingMediaIdsAndTypes';
import getGenres from '../../helpers/getGenres';
import processIdsAndTypes from '../../helpers/processIdsAndTypes';

export const Home = (props) => {
  const maxNumScrollLoads = 5;
  const [dataLoaded, setDataLoaded] = useState(false);
  const [trendingItemId, setTrendingItemId] = useState();
  const [movieGenres, setMovieGenres] = useState();
  const [tvGenres, setTvGenres] = useState();

  const fetchTrendingItemsAndGenreData = async () => {
    let data = await getTrendingMediaIdsAndTypes(1);
    data = processIdsAndTypes(data);

    setTrendingItemId((trendingItemId) => data.ids[0]);

    data = await getGenres('movie');
    setMovieGenres((movieGenres) => data.genres);
    console.log(data);

    data = await getGenres('tv');
    setTvGenres((tvGenres) => data.genres);
    setDataLoaded(true);
  };

  useEffect(() => {
    fetchTrendingItemsAndGenreData();
  }, []);

  return (
    <div style={{ backgroundColor: 'black', zIndex: -2 }}>
      {/* <MotionBackground />
      <LocoRow setModalProps={props.setModalProps}/> */}
      {/* <LocoRow /> */}
      {dataLoaded
        && (
        <InfiniteScroll
          maxNumScrollLoads={maxNumScrollLoads}
          movieGenres={movieGenres}
          tvGenres={tvGenres}
          motionBackground={
            <MotionBackground mediaId={trendingItemId} />
          }
          locoRow={
            <LocoRow
              setModalProps={props.setModalProps}
              mediaType="all"
              genreName="trending"
              genreId=""
            />
          }
        />
        )}

    </div>
  );
};
