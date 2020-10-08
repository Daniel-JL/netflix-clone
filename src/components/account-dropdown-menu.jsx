/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import {
  NavLink,
  useLocation,
  useHistory,
} from 'react-router-dom';
import styled from 'styled-components';

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
