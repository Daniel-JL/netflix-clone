import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import sortGenreTypeArrayObjects from '../../helpers/sortGenreTypeArrayObjects';
import shuffleArray from '../../helpers/shuffleArray';
import LocoRowGroup from '../slider/loco-row-group';
import InfiniteScroll from '../infinite-scroll';

const HomeContainer = styled.div`
  background-color: rgb(24,24,24);
  z-index: -2;
`;

const Home = ({
  setModalProps,
  trendingItemData,
  movieGenres,
  tvGenres,
  portalRef,
}) => {
  const [genreTypeArr, setGenreTypeArr] = useState('');
  const [genreTypeArrFilled, setGenreTypeArrFilled] = useState(false);
  const maxNumScrollLoads = 5;

  const fillGenreTypeArr = () => {
    const genreTypeArrCopy = sortGenreTypeArrayObjects(movieGenres, tvGenres);
    const shuffledArray = shuffleArray(genreTypeArrCopy);

    //Always have trending items slider as first to load
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
    <HomeContainer>
      {genreTypeArrFilled
        && (
        <InfiniteScroll
          genreTypeArr={genreTypeArr}
          maxNumScrollLoads={maxNumScrollLoads}
          locoRowGroup={(
            <LocoRowGroup
              setModalProps={setModalProps}
              trendingItemData={trendingItemData}
              portalRef={portalRef}
            />
          )}
        />
        )}
    </HomeContainer>
  );
};

export default Home;
