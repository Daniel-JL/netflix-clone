/* eslint-disable import/prefer-default-export */
import { React } from 'react';

export const getMediaIdsAndTypes = async (numIdsNeeded) => {
  //  TODOS
  //  1. Calculate number of pages will be needed for numIdsNeeded
  //  2. Create arrays in object variables for each page
  //  3. Fetch page data into arrays
  //  4. Check if enough valid data has been fetched
  //  4.a If so then return data
  //  4.b If not then fetch more data and do check at 4. again

  let numPagesNeeded = Math.ceil(numIdsNeeded / 20);
  let pageData = {};
  let movieTvShowIds = {};
  let movieTvShowType = {};

  for (let i = 0; i < numPagesNeeded; i++) {
    pageData['Page' + i] = [];
    movieTvShowIds['Page' + i] = [];
    movieTvShowType['Page' + i] = [];
    fetch(`https://api.themoviedb.org/3/trending/all/week?page=${page.current}&api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        
      });

  }


  fetch(`https://api.themoviedb.org/3/trending/all/week?page=${page.current}&api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}`)
    .then((response) => response.json())
      .then((data) => {
        
      });


  fetch(`https://api.themoviedb.org/3/trending/all/week?page=${page.current}&api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        for (let i = (0 + (page.current * 20 - 20)); i < (page.current * itemsPerPage); i++) {
          if (mediaIsMovieOrTv(data.results[i - ((page.current * 20) - 20)].media_type)) {
            movieTvShowIds.current[i] = data.results[i - (page.current * 20 - 20)].id;
            movieTvShowType.current[i] = data.results[i - ((page.current * 20) - 20)].media_type;
          }

          if (movieTvShowIds.current.length >= maxIdsNeeded) {
            setDataLoaded(true);
            break;
          }
        }
        if (movieTvShowIds.current.length < maxIdsNeeded) {
          page.current++;
          fetchNow();
        }
      });
}