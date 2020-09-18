/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import {
  NavLink,
} from 'react-router-dom';
import styled from 'styled-components';
import { MotionBackground } from '../motion-background';
import { LocoRow } from '../loco-row';
import { LolomoBigRow } from '../lolomo-big-row';

const LocoRowGroup = () => (
  <div>
    <LocoRow />
    <LocoRow />
    <LocoRow />
    <LocoRow />
    <LocoRow />
  </div>
);

export const Home = () => {
  let scrollGroupActive = useRef(0);
  const [test, setTest] = useState(false);
  const [element, setElement] = useState(null);

  const prevY = useRef(0);
  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        const { y } = firstEntry.boundingClientRect;

        if (prevY.current > y) {
          mountMoreComponents();
        }

        prevY.current = y;
      },
      { threshold: 0.5 },
    ),
  );

  const mountMoreComponents = () => {
    scrollGroupActive.current++;
    setTest(test => !test);
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

  return (
    <div>
      <MotionBackground />
      <LocoRow />
      <LocoRow />
      <LocoRow />
      <LocoRow />
      <LolomoBigRow />
      <LocoRow />
      <LocoRow />
      {(scrollGroupActive.current > 0) && <LocoRowGroup />}
      {scrollGroupActive.current > 1 && <LocoRowGroup />}
      {scrollGroupActive.current > 2 && <LocoRowGroup />}
      {scrollGroupActive.current > 3 && <LocoRowGroup />}
      {scrollGroupActive.current > 4 && <LocoRowGroup />}
      <div ref={setElement} />
    </div>
  );
};
