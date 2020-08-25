import React from 'react';
import { 
  NavLink,
} from 'react-router-dom';

const IDropdownProps = {
  currentUrl: 1,

};

export function AccountDropdown() {

  function toggleDropdown() {
    //  TODO
    //  Get this function to toggle dropdown state
  }

  return(
    <div>
      <nav>
        <NavLink to="/settings">Settings</NavLink>

      </nav>
    </div>
  )
}

