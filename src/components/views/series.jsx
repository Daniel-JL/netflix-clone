/* eslint-disable import/prefer-default-export */
import React from 'react';
import { MotionBackground } from '../motion-background';
import { LocoRow } from '../slider/loco-row';
import { InfiniteScroll } from '../infinite-scroll';

export const Series = (props) => {
  const maxNumScrollLoads = 5;

  return (
    <div style={{ backgroundColor: 'darkslategray', zIndex: -2 }}>
      <MotionBackground />
      <LocoRow setModalProps={props.setModalProps}/>
      <LocoRow setModalProps={props.setModalProps}/>
      <InfiniteScroll viewName="home" maxNumScrollLoads={maxNumScrollLoads} />
    </div>
  );
};
