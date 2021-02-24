/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import { 
  BrowserRouter,
  Switch,
  Route,
  Link,
  NavLink,
} from 'react-router-dom';
import './App.css';
import { Header } from './components/header';
import { Footer } from './components/footer';

export default function App() {

  return (
    <main>
      <Switch>
      {/* <Header className="header">

      </Header>

      <div id="large-image"></div>

      <div id="movie-browse-view">This should be a component</div>

      <Footer className="footer">

      </Footer> */}
      </Switch>
    </main>
  );
}