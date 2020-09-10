import React from 'react';
import styled from 'styled-components';

const BillboardRow = styled.div`
  width: 100%;
  padding-top: 40%;
`;

const MotionBackgroundContainer = styled.div`
  width: 100%;
  // 617 x 355,5 0,57618 1412x802,69 0,56847
  padding-top: 56.25%;
  background-color: gray;
  position: absolute;
  top:0;
  z-index: -1;
`;

export function MotionBackground() {
  return (
    <div>
      <MotionBackgroundContainer />
      <BillboardRow />
    </div>
  );
}
