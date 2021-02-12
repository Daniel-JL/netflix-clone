/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import {
  useHistory,
} from 'react-router-dom';
import styled from 'styled-components';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { getMediaData } from '../../helpers/getMediaData';
import { getAgeRating } from '../../helpers/getAgeRating';
import mediaIsMovie from '../../helpers/mediaIsMovie';
import { MotionBackground } from '../motion-background/motion-background';
import EpisodesListContainer from './episodes-list-container';
import MoreLikeThisBoxContainer from './more-like-this-box-container';

const EpisodesAndInfoBoxContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  // align-self: center;
  // justify-content: center;
  // align-items: center;
  // margin: auto;
  width: 50%;
  background: #fff;
  border: 2px solid #444;
  color: black;
  top: 20px;

`;

export function EpisodesAndInfoBox({
  sliderItemMediaId,
  sliderItemMediaType,
  sliderItemPosterPath,
  sliderItemRuntimeOrNumberOfSeasons,
  sliderItemGenres,
  sliderItemAgeRating,
  setScrollHidden,
}) {
  const [mediaId, setMediaId] = useState(sliderItemMediaId);
  const [mediaType, setMediaType] = useState(sliderItemMediaType);
  const [posterPath, setPosterPath] = useState(sliderItemPosterPath);
  const [runtimeOrNumberOfSeasons, setRuntimeOrNumberOfSeasons] = useState(sliderItemRuntimeOrNumberOfSeasons);
  const [genres, setGenres] = useState(sliderItemGenres);
  const [ageRating, setAgeRating] = useState(sliderItemAgeRating);
  const [dataLoaded, setDataLoaded] = useState(false);

  const history = useHistory();
  console.log(history);

  const ref = useRef();
  useOnClickOutside(ref, () => back());
  document.body.style.overflow = 'hidden';

  const back = () => {
    setScrollHidden();
    history.goBack();
    document.body.style.overflow = 'scroll';
  };

  const fetchMediaData = async () => {
    let mediaIdUrl;
    let mediaTypeUrl
    const currentUrl = history.location.pathname;
    if (currentUrl.slice(8, 16) === 'genre/83') {
      mediaIdUrl = currentUrl.slice(31);
      mediaTypeUrl = currentUrl.slice(28, 30);
    } else if (currentUrl.slice(8, 19) === 'genre/34399') {
      mediaIdUrl = currentUrl.slice(37);
      mediaTypeUrl = currentUrl.slice(31, 36);
    } else {
      mediaIdUrl = currentUrl.slice(25);
      mediaTypeUrl = currentUrl.slice(19, 24);
    }

    setMediaId((mediaId) => mediaIdUrl);
    setMediaType((mediaType) => mediaTypeUrl);

    const data = await getMediaData(mediaTypeUrl, mediaIdUrl);
    setPosterPath((posterPath) => `http://image.tmdb.org/t/p/w780${data.backdrop_path}`);
    setGenres((genres) => [
      ...Array(data.genres.length),
    ].map((undefined, index) => data.genres[index].name));

    if (mediaIsMovie(mediaTypeUrl)) {
      setRuntimeOrNumberOfSeasons((runtimeOrNumberOfSeasons) => `${data.runtime}m`);
    } else {
      setRuntimeOrNumberOfSeasons((runtimeOrNumberOfSeasons) => data.number_of_seasons);
    }
    const ageRatingData = await getAgeRating(mediaIdUrl, mediaTypeUrl);

    setAgeRating((ageRating) => ageRatingData);

    setDataLoaded(true);
  };

  useEffect(() => {
    if (mediaId === undefined) {
      fetchMediaData();
    } else {
      setDataLoaded(true);
    }
  }, []);

  return (
    <EpisodesAndInfoBoxContainer ref={ref}>
      {dataLoaded
      && (
      <div>
        <MotionBackground
          isEpsInfoBox
          mediaType={mediaType}
          mediaId={mediaId}
        />
        {mediaType === 'tv'
          && (
          <EpisodesListContainer
            mediaId={mediaId}
            numSeasons={runtimeOrNumberOfSeasons}
          />
          )}
        <MoreLikeThisBoxContainer
          mediaId={mediaId}
          mediaType={mediaType}
        />
      </div>
      )}
    </EpisodesAndInfoBoxContainer>
  );
}
