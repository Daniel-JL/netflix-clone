/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { MotionBackground } from './motion-background';
import { LocoRow } from './slider/loco-row';
import { LolomoBigRow } from './slider/lolomo-big-row';

const FirstLoadGroupHomeSearchFilms = (props) => (
  <div>
    <LocoRow />
    <LolomoBigRow />
    <LocoRow />
    <LocoRow />
  </div>
);

const LocoRowGroupHomeSearchFilms = (props) => (
  <div>
    <LocoRow />
    <LocoRow />
    <LocoRow />
    <LocoRow />
    <LocoRow />
  </div>
);

const LocoRowGroupSearch = (props) => (
  <div>
    <LocoRow />
    <LocoRow />
    <LocoRow />
    <LocoRow />
    <LocoRow />
    <LocoRow />
    <LocoRow />
    <LocoRow />
  </div>
);

export const InfiniteScrollComponents = (props) => {
  const maxNumScrollLoads = props.maxNumScrollLoads;
  const [scrollLimitReached, setScrollLimitReached] = useState(props.scrollLimitReached);
  let firstComponentGroup = 0;
  let locoRowGroup = 0;

  if(props.viewName === 'home' || props.viewName === 'series' || props.viewName === 'films') {
    firstComponentGroup = <FirstLoadGroupHomeSearchFilms />
    locoRowGroup = <LocoRowGroupHomeSearchFilms />
  } else if (props.viewName === 'search') {
    firstComponentGroup = <LocoRowGroupSearch />
    locoRowGroup = <LocoRowGroupSearch />
  }

  useEffect(() => {
    setScrollLimitReached(props.scrollLimitReached);
    console.log(scrollLimitReached);
  }, [props.scrollLimitReached]);

  return (
    <div>
      {scrollLimitReached > 0 && firstComponentGroup}
      {
        [
          ...Array(props.maxNumScrollLoads - 1),
        ].map((value: undefined, index: number) => (
          scrollLimitReached > (index + 1) && locoRowGroup
        ))
      }
    </div>
  );
};
