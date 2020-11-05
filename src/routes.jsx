/* eslint-disable import/prefer-default-export */
import React from 'react';
import {
  Route,
  Switch,
  Redirect,
  useLocation,
} from 'react-router-dom';
import styled from 'styled-components';
import { Header } from './components/header';
import { EpisodesAndInfoBox } from './components/episodes-and-info-box';
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
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <div>
      <Header />

      <Switch location={background || location}>
        <Route exact path="/browse" children={<Home />} />
        <Route exact path="/">
          <Redirect to="/browse" />
        </Route>
        {/* <Route
          path="/browse/epsinfobox"
          render={() =>
            <Modal>
              <EpisodesAndInfoBox />
            </Modal>
          }
        >
        </Route> */}
        {/* <Route path="/browse/epsinfobox" children={<EpisodesAndInfoBox />} /> */}
        <Route exact path="/browse/genre/83" children={<Series />} />
        <Route exact path="/browse/genre/34399" children={<Films />} />
        <Route exact path="/latest" children={<Latest />} />
        <Route exact path="/browse/my-list" children={<MyList />} />
        <Route exact path="/search" children={<Search />} />
        <Route exact path="/Kids" children={<Kids />} />
        <Route exact path="/watch/:videoId" children={<VideoPlayer />} />
        <Route children={<NoMatch />} />
      </Switch>
      {background
        && (
        <Route
          path="/browse/epsinfobox"
          render={() => (
            <Modal children={<EpisodesAndInfoBox />}>
              {/* <EpisodesAndInfoBox /> */}
            </Modal>
          )}
        />
        )}

      <Footer />

      
      {/* {background && <Route path="/browse/epsinfobox" children={<EpisodesAndInfoBox />} />} */}
    </div>
  );
};
