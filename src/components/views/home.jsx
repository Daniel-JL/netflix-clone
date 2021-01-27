/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import { MotionBackground } from '../motion-background';
import { LocoRow } from '../slider/loco-row';
import { InfiniteScroll } from '../infinite-scroll';
import getTrendingMediaIdsAndTypes from '../../helpers/getTrendingMediaIdsAndTypes';

export const Home = (props) => {
  const maxNumScrollLoads = 5;

  return (
    <div style={{ backgroundColor: 'black', zIndex: -2 }}>
      {/* <MotionBackground />
      <LocoRow setModalProps={props.setModalProps}/> */}
      {/* <LocoRow /> */}
      <InfiniteScroll viewName="home" maxNumScrollLoads={maxNumScrollLoads} />
    </div>
  );
};
