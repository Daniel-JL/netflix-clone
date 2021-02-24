/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import styled from 'styled-components';
import { SearchButton } from './buttons';
import { SearchInput } from './search-input';

const SearchBoxContainer = styled.div`
  display: flex;
  padding: 10px;
`;

export const SearchBox = () => {
  const [searchActivated, setSearchActivated] = useState(false);

  return (
    <SearchBoxContainer>
      <SearchButton
        onClick={e => setSearchActivated(() => !searchActivated)}
      />
      {searchActivated && <SearchInput />}
    </SearchBoxContainer>
  );
};
