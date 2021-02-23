import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const ImageOverlayContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ImageWithOverlay = ({
  image,
  overlayItem,
  fadeIn,
}) => {
  const duration = 300;

  const defaultStyle = {
    transition: `all ${duration}ms ease-in-out`,
    opacity: 0,
  };

  const transitionStyles = {
    entering: {},
    entered: {
      opacity: 1,
    },
    exiting: {},
    exited: {},
  };

  return (
    <ImageOverlayContainer>
      <Transition
        appear
        in={fadeIn}
        timeout={100}
      >
        {(state) => (
          React.Children.map(overlayItem, (child) => (
            React.cloneElement(child, {
              style: {
                ...defaultStyle,
                ...transitionStyles[state],
              },
            })
          ))
        )}
      </Transition>
      <ImageContainer>
        {image}
      </ImageContainer>
    </ImageOverlayContainer>
  );
};

export default ImageWithOverlay;
