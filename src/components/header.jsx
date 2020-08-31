import React from 'react';
import {
  NavLink,
} from 'react-router-dom';
import styled from 'styled-components';
import { HeaderNav } from './header-nav';
import { RectPlayButton, RectInfoButton, LinkTextButton } from './buttons';
import { SearchBox } from './search-box';
import { Notifications } from './notifications';
import { AccountDropdown } from './account-dropdown';



const Nav = styled.div`

`;

const NavLeft = styled.div`
  background-color: #FF0000;

`;

const NavRight = styled.div`

`;

const IHeaderProps = {
  currentUrl: 1,

};

export function Header() {
  return (
    <Nav>
      <NavLeft>
        <RectPlayButton />
        <LinkTextButton>Home</LinkTextButton>
        <LinkTextButton>Series</LinkTextButton>
        <LinkTextButton>Films</LinkTextButton>
        <LinkTextButton>Latest</LinkTextButton>
        <LinkTextButton>My List</LinkTextButton>

        
      </NavLeft>
      
      <NavRight>
        <SearchBox />
        <LinkTextButton>Children</LinkTextButton>
        <RectPlayButton />
        <Notifications />
        <AccountDropdown />
      </NavRight>
    </Nav>
  );
}
