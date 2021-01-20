import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 90%;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100%;
`;

function MoreLikeThisItem(props) {
  return (
    <Container>
      <ItemImage src={props.imgSrc} />
    </Container>
  );
}

export default MoreLikeThisItem;
