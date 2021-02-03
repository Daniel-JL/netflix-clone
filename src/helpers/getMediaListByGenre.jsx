import { React } from 'react';

export const getMediaListByGenre = async (mediaType, startingPage, genreId, numIdsNeeded) => {
  const numPagesNeeded = Math.ceil(numIdsNeeded / 20);
  const pages = new Array(numPagesNeeded);
  let data;


  for (let i = 0; i < numPagesNeeded; i++) {
    pages[i] = [i + startingPage + 1];
  }

  try {
    data = await Promise.all(
      pages.map(
        (pages) => fetch(`https://api.themoviedb.org/3/discover/${mediaType}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&with_genres=${genreId}&page=${pages}`)
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

export default getMediaListByGenre;
