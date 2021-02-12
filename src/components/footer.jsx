/* eslint-disable import/prefer-default-export */
import React from 'react';
import {
  NavLink,
} from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.div`
  width: 100%;
  height: 300px;
  background-color: black;
`;

export function Footer() {
  return (
    <FooterContainer />
  );
}
