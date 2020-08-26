import React from 'react';
import {
  NavLink,
} from 'react-router-dom';
import styled from 'styled-components';
import { HeaderNav } from './header-nav';

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

function Header() {
  return (
    <div>
      <NavLeft>
        <HeaderNav />
      </NavLeft>
    </div>
  );
}

export default Header;

export {
  Header,
};
