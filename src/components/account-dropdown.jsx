import React, { useState } from 'react';
import { 
  NavLink,
} from 'react-router-dom';
import styled from 'styled-components';
import { RectInfoButton } from './buttons';
import { AccountDropdownMenu } from './account-dropdown-menu';


const IDropdownProps = {
  currentUrl: 1,

};

const DropdownDiv = styled.div`

`;

export function AccountDropdown() {
  const [dropdownActive, setDropdownActive] = useState(false);

  function toggleDropdown() {
    //  TODO
    //  Get this function to toggle dropdown state
  }

  return(
    <div>
      <nav>
        <RectInfoButton 
          onMouseOver={e => setDropdownActive((dropdownActive) => !dropdownActive)}
          onMouseOut={e => setDropdownActive((dropdownActive) => !dropdownActive)}
        />
        {dropdownActive && <AccountDropdownMenu />}
        
      </nav>
    </div>
  )
}

