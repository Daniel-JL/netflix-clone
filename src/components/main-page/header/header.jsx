import React from 'react';
import {
  NavLink,
} from 'react-router-dom';
import styled from 'styled-components';
import {
  LinkTextButton,
  NetflixButton,
} from '../../common/buttons/buttons';

const Nav = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: fixed;
  top: 0;
  width: 100%;
  padding-top: 10px;
  z-index: 4;
`;

const NavLeft = styled.div`
  padding-left: 40px;
`;

const NavRight = styled.div`
  padding-right: 40px;
  display: flex;
  
`;

const Header = () => {
  return (
    <Nav>
      <NavLeft>
        <NavLink to="/browse">
          <NetflixButton />
        </NavLink>

        <NavLink to="/browse">
          <LinkTextButton>Home</LinkTextButton>
        </NavLink>

        <NavLink to="/browse/genre/83">
          <LinkTextButton>Series</LinkTextButton>
        </NavLink>

        <NavLink to="/browse/genre/34399">
          <LinkTextButton>Films</LinkTextButton>
        </NavLink>
      </NavLeft>
    </Nav>
  );
};

export default Header;
