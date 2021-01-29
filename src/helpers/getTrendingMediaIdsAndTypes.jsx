import { React } from 'react';

const getTrendingMediaIdsAndTypes = async (numIdsNeeded) => {
  const numPagesNeeded = Math.ceil(numIdsNeeded / 20);
  const pages = new Array(numPagesNeeded);
  let data;

  for (let i = 0; i < numPagesNeeded; i++) {
    pages[i] = [i + 1];
  }

  try {
    data = await Promise.all(
      pages.map(
        (pages) => fetch(`https://api.themoviedb.org/3/trending/all/week?page=${pages}&api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}`)
          .then(
            (response) => response.json(),
          ),
      ),
    );
  } catch (error) {
    console.log(error);
    throw (error);
  }

  return data;
};

export default getTrendingMediaIdsAndTypes;

// const mediaIsMovieOrTv = (item) => (item === 'movie' || item === 'tv');
