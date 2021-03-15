import React, { useState } from 'react';
import styled from 'styled-components';
import { SearchButton } from '../../common/buttons/buttons';
import { SearchInput } from '../search-input/search-input';

const SearchBoxContainer = styled.div`
  display: flex;
  padding: 10px;
`;

const SearchBox = () => {
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

export default SearchBox;