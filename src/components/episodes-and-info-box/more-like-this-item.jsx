import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  Link,
} from 'react-router-dom';
import { Transition } from 'react-transition-group';
import { RoundPlayButton } from '../buttons';

const Container = styled.div`
  // position: static;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

const ItemImage = styled.img`
  width: 100%;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const ImageButtonContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const PlayButton = styled(RoundPlayButton)`
  position: absolute;
  background:rgba(255,255,255, 0.3);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ItemDetails = styled.div`
  display: flex;
  display: relative;
  flex-direction: column;
  background-color: gray;
  font-size: 70%;
`;

function MoreLikeThisItem({
  imgSrc,
  mediaDetails,
}) {
  const [mouseOver, setMouseOver] = useState(false);

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

  const handleMouseOver = () => {
    setMouseOver(true);
  };

  const handleMouseOut = () => {
    setMouseOver(false);
  };

  return (
    <Link
      key={1}
      to="/watch"
      style={{ color: 'inherit', textDecoration: 'inherit'}}
    >
      <Container
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}

      >
        <ImageButtonContainer id="ImgButtonContainer">
          <Transition
            appear
            in={mouseOver}
            timeout={100}
          >
            {(state) => (
              <PlayButton
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state],
                }}
              >
                |>
              </PlayButton>
            )}
          </Transition>
          <ImageContainer>
            <ItemImage src={imgSrc} />
          </ImageContainer>
        </ImageButtonContainer>
        <ItemDetails>
          <div>
            {mediaDetails.name}
          </div>
          <div  >
            {mediaDetails.overview}
          </div>
        </ItemDetails>

      </Container>      
    </Link>
    
  );
}

export default MoreLikeThisItem;
