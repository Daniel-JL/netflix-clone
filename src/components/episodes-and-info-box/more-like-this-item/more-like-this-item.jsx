import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  Link,
} from 'react-router-dom';
import ImageWithOverlay from '../image-with-overlay/image-with-overlay';
import { PlayButton } from '../../common/buttons/buttons';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 200px;
  flex-direction: column;
  align-self: center;
  background-color: rgb(64,64,64);
`;

const ItemImage = styled.img`
  width: 100%;
`;

const ItemDetails = styled.div`
  display: flex;
  display: relative;
  flex-direction: column;
  font-size: 80%;
`;

const MediaTitle = styled.div`
  font-size: 105%;
  font-weight: bold;
`;

function MoreLikeThisItem({
  imgSrc,
  mediaDetails,
  handleImgLoad,
}) {
  const [mouseOver, setMouseOver] = useState(false);

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
        <ImageWithOverlay 
          image={<ItemImage src={imgSrc} onLoad={() => handleImgLoad()}/>}
          overlayItem={<PlayButton />}
          fadeIn={mouseOver}
          handleImgLoad={handleImgLoad}
        />
        <ItemDetails>
          <MediaTitle>
            {mediaDetails.name}
          </MediaTitle>
          <div>
            {mediaDetails.overview}
          </div>
        </ItemDetails>

      </Container>      
    </Link>
    
  );
}

export default MoreLikeThisItem;
