import React from 'react';
import {
  NavLink,
} from 'react-router-dom';
import styled from 'styled-components';
import { HeaderNav } from './header-nav';
import { RectPlayButton, RectInfoButton, LinkTextButton, RoundPlayButton, RoundDarkButton } from './buttons';
import { SearchBox } from './search-box';
import { Notifications } from './notifications';
import { AccountDropdown } from './account-dropdown';

const baseURL = 'https://api.themoviedb.org/3/';

let url = ''.concat(baseURL, 'movie/550?api_key=', process.env.REACT_APP_MOVIE_DB_API_KEY);
// let url = ''.concat(baseURL, 'trending/all/day?api_key=', process.env.REACT_APP_MOVIE_DB_API_KEY);

async function postData() {
  const fetchData = await fetch(url)
    .then((result) => result.json())
    .then(data => {
      // document.getElementById('output').innerHTML = JSON.stringify(data, null, 4);
      console.log(data.genres[0].name);
      return data;
    });

}

postData();

const Nav = styled.div`

`;

const NavLeft = styled.div`
  background-color: #000000;

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
