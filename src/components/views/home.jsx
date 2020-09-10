import React from 'react';
import { 
  NavLink,
} from 'react-router-dom';
import styled from 'styled-components';
import { MotionBackground } from '../motion-background';
import { LocoRow } from '../loco-row';
import { LolomoBigRow } from '../lolomo-big-row';

export const Home = () => {
  return(
    <div>
      <MotionBackground />
      <LocoRow />
      <LocoRow />
      <LocoRow />
      <LocoRow />
      <LolomoBigRow />
    </div>

  )
}