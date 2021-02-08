/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import {
  NavLink,
  useLocation,
  useHistory,
} from 'react-router-dom';
import styled from 'styled-components';
import { DropdownLinkTextButton } from './buttons';

const DropdownPanel = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 50px;
  position: absolute;
  z-index: 2;
`;

export const AccountDropdownMenu = () => {
  return (
    <DropdownPanel>
      <NavLink to="/profiles/manage">Manage Profiles</NavLink>
      <NavLink to="/YourAccount">Account</NavLink>
      <NavLink to="/HELP">Help Centre</NavLink>
      <NavLink to="/sign-out">Sign out of Netflix</NavLink>
    </DropdownPanel>
  );
};

export const EpisodeDropdownMenu = (props) => {
  const handleMenuItemClick = (index) => {
    props.changeSelectedSeason(props.seasonEpisodeData[index].seasonNum)
    props.resetEpisodeListItemLimit();
  };
  
  return (
    <DropdownPanel>
      {
        [
          ...Array(props.numOfSeasons),
        ].map((value: undefined, index: number) => (
          <DropdownLinkTextButton 
            key={index}
            onClick={() => handleMenuItemClick(index)}
          >
            Season {props.seasonEpisodeData[index].seasonNum} ({props.seasonEpisodeData[index].episodeData.length} Episodes)
          </DropdownLinkTextButton>
          
        ))
      }
    </DropdownPanel>
  );
};
