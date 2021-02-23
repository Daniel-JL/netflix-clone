import React from 'react';
import styled from 'styled-components';
import NetflixIcon from '../assets/images/netflix-logo.png';
import SearchIcon from '../assets/images/magnifying-glass.png';

const RectButton = styled.button`
  font-family: "Roboto", sans-serif;
  color: white;
  font-weight: 100;
  cursor: pointer;
  transition: transform 0.3s ease;
  height: 3vw;
  // width: 65px;
  font-size: 1vw;
  border: 1px solid black;
  margin: 0.3vw;
`;

const RoundButton = styled.button`
  font-family: "Roboto", sans-serif;
  font-color: white;
  font-weight: normal;
  cursor: pointer;
  transition: transform 0.3s ease;
  height: 2.5vw;
  width: 2.5vw;
  font-size: 15px;
  border-radius: 50%;
  border: 1px solid white;
  text-align: center; 
`;

export const RectPlayButton = styled(RectButton)`
  color: black;
  background-color: rgba(255, 255, 255, 0.9);
  &:hover {
    background-color: rgba(255, 255, 255, 0.7);
  }
`;

export const RectInfoButton = styled(RectButton)`
  color: white;
  background-color: rgba(128,128,128, 0.7);

  &:hover {
    background-color: rgba(128,128,128, 0.4);
  };
`;

export const NetflixButton = styled.button`
  padding-bottom: 5px;
  background: url(${NetflixIcon}) no-repeat;
  background-size: cover;
  cursor: pointer;
  border: none;
  width: 80px;
  height: 20px;

  &:focus {
    outline: none;
  }
`;

export const SearchButton = styled.button`
  padding-bottom: 5px;
  background: url(${SearchIcon}) no-repeat;
  background-size: cover;
  cursor: pointer;
  border: none;
  width: 18px;
  height: 18px;

  &:focus {
    outline: none;
  }
`;

export const LinkTextButton = styled(RectButton)`
  border: 0px;
  background-color: transparent;

  &:hover {
    opacity: 0.6;
  }

  &:focus {
    font-size: 12px;
    font-weight: bold;
    outline: none;
  }
`;

export const DropdownLinkTextButton = styled(LinkTextButton)`
  color: white;
`;

export const RoundPlayButton = styled(RoundButton)`
  background-color: white;
  font-size: 25px;
  
  &:hover {
    background-color: rgba(255,255,255, 0.8);
  };
`;

export const PlayButton = styled(RoundPlayButton)`
  position: absolute;
  background:rgba(255,255,255, 0.3);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const RoundMuteButton = styled(RoundButton)`
  background-color: transparent;
  font-size: 25px;
  border: 1px solid white;

  &:hover {
    background-color: rgba(255,255,255, 0.8);
  };
`;

export const RoundPlusButton = styled(RoundButton)`
  background-color: white;
  font-size: 25px;


  &:hover {
    background-color: rgba(255,255,255, 0.8);
  };
`;

export const RoundThumbsUpButton = styled(RoundButton)`
  background-color: white;
  font-size: 25px;


  &:hover {
    background-color: rgba(255,255,255, 0.8);
  };
`;

export const RoundThumbsDownButton = styled(RoundButton)`
  background-color: white;
  font-size: 25px;


  &:hover {
    background-color: rgba(255,255,255, 0.8);
  };
`;

export const RoundEpsAndInfoButton = styled(RoundButton)`
  background-color: white;
  font-size: 25px;
  
  &:hover {
    background-color: rgba(255,255,255, 0.8);
  };
`;

export const RoundDarkButton = styled(RoundButton)`
  background-color: gray;
  color: white;

  &:hover {
    background-color: rgba(255,255,255, 0.2);
  };
`;

export const ArrowButton = styled.button`
  height: 140px;
  width: 40px;
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
`;
