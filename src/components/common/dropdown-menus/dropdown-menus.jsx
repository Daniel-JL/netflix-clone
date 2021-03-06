/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import {
  NavLink,
  useLocation,
  useHistory,
} from 'react-router-dom';
import styled from 'styled-components';
import { DropdownLinkTextButton } from '../buttons/buttons';

const DropdownPanel = styled.div`
  display: flex;
  width: 200px;
  background-color: rgb(36,36,36);
  flex-direction: column;
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

export const EpisodeDropdownMenu = ({
  numOfSeasons,
  numEpsPerSeason,
  changeSelectedSeason,
  closeDropdown,
}) => {
  const handleMenuItemClick = (index) => {
    changeSelectedSeason(numEpsPerSeason[index].seasonNum)
    closeDropdown();
  };
  
  return (
    <DropdownPanel>
      {
        [
          ...Array(numOfSeasons),
        ].map((value: undefined, index: number) => (
          <DropdownLinkTextButton 
            key={index}
            onClick={() => handleMenuItemClick(index)}
          >
            Season {numEpsPerSeason[index].seasonNum} ({numEpsPerSeason[index].numEps} Episodes)
          </DropdownLinkTextButton>
          
        ))
      }
    </DropdownPanel>
  );
};
