/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import {
  NavLink,
} from 'react-router-dom';
import styled from 'styled-components';
import { RectInfoButton } from './buttons';
import { AccountDropdownMenu } from './account-dropdown-menu';

export function AccountDropdown() {
  const [dropdownActive, setDropdownActive] = useState(false);

  return (
    <div>
      <nav>
        <RectInfoButton
          onMouseOver={() => setDropdownActive((dropdownActive) => !dropdownActive)}
          onMouseOut={() => setDropdownActive((dropdownActive) => !dropdownActive)}
        />
        {dropdownActive && <AccountDropdownMenu />}

      </nav>
    </div>
  );
}
