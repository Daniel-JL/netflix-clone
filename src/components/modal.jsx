/* eslint-disable import/prefer-default-export */
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { EpisodesAndInfoBox } from './episodes-and-info-box/episodes-and-info-box';
import { EpisodesAndInfoBoxContext } from './context/episodes-and-info-box-context/episodes-and-info-box-context';

const ModalContainer = styled.div`
  // position: fixed;
  position: absolute;
  display: flex;
  justify-content: center;
  margin: auto;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  // overflow: scroll;
  z-index: 10;

  ${({ scrollActive }) => !scrollActive && `
    overflow: hidden;
  `}
`;

export const Modal = ({ children, id }) => {
  const [scrollActive, setScrollActive] = useState(true);

  const setScrollHidden = () => {
    setScrollActive(false);
  };

  return createPortal(
    <ModalContainer scrollActive={scrollActive}>
      {
        React.Children.map(children, (child) => React.cloneElement(child, {
          setScrollHidden,
        }))
      }

      {/* {children} */}
    </ModalContainer>,
    document.getElementById(id),
  );
};
