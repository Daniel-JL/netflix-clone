/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import shuffleArray from '../../helpers/shuffleArray';
import { MotionBackground } from '../motion-background/motion-background';
import { LocoRow } from '../slider/loco-row';
import InfiniteScroll from '../infinite-scroll';

export const Series = (
  {
    setModalProps,
    trendingSeriesData,
    tvGenres,
  },
) => {
  const [numSlidersLoaded, setNumSlidersLoaded] = useState(0);
  const [genreTypeArr, setGenreTypeArr] = useState('');
  const [genreTypeArrFilled, setGenreTypeArrFilled] = useState(false);
  const maxNumScrollLoads = 5;

  const fillGenreTypeArr = () => {
    const genreTypeArrCopy = [];
    for (let i = 0; i < tvGenres.length; i++) {
      genreTypeArrCopy.push(
        {
          mediaType: 'tv',
          genre: tvGenres[i],
        },
      );
    }
    const shuffledArray = shuffleArray(genreTypeArrCopy);
    setGenreTypeArr((genreTypeArr) => shuffledArray);
    setGenreTypeArrFilled(true);
  };

  useEffect(() => {
    fillGenreTypeArr();
  }, []);

  return (
    <div style={{ backgroundColor: 'black', zIndex: -2 }}>
      {genreTypeArrFilled
        && (
        <InfiniteScroll
          genreTypeArr={genreTypeArr}
          maxNumScrollLoads={maxNumScrollLoads}
          motionBackground={(
            <MotionBackground
              mediaType={trendingSeriesData.mediaType}
              mediaId={trendingSeriesData.id}
              ageRating={trendingSeriesData.ageRating}
              isEpsInfoBox={false}
            />
          )}
          locoRow={(
            <LocoRow
              setModalProps={setModalProps}
              numSlidersLoaded={numSlidersLoaded}
              mediaType="tv"
              genreName="trending"
              genreId=""
            />
          )}
        />
        )}
    </div>
  );
};
