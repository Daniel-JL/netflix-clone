import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

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

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  background-color: gray;
  display: flex;
  flex-direction: column;
  font-size: 70%;
`;

function MoreLikeThisItem(props) {
  return (
    <Container>
      <ItemImage src={props.imgSrc} />

      <ItemDetails>
        <div>
          {props.mediaDetails.name}
        </div>
        <div>
          {props.mediaDetails.overview}
        </div>
      </ItemDetails>
    </Container>
  );
}

export default MoreLikeThisItem;
