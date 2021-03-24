/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import {
  NavLink,
  useLocation,
  useHistory,
} from 'react-router-dom';
import styled from 'styled-components';

const SearchInput = () => {
  const location = useLocation();
  const history = useHistory();
  const [searchInputText, setSearchInputText] = useState(`${location.pathname}`);
  const [initialUrl] = useState(`${location.pathname}`);

  const handleChange = (e) => {
    setSearchInputText(`${e.target.value}`);
    if (e.target.value === '') {
      history.push(initialUrl);
    } else {
      history.push(`search?q=${e.target.value}`);
    }
  };

  return (
    <div>
      <NavLink to={`${searchInputText}`}>
        <input
          type="text"
          onChange={(e) => handleChange(e)}
        />
      </NavLink>
    </div>
  );
};

export default SearchInput;
