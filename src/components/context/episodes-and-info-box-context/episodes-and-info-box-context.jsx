/* eslint-disable import/prefer-default-export */
import { createContext } from 'react';

export const EpisodesAndInfoBoxContext = createContext({
  mediaId: '',
  updateMediaId: () => {},
  mediaType: '',
  updateMediaType: () => {},
  posterPath: '',
  updatePosterPath: () => {},
  runtimeOrNumberOfSeasons: '',
  updateRuntimeOrNumberOfSeasons: () => {},
  genres: '',
  updateGenres: () => {},
  ageRating: '',
  updateAgeRating: () => {},

});
