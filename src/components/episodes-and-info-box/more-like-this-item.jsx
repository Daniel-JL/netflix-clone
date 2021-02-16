import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { RoundPlayButton } from '../buttons';

const Container = styled.div`
  display: flex;
  width: 90%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100%;
`;

const ImageButtonContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const fadeIn = keyframes`
  from {
    // transform: scale(.25);
    opacity: 0;
  }

  to {
    // transform: scale(1);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    // transform: scale(1);
    opacity: 0;
  }

  to {
    // transform: scale(.25);
    opacity: 1;
  }
`;

const PlayButton = styled(RoundPlayButton)`
  // visibility: hidden;
  background-color: black;
  visibility: ${mouseOver => !mouseOver ? 'hidden' : 'visible'};
  animation: ${mouseOver => mouseOver ? fadeOut : fadeIn} 1s linear;
  transition: visibility 1s linear;
  z-index: 2;

`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  background-color: gray;
  display: flex;
  flex-direction: column;
  font-size: 70%;
`;

function MoreLikeThisItem({
  imgSrc,
  mediaDetails,
}) {
  const [mouseOver, setMouseOver] = useState(false);

  const handleMouseOver = () => {
    console.log('mouseOver');
    setMouseOver(true);
  };

  const handleMouseOut = () => {
    console.log('mouseOut');

    setMouseOver(false)
  };

  return (
    <Container 
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOut}

    >
      <ImageButtonContainer>
        <ItemImage src={imgSrc} />
        <PlayButton mouseOver={mouseOver} />
      </ImageButtonContainer>

      <ItemDetails>
        <div>
          {mediaDetails.name}
        </div>
        <div>
          {mediaDetails.overview}
        </div>
      </ItemDetails>
    </Container>
  );
}

export default MoreLikeThisItem;
