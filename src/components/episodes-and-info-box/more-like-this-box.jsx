import React from 'react';
import styled from 'styled-components';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  column-gap: 10px;
  width: 90%;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

function MoreLikeThisBox({
  children,
}) {
  return (
    <GridContainer>
      {children}
    </GridContainer>
  );
}

export default MoreLikeThisBox;
