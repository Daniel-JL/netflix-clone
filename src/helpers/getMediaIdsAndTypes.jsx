/* eslint-disable import/prefer-default-export */
import { React } from 'react';

export const getMediaIdsAndTypes = async (numIdsNeeded) => {
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

  return processPageData(data, numIdsNeeded);

};

const processPageData = (data, numIdsNeeded) => {
  const numItemsPerPage = 20;
  const movieTvShowIdsAndTypes = { ids: [], types: [] };

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < numItemsPerPage; j++) {
      movieTvShowIdsAndTypes.ids.push(data[i].results[j].id);
      movieTvShowIdsAndTypes.types.push(data[i].results[j].media_type);

      if (movieTvShowIdsAndTypes.ids.length >= numIdsNeeded) {
        break;
      }
    }
  }
  return movieTvShowIdsAndTypes;
};

const mediaIsMovieOrTv = (item) => (item === 'movie' || item === 'tv');
