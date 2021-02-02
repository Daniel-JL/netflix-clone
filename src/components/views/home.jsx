/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import { MotionBackground } from '../motion-background';
import { LocoRow } from '../slider/loco-row';
import InfiniteScroll from '../infinite-scroll';

export const Home = ({
  setModalProps,
  trendingItemId,
  movieGenres,
  tvGenres,
}) => {
  const [mediaIdList, setMediaIdList] = useState([]);
  const maxNumScrollLoads = 5;
  console.log(trendingItemId);

  const handleNewMediaIds = (newIds) => {
    setMediaIdList((mediaIdList) => [...mediaIdList, newIds]);
  };

  useEffect(() => {
    handleNewMediaIds(trendingItemId);
  }, []);

  return (
    <div style={{ backgroundColor: 'black', zIndex: -2 }}>
      {/* <MotionBackground />
      <LocoRow setModalProps={props.setModalProps}/> */}
      {/* <LocoRow /> */}
      <InfiniteScroll
        maxNumScrollLoads={maxNumScrollLoads}
        movieGenres={movieGenres}
        tvGenres={tvGenres}
        motionBackground={
          <MotionBackground mediaId={trendingItemId} />
          }
        locoRow={(
          <LocoRow
            setModalProps={setModalProps}
            mediaIdList={mediaIdList}
            handleNewMediaIds={handleNewMediaIds}
            mediaType="all"
            genreName="trending"
            genreId=""
          />
          )}
      />

    </div>
  );
};
