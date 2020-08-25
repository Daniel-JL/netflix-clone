import React from 'react';
import {
  NavLink,
} from 'react-router-dom';
import { HeaderNav } from './header-nav';

const IHeaderProps = {
  currentUrl: 1,

};

function Header() {
  return (
    <div>
      <HeaderNav />
    </div>
  );
}

export default Header;

export {
  Header,
};
