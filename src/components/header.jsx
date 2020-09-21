import React from 'react';
import {
  NavLink,
  Link,
} from 'react-router-dom';
import styled from 'styled-components';
import { HeaderNav } from './header-nav';
import { RectPlayButton, RectInfoButton, LinkTextButton, NetflixButton, RoundPlayButton, RoundDarkButton } from './buttons';
import { SearchBox } from './search-box';
import { Notifications } from './notifications';
import { AccountDropdown } from './account-dropdown';

const Nav = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: fixed;
  top: 0;
  width: 100%;
  padding-top: 10px;
  z-index: 1;
  
`;

const NavLeft = styled.div`
  padding-left: 40px;
`;

const NavRight = styled.div`
  padding-right: 40px;
  display: flex;
  
`;

const IHeaderProps = {
  currentUrl: 1,

};

export function Header() {
  return (
    <Nav>
      <NavLeft>
        <Link to='/browse'>
          <NetflixButton />
        </Link>
        <NavLink to='/browse'>
          <LinkTextButton>Home</LinkTextButton>
        </NavLink>
        <NavLink to='/browse/genre/83'>
          <LinkTextButton>Series</LinkTextButton>
        </NavLink>
        <NavLink to='/browse/genre/34399'>
          <LinkTextButton>Films</LinkTextButton>
        </NavLink>
        <NavLink to='/latest'>
          <LinkTextButton>Latest</LinkTextButton>
        </NavLink>
        <NavLink to='/browse/my-list'>
          <LinkTextButton>My List</LinkTextButton>
        </NavLink>
      </NavLeft>
      
      <NavRight>
        <SearchBox />
        <Link to='/Kids'>
          <LinkTextButton>Children</LinkTextButton>
        </Link>
        <Notifications />
        <AccountDropdown />
      </NavRight>
    </Nav>
  );
}

