/* eslint-disable import/prefer-default-export */
import React from 'react';
import { MotionBackground } from '../motion-background';
import { LocoRow } from '../loco-row';
import { InfiniteScroll } from '../infinite-scroll';

export const Films = () => {
  const maxNumScrollLoads = 5;

  return (
    <div style={{ backgroundColor: 'darkslategray', zIndex: -2 }}>
      <MotionBackground />
      <LocoRow />
      <LocoRow />
      <InfiniteScroll viewName="films" maxNumScrollLoads={maxNumScrollLoads} />
    </div>
  );
};
