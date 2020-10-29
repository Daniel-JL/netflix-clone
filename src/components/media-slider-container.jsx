/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import { MediaSlider } from './media-slider';
import { getMediaIdsAndTypes } from '../helpers/getMediaIdsAndTypes';

export function MediaSliderContainer(props) {
  const [paginationPage, setPaginationPage] = useState(0);
  const [buttonHasBeenPressed, setButtonHasBeenPressed] = useState(false);
  const [numOfVisibleSliderItems, setNumOfVisibleSliderItems] = useState(6);
  const [dataLoaded, setDataLoaded] = useState(false);
  let movieTvShowIds = [];
  movieTvShowIds = useRef(movieTvShowIds.fill(React.createRef(), 0, 41));
  let movieTvShowType = [];
  movieTvShowType = useRef(movieTvShowType.fill(React.createRef(), 0, 41));
  const maxIdsNeeded = 42;
  const itemsPerPage = 20;
  const page = useRef(1);
  let mediaIdsAndTypes = useRef({});

  const fetchNow = async () => {
    mediaIdsAndTypes.current = await getMediaIdsAndTypes(maxIdsNeeded);
    console.log(mediaIdsAndTypes.current);

    if (mediaIdsAndTypes.current.ids.length >= maxIdsNeeded) {
      console.log(mediaIdsAndTypes.current.types);

      setDataLoaded(true);
    }

    // fetch(`https://api.themoviedb.org/3/trending/all/week?page=${page.current}&api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     for (let i = (0 + (page.current * 20 - 20)); i < (page.current * itemsPerPage); i++) {
    //       if (mediaIsMovieOrTv(data.results[i - ((page.current * 20) - 20)].media_type)) {
    //         movieTvShowIds.current[i] = data.results[i - (page.current * 20 - 20)].id;
    //         movieTvShowType.current[i] = data.results[i - ((page.current * 20) - 20)].media_type;
    //       }

    //       if (movieTvShowIds.current.length >= maxIdsNeeded) {
    //         setDataLoaded(true);
    //         break;
    //       }
    //     }
    //     if (movieTvShowIds.current.length < maxIdsNeeded) {
    //       page.current++;
    //       fetchNow();
    //     }
    //   });
  };

  useEffect(() => {
    if (!dataLoaded) {
      fetchNow();
    }
  }, []);

  return (
    <div>
      {dataLoaded
        && (
        <MediaSlider
          dataLoaded={dataLoaded}
          maxIdsNeeded={maxIdsNeeded}
          movieTvShowType={mediaIdsAndTypes.current.types}
          movieTvShowIds={mediaIdsAndTypes.current.ids}
        />
        )}

    </div>

  );
}

const mediaIsMovieOrTv = (item) => (item === 'movie' || item === 'tv');
