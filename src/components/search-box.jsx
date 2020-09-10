/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import styled from 'styled-components';
import { SearchButton } from './buttons';
import { SearchInput } from './search-input';

const Wrapper = styled.div`
  display: flex;
  padding: 10px;
`;

export const SearchBox = () => {
  const [searchActivated, setSearchActivated] = useState(false);

  return (
    <Wrapper>
      <SearchButton
        onClick={e => setSearchActivated((searchActivated) => !searchActivated)}
      />
      {searchActivated && <SearchInput />}
    </Wrapper>
  );
};
