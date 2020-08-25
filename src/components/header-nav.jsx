/* eslint-disable import/prefer-default-export */
import React from 'react';
import { 
  NavLink,
} from 'react-router-dom';
import { AccountDropdown } from './account-dropdown';

const IHeaderNavProps = {

};

export function HeaderNav() {

  return (
    <div>
      <nav>
        <NavLink to="/" />
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/test">Test</NavLink>
        <NavLink to="/tv-shows">TV Shows</NavLink>
        <NavLink to="/movies">Movies</NavLink>
        <NavLink to="/recent">Recently Added</NavLink>
        <NavLink to="/my-list">My List</NavLink>
      </nav>

      <nav>
        <NavLink to="/search">SEARCH HERE</NavLink>
        <NavLink to="/kids">KIDS</NavLink>
        <NavLink to="/dvd">DVD</NavLink>
        <AccountDropdown />

      </nav>
    </div>
  );
}
