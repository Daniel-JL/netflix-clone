/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import {
  NavLink,
} from 'react-router-dom';
import styled from 'styled-components';
import { MotionBackground } from './motion-background';
import { LocoRow } from './loco-row';
import { LolomoBigRow } from './lolomo-big-row';
import { InfiniteScrollHomeComponents } from './infinite-scroll-home-components';

const LocoRowGroup = () => (
  <div>
    <LocoRow />
    <LocoRow />
    <LocoRow />
    <LocoRow />
    <LocoRow />
  </div>
);

const infiniteScrollFirstLoadGroup = {
  home: () => (
    <>
      <LocoRow />
      <LolomoBigRow />
      <LocoRow />
      <LocoRow />
      <LocoRow />
    </>
  ),
  films: () => (
    <div>
      <LocoRow />
      <LolomoBigRow />
      <LocoRow />
      <LocoRow />
      <LocoRow />
    </div>
  ),
  series: () => (
    <div>
      <LocoRow />
      <LolomoBigRow />
      <LocoRow />
      <LocoRow />
      <LocoRow />
    </div>
  ),
  search: () => (
    <div>
      <LocoRow />
      <LocoRow />
      <LocoRow />
      <LocoRow />
      <LocoRow />
    </div>
  ),
}

export const InfiniteScroll = (props) => {
  let scrollGroupActive = useRef(0);
  const [toggleForRerender, setToggleForRerender] = useState(false);
  const [element, setElement] = useState(null);
  const maxNumScrollLoads = props.maxNumScrollLoads;

  const prevY = useRef(0);
  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        const { y } = firstEntry.boundingClientRect;

        if (prevY.current > y && scrollGroupActive.current <= maxNumScrollLoads) {
          mountMoreComponents();
        }

        prevY.current = y;
      },
      { threshold: 0.5 },
    ),
  );

  const mountMoreComponents = () => {
    scrollGroupActive.current++;
    setToggleForRerender(toggleForRerender => !toggleForRerender);
  };

  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);
  console.log(infiniteScrollFirstLoadGroup['home']);

  return (
    <div>
      {props.viewName === 'home' && <InfiniteScrollHomeComponents scrollLimitReached={scrollGroupActive.current} />}
      {props.viewName === 'series' && <InfiniteScrollHomeComponents scrollLimitReached={scrollGroupActive.current} />}
      {props.viewName === 'films' && <InfiniteScrollHomeComponents scrollLimitReached={scrollGroupActive.current} />}
      {props.viewName === 'search' && <InfiniteScrollHomeComponents scrollLimitReached={scrollGroupActive.current} />}
      <div ref={setElement} />
    </div>
  );
};
