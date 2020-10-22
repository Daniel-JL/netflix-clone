/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import {
  NavLink,
} from 'react-router-dom';
import styled from 'styled-components';
import { MotionBackground } from './motion-background';
import { LocoRow } from './loco-row';
import { LolomoBigRow } from './lolomo-big-row';

const LocoRowGroup = () => (
  <div>
    <LocoRow />
    <LocoRow />
    <LocoRow />
    <LocoRow />
    <LocoRow />
  </div>
);

export const InfiniteScrollHomeComponents = (props) => {
  const maxNumScrollLoads = props.maxNumScrollLoads;
  const [scrollLimitReached, setScrollLimitReached] = useState(props.scrollLimitReached);

  useEffect(() => {
    setScrollLimitReached(props.scrollLimitReached);
    console.log(scrollLimitReached);
  }, [props.scrollLimitReached]);

  console.log('test');
  return (
    <div style={{backgroundColor: 'darkslategray', zIndex: -2}}>
      <MotionBackground />
      <LocoRow />
      
      {/* <LocoRow />
      <LocoRow />
      <LocoRow />
      <LolomoBigRow />
      <LocoRow />
      <LocoRow /> */}
      {scrollLimitReached > 0 && <LocoRowGroup />}
      {scrollLimitReached > 1 && <LocoRowGroup />}
      {scrollLimitReached > 2 && <LocoRowGroup />}
      {scrollLimitReached > 3 && <LocoRowGroup />}
      {scrollLimitReached > 4 && <LocoRowGroup />}
    </div>
  );
};
