/* eslint-disable import/prefer-default-export */
import React from 'react';
import { LocoRow } from '../loco-row';
import { InfiniteScroll } from '../infinite-scroll';

export const Search = () => {
  const maxNumScrollLoads = 6;

  return (
    <div style={{ backgroundColor: 'darkslategray', zIndex: -2 }}>
      <LocoRow />
      <LocoRow />
      <LocoRow />
      <LocoRow />
      <LocoRow />
      <LocoRow />
      <LocoRow />
      <LocoRow />
      <LocoRow />
      <LocoRow />
      <InfiniteScroll viewName="search" maxNumScrollLoads={maxNumScrollLoads} />
    </div>

  );
};
