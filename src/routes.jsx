/* eslint-disable import/prefer-default-export */
import React, { useState, useEffect } from 'react';
import {
  Route,
  Switch,
  Redirect,
  useLocation,
} from 'react-router-dom';
import getTrendingMediaIdsAndTypes from './helpers/getTrendingMediaIdsAndTypes';
import getGenres from './helpers/getGenres';
import processIdsAndTypes from './helpers/processIdsAndTypes';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Home } from './components/views/home';
import { Series } from './components/views/series';
import { Films } from './components/views/films';
import { Latest } from './components/views/latest';
import { MyList } from './components/views/my-list';
import { Search } from './components/views/search';
import { Kids } from './components/views/kids';
import { VideoPlayer } from './components/views/video-player';
import { NoMatch } from './components/views/no-match';
import { Modal } from './components/modal';

export const Routes = () => {
  const [epsAndInfoBoxProps, setEpsAndInfoBoxProps] = useState({});
  const location = useLocation();
  const background = location.state && location.state.background;
  const [dataLoaded, setDataLoaded] = useState(false);
  const [trendingMovieId, setTrendingMovieId] = useState();
  const [trendingSeriesId, setTrendingSeriesId] = useState();
  const [trendingItemId, setTrendingItemId] = useState();
  const [movieGenres, setMovieGenres] = useState();
  const [tvGenres, setTvGenres] = useState();

  const setModalProps = (
    mediaId,
    mediaType,
    posterPath,
    runtimeOrNumberOfSeasons,
    genres,
    ageRating,
  ) => {
    setEpsAndInfoBoxProps((epsAndInfoBoxProps) => ({
      mediaId,
      mediaType,
      posterPath,
      runtimeOrNumberOfSeasons,
      genres,
      ageRating,
    }));
  };

  const fetchTrendingItemsAndGenreData = async () => {
    let data = await getTrendingMediaIdsAndTypes(1, 'movie');
    data = processIdsAndTypes(data);
    setTrendingMovieId((trendingMovieId) => data.ids[0]);
    const trendingMovieIdCopy = data.ids[0];

    data = await getTrendingMediaIdsAndTypes(1, 'tv');
    data = processIdsAndTypes(data);
    setTrendingSeriesId((trendingSeriesId) => data.ids[0]);
    const trendingSeriesIdCopy = data.ids[0];

    setTrendingItemId((trendingItemId) => {
      return Math.random() < 0.5 ? trendingMovieIdCopy : trendingSeriesIdCopy;
    });

    data = await getGenres('movie');
    setMovieGenres((movieGenres) => data.genres);
    console.log(data);

    data = await getGenres('tv');
    setTvGenres((tvGenres) => data.genres);
    setDataLoaded(true);
  };

  useEffect(() => {
    fetchTrendingItemsAndGenreData();
  }, []);

  return (
    <div>
      <Header />
      {dataLoaded
        && (
        <Switch location={background || location}>
          <Route
            exact
            path="/browse"
            children={(
              <Home
                setModalProps={setModalProps}
                trendingItemId={trendingItemId}
                movieGenres={movieGenres}
                tvGenres={tvGenres}
              />
            )}
          />
          <Route exact path="/">
            <Redirect to="/browse" />
          </Route>
          <Route
            exact
            path="/browse/genre/83"
            children={(
              <Series
                setModalProps={setModalProps}
                trendingSeriesId={trendingSeriesId}
                tvGenres={tvGenres}
              />
          )}
          />
          <Route
            exact
            path="/browse/genre/34399"
            children={(
              <Films
                setModalProps={setModalProps}
                movieGenres={movieGenres}
                trendingMovieId={trendingMovieId}
              />
          )}
          />
          <Route exact path="/latest" children={<Latest setModalProps={setModalProps} />} />
          <Route exact path="/browse/my-list" children={<MyList />} />
          <Route exact path="/search" children={<Search setModalProps={setModalProps} />} />
          <Route exact path="/Kids" children={<Kids />} />
          <Route exact path="/watch/:videoId" children={<VideoPlayer />} />
          <Route children={<NoMatch />} />
        </Switch>
        )}

      {background
        && (
        <Route
          path="/browse/epsinfobox"
          render={() => (
            <Modal epsAndInfoBoxProps={epsAndInfoBoxProps} />
          )}
        />
        )}

      <Footer />
    </div>
  );
};
