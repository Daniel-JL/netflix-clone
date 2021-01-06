import { useState, useRef } from "react";

export default function useSliderItemData () {
  // const [mediaId, setMediaId] = useState('');
  // const [mediaType, setMediaType] = useState('');
  // const [posterPath, setPosterPath] = useState('');
  // const [runtimeOrNumberOfSeasons, setRuntimeOrNumberOfSeasons] = useState('');
  // const [genres, setGenres] = useState('');
  // const [ageRating, setAgeRating] = useState('');
  const mediaId = useRef('');
  const mediaType = useRef('');
  const posterPath = useRef('');
  const runtimeOrNumberOfSeasons = useRef('');
  const genres = useRef('');
  const ageRating = useRef('');

  const setMediaId = (newMediaId) => {
    mediaId.current = newMediaId;
  };

  const setMediaType = (newMediaType) => {
    mediaType.current = newMediaType;
  };

  const setPosterPath = (newPosterPath) => {
    posterPath.current = newPosterPath;
  };

  const setRuntimeOrNumberOfSeasons = (newRuntimeOrNumberOfSeasons) => {
    runtimeOrNumberOfSeasons.current = newRuntimeOrNumberOfSeasons;
  };

  const setGenres = (newGenres) => {
    genres.current = newGenres;
  };

  const setAgeRating = (newAgeRating) => {
    ageRating.current = newAgeRating;
  };

  return {
    mediaId,
    setMediaId,
    mediaType,
    setMediaType,
    posterPath,
    setPosterPath,
    runtimeOrNumberOfSeasons,
    setRuntimeOrNumberOfSeasons,
    genres,
    setGenres,
    ageRating,
    setAgeRating,
  };
}
