/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import shuffleArray from '../../helpers/shuffleArray';
import { MotionBackground } from '../motion-background/motion-background';
import { LocoRow } from '../slider/loco-row';
import LocoRowGroup from '../slider/loco-row-group';
import InfiniteScroll from '../infinite-scroll';

export const Home = ({
  setModalProps,
  trendingItemData,
  movieGenres,
  tvGenres,
}) => {
  const [genreTypeArr, setGenreTypeArr] = useState('');
  const [genreTypeArrFilled, setGenreTypeArrFilled] = useState(false);
  // const motionBackgroundRef = useRef();
  const maxNumScrollLoads = 5;

  const fillGenreTypeArr = () => {
    const genreTypeArrCopy = [];
    const longestArrLength = movieGenres.length > tvGenres.length ? movieGenres.length : tvGenres.length;

    

    for (let i = 0; i < longestArrLength; i++) {
      genreTypeArrCopy.push(
        {
          mediaType: 'movie',
          genre: movieGenres[i],
        },
      );
      if (i < tvGenres.length) {
        genreTypeArrCopy.push(
          {
            mediaType: 'tv',
            genre: tvGenres[i],
          },
        );
      }
    }
    const shuffledArray = shuffleArray(genreTypeArrCopy);
    shuffledArray.unshift(
      {
        mediaType: trendingItemData.mediaType,
        genre: {
          id: trendingItemData.id,
          name:'trending',
        },
      },
    );
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
              mediaType={trendingItemData.mediaType}
              mediaId={trendingItemData.id}
              ageRating={trendingItemData.ageRating}
              isEpsInfoBox={false}
            />
          )}
          locoRowGroup={(
            <LocoRowGroup 
              setModalProps={setModalProps}
            />
          )}
        />
        )}
    </div>
  );
};
