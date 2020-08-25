/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import { 
  BrowserRouter as Router,
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
    <div>
      <Router>
        <Header className="header">

        </Header>
      </Router>

      <div id="large-image"></div>

      <div id="movie-browse-view">This should be a component</div>

      <Footer className="footer">

      </Footer>
    </div>
  );
}