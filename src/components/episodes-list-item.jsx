import React, { useState } from 'react';
import styled from 'styled-components';

const ItemContainer = styled.div`
  width: 100%;
  height: 200px;
`;

function EpisodesListItem(props) {

  return (
    <ItemContainer id="episodes-list-item" />
  );
}

export default EpisodesListItem;
