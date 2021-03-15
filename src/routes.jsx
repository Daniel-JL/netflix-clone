import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';
import styled from 'styled-components';
import {
  Route,
  Switch,
  Redirect,
  useLocation,
} from 'react-router-dom';
import getTrendingMediaIdsAndTypes from './helpers/getTrendingMediaIdsAndTypes';
import getGenres from './helpers/getGenres';
import getAgeRating from './helpers/getAgeRating';
import processIdsAndTypes from './helpers/processIdsAndTypes';
import Header from './components/main-page/header/header';
import Footer from './components/main-page/footer/footer';
import Home from './components/views/home/home';
import VideoPlayer from './components/views/video-player/video-player';
import NoMatch from './components/views/no-match/no-match';
import Modal from './components/main-page/modal/modal';
import EpisodesAndInfoBox from './components/episodes-and-info-box/episodes-and-info-box/episodes-and-info-box';

const PortalContainer = styled.div`
  z-index: 3;
`;

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
  const [portalRef, setPortalRef] = useState();

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
          // Switch statement for React Router
        <Switch location={background || location}>
          <Route
            key="home"
            exact
            path="/browse"
          >
            <Home
              setModalProps={setModalProps}
              trendingItemData={trendingItemData}
              movieGenres={movieGenres}
              tvGenres={tvGenres}
              portalRef={portalRef}
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
            key="series"
          >
            <Home
              setModalProps={setModalProps}
              trendingItemData={trendingSeriesData}
              movieGenres={[]}
              tvGenres={tvGenres}
              portalRef={portalRef}
            />
          </Route>
          <Route exact path="/browse/genre/83/">
            <Redirect to="/browse/genre/83" />
          </Route>
          <Route
            exact
            path="/browse/genre/34399"
            key="films"
          >
            <Home
              setModalProps={setModalProps}
              trendingItemData={trendingMovieData}
              movieGenres={movieGenres}
              tvGenres={[]}
              portalRef={portalRef}
            />
          </Route>
          <Route exact path="/browse/genre/34399/">
            <Redirect to="/browse/genre/34399" />
          </Route>
          <Route exact path="/watch"><VideoPlayer /></Route>
          <Route><NoMatch /></Route>
        </Switch>
        )}
      <PortalContainer id="slider-item-modal" ref={setPortalRef} />

      {/* Modal path for EpisodesAndInfoBox */}
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
              id="slider-item-modal"
              isEpsInfoBox
              height="100%"
              width="100%"
              left="0"
              top="0"
              bottom="0"
              right="0"
            >
              <EpisodesAndInfoBox
                epsAndInfoBoxProps={epsAndInfoBoxProps}
                setModalProps={setModalProps}
              />
            </Modal>
          )}
        />
        )}

      <Footer />
    </div>
  );
};

export default Routes;
