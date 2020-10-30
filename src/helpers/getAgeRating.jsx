/* eslint-disable import/prefer-default-export */
import { React } from 'react';

export const getAgeRating = async (ageRatingUrl, mediaType) => {
  let ageRating;
  let data;

  try {
    data = await fetch(`https://api.themoviedb.org/3/${ageRatingUrl}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}`)
      .then(
        (response) => response.json(),
      );
  } catch (error) {
    console.log(error);
    throw (error);
  }

  for (let i = 0; i < data.results.length; i++) {
    if (data.results[i].iso_3166_1 === 'US') {
      if (mediaIsMovie(mediaType)) {
        ageRating = data.results[i].release_dates[0].certification;
      } else {
        ageRating = data.results[i].rating;
      }
      break;
    }
  }

  return ageRating;
};

const mediaIsMovie = (mediaType) => mediaType === 'movie';
