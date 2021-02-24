import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Route,
  Switch,
  Redirect,
  useLocation,
} from 'react-router-dom';
import getTrendingMediaIdsAndTypes from './helpers/getTrendingMediaIdsAndTypes';
import getGenres from './helpers/getGenres';
import { getAgeRating } from './helpers/getAgeRating';
import processIdsAndTypes from './helpers/processIdsAndTypes';
import { Header } from './components/header';
import { Footer } from './components/footer';
import Home from './components/views/home';
import { Series } from './components/views/series';
import { Films } from './components/views/films';
import { Latest } from './components/views/latest';
import { MyList } from './components/views/my-list';
import { Search } from './components/views/search';
import { Kids } from './components/views/kids';
import VideoPlayer from './components/views/video-player';
import { NoMatch } from './components/views/no-match';
import { Modal } from './components/modal';
import { EpisodesAndInfoBox } from './components/episodes-and-info-box/episodes-and-info-box';

const PortalContainer = styled.div`
  z-index: 3;
`;

const Routes = () => {
  const [epsAndInfoBoxProps, setEpsAndInfoBoxProps] = useState({});
  const location = useLocation();
  const background = location.state && location.state.background;
  const [dataLoaded, setDataLoaded] = useState(false);
  const [trendingMovieData, setTrendingMovieData] = useState();
  const [trendingSeriesData, setTrendingSeriesData] = useState();
  const [trendingItemData, setTrendingItemData] = useState();
  const [movieGenres, setMovieGenres] = useState();
  const [tvGenres, setTvGenres] = useState();

  const setModalProps = (
    mediaId,
    mediaType,
    posterPath,
    runtimeOrNumberOfSeasons,
    genres,
    ageRating,
    overview,
  ) => {
    setEpsAndInfoBoxProps((epsAndInfoBoxProps) => ({
      mediaId,
      mediaType,
      posterPath,
      runtimeOrNumberOfSeasons,
      genres,
      ageRating,
      overview,
    }));
  };

  const fetchGenreData = async () => {
    let data = await getGenres('movie');
    setMovieGenres((movieGenres) => data.genres);

    data = await getGenres('tv');
    setTvGenres((tvGenres) => data.genres);
    setDataLoaded(true);
  };

  const processTrendingMediaData = async (mediaType) => {
    const numIdsNeeded = 1;
    const startingPage = 0;

    let data = await getTrendingMediaIdsAndTypes(numIdsNeeded, startingPage, mediaType);
    data = processIdsAndTypes(data);

    const trendingMediaData = {
      id: data.ids[0],
      mediaType,
    };
    const ageRating = await getAgeRating(trendingMediaData.id, trendingMediaData.mediaType);
    trendingMediaData.ageRating = ageRating;

    return trendingMediaData;
  };

  const fetchData = async () => {
    const movieData = await processTrendingMediaData('movie');
    setTrendingMovieData((trendingMovieData) => movieData);

    const seriesData = await processTrendingMediaData('tv');
    setTrendingSeriesData((trendingSeriesData) => seriesData);

    const trendingItem = Math.random() < 0.5 ? movieData : seriesData;
    setTrendingItemData((trendingItemData) => (trendingItem));

    fetchGenreData();
  };

  useEffect(() => {
    fetchData();
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
          >
            <Home
              setModalProps={setModalProps}
              trendingItemData={trendingItemData}
              movieGenres={movieGenres}
              tvGenres={tvGenres}
            />
          </Route>
          <Route exact path="/">
            <Redirect to="/browse" />
          </Route>
          <Route exact path="/browse/">
            <Redirect to="/browse" />
          </Route>
          <Route
            exact
            path="/browse/genre/83"
          >
            <Series
              setModalProps={setModalProps}
              trendingSeriesData={trendingSeriesData}
              tvGenres={tvGenres}
            />
          </Route>
          <Route exact path="/browse/genre/83/">
            <Redirect to="/browse/genre/83" />
          </Route>
          <Route
            exact
            path="/browse/genre/34399"
          >
            <Films
              setModalProps={setModalProps}
              movieGenres={movieGenres}
              trendingMovieData={trendingMovieData}
            />
          </Route>
          <Route exact path="/browse/genre/34399/">
            <Redirect to="/browse/genre/34399" />
          </Route>
          <Route exact path="/latest"><Latest setModalProps={setModalProps} /></Route>
          <Route exact path="/browse/my-list"><MyList /></Route>
          <Route exact path="/search"><Search setModalProps={setModalProps} /></Route>
          <Route exact path="/Kids"><Kids /></Route>
          <Route exact path="/watch"><VideoPlayer /></Route>
          <Route><NoMatch /></Route>
        </Switch>
        )}

      {background
        && (
        <Route
          path={[
            '/browse/epsinfobox',
            '/browse/genre/34399/epsinfobox',
            '/browse/genre/83/epsinfobox',
          ]}
          render={() => (
            <Modal
              id="modal-root"
              isEpsInfoBox
              height="100%"
              width="100%"
              left="0"
              top="0"
              bottom="0"
              right="0"
            >
              <EpisodesAndInfoBox
                sliderItemMediaId={epsAndInfoBoxProps.mediaId}
                sliderItemMediaType={epsAndInfoBoxProps.mediaType}
                sliderItemPosterPath={epsAndInfoBoxProps.posterPath}
                sliderItemRuntimeOrNumberOfSeasons={epsAndInfoBoxProps.runtimeOrNumberOfSeasons}
                sliderItemGenres={epsAndInfoBoxProps.genres}
                sliderItemAgeRating={epsAndInfoBoxProps.ageRating}
                sliderItemOverview={epsAndInfoBoxProps.overview}
                setModalProps={setModalProps}
              />
            </Modal>
          )}
        />
        )}
      <PortalContainer id="slider-item-modal" />
      
      <Footer />
    </div>
  );
};

export default Routes;
