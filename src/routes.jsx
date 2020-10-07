import React from 'react';
import {
  Route,
  Switch,
  Redirect,
  useLocation,
} from 'react-router-dom';
import styled from 'styled-components';
import { Header } from './components/header';
import { Home } from './components/views/home';
import { Series } from './components/views/series';
import { Films } from './components/views/films';
import { Latest } from './components/views/latest';
import { MyList } from './components/views/my-list';
import { Search } from './components/views/search';
import { Kids } from './components/views/kids';
import { VideoPlayer } from './components/views/video-player';
import { NoMatch } from './components/views/no-match';
import { EpisodesAndInfoBox } from './components/episodes-and-info-box';

export const Routes = () => {
  let location = useLocation();
  let background = location.state && location.state.background;

  return(
    <div>
      <Header />
      <Switch location={background || location}>
        <Route exact path='/browse' component={Home} />
        <Route exact path='/'>
          <Redirect to='/browse' />
        </Route>
        {/* <Route exact path='/search?q='>
          <Redirect to='/browse' />
        </Route> */}
        <Route exact path='/browse/genre/83' component={Series} />
        <Route exact path='/browse/genre/34399' component={Films} />
        <Route exact path='/latest' component={Latest} />
        <Route exact path='/browse/my-list' component={MyList} />
        <Route exact path='/search' component={Search} />
        <Route exact path='/Kids' component={Kids} />
        <Route exact path='/watch/:videoId' component={VideoPlayer} />
        <Route component={NoMatch} />
      </Switch>

      {background && <Route path='/browser?bv=' children={<EpisodesAndInfoBox />} />}
    </div>
  )
}

