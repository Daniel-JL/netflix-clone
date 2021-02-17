/* eslint-disable import/prefer-default-export */
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { EpisodesAndInfoBox } from './episodes-and-info-box/episodes-and-info-box';
import { EpisodesAndInfoBoxContext } from './context/episodes-and-info-box-context/episodes-and-info-box-context';

const ModalContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  height: ${(height) => height};
  width: ${(width) => width};
  left: ${(left) => left};
  top: ${(top) => top};
  bottom: ${(bottom) => bottom};
  right: ${(right) => right};
  bottom: 0;
  right: 0;
  z-index: 10;

  ${({ isEpsInfoBox }) => isEpsInfoBox && `
    position: fixed;
    overflow: scroll;

  `}

  ${({ scrollActive }) => !scrollActive && `
    overflow: hidden;
  `}
`;

export const Modal = ({ 
  children,
  id,
  isEpsInfoBox,
  height,
  width,
  left,
  top,
  bottom,
  right
}) => {
  const [scrollActive, setScrollActive] = useState(true);
  console.log(height);
  console.log(width);
  console.log(left);
  console.log(top);
  console.log(bottom);
  console.log(right);
  const setScrollHidden = () => {
    setScrollActive(false);
  };

  return createPortal(
    <ModalContainer
      isEpsInfoBox={isEpsInfoBox}
      scrollActive={scrollActive}
      id="modalContainer"
      height={height}
      width={width}
      left={left}
      top={top}
      bottom={bottom}
      right={right}
    >
      {
        React.Children.map(children, (child) => React.cloneElement(child, {
          setScrollHidden,
        }))
      }
    </ModalContainer>,
    document.getElementById(id),
  );
};
