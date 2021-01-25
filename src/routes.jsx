/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import {
  Route,
  Switch,
  Redirect,
  useLocation,
} from 'react-router-dom';
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

  return (
    <div>
      <Header />

      <Switch location={background || location}>
        <Route exact path="/browse" children={<Home setModalProps={setModalProps}/>} />
        <Route exact path="/">
          <Redirect to="/browse" />
        </Route>
        <Route exact path="/browse/genre/83" children={<Series setModalProps={setModalProps}/>} />
        <Route exact path="/browse/genre/34399" children={<Films setModalProps={setModalProps}/>} />
        <Route exact path="/latest" children={<Latest setModalProps={setModalProps}/>} />
        <Route exact path="/browse/my-list" children={<MyList />} />
        <Route exact path="/search" children={<Search setModalProps={setModalProps}/>} />
        <Route exact path="/Kids" children={<Kids />} />
        <Route exact path="/watch/:videoId" children={<VideoPlayer />} />
        <Route children={<NoMatch />} />
      </Switch>

      {background
        && (
        <Route
          path="/browse/epsinfobox"
          render={() => (
            <Modal epsAndInfoBoxProps={epsAndInfoBoxProps}/>
          )}
        />
        )}

      <Footer />
    </div>
  );
};
