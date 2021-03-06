import styled from 'styled-components';
import NetflixIcon from '../../../assets/images/netflix-logo.png';
import SearchIcon from '../../../assets/images/magnifying-glass.png';
import PlayIcon from '../../../assets/images/play.png';
import InfoIcon from '../../../assets/images/information.png';
import MuteIcon from '../../../assets/images/mute.png';
import ReplayIcon from '../../../assets/images/replay.png';
import BackIcon from '../../../assets/images/back-arrow.png';

const RectButton = styled.button`
  font-family: "Roboto", sans-serif;
  color: white;
  font-weight: 100;
  cursor: pointer;
  transition: transform 0.3s ease;
  height: 3vw;
  width: 65px;
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
  width: 5vw;
  border-radius: 0.2vw;
  color: black;
  background-color: rgba(255, 255, 255, 0.9);
  &:hover {
    background-color: rgba(255, 255, 255, 0.7);
  }
`;

export const RectInfoButton = styled(RectButton)`
  width: 8vw;
  border-radius: 0.2vw;
  color: white;
  background-color: rgba(128,128,128, 0.7);

  &:hover {
    background-color: rgba(128,128,128, 0.4);
  };
`;

export const RectDropdownButton = styled(RectButton)`
  width: 140px;
  height: 45px;
  border-radius: 0.2vw;
  color: white;
  background-color: rgba(128,128,128, 0.7);
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
    font-size: 0.9vw;
    font-weight: bold;
    outline: none;
  }
`;

export const DropdownLinkTextButton = styled(RectButton)`
  border: 0px;
  background-color: transparent;
  color: white;
  font-size: 14px;
  width: 100%;
  height: 20px;
`;

export const RoundPlayButton = styled(RoundButton)`
  background: url(${PlayIcon}) no-repeat center;
  background-size: 0.8vw, 0.8vw;
  background-color: white;
  font-size: 25px;
  height: 2vw;
  width: 2vw;
  
  &:hover {
    background-color: rgba(255,255,255, 0.8);
  };
`;

export const PlayButton = styled(RoundPlayButton)`
  position: absolute;
  background-color: rgba(255,255,255, 0.5);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const RoundBackButton = styled(RoundButton)`
  background: url(${BackIcon}) no-repeat center;
  background-size: 1vw, 1vw;
  background-color: white;
  font-size: 25px;

  &:hover {
    background-color: rgba(255,255,255, 0.8);
  };
`;

export const RoundMuteButton = styled(RoundButton)`
  background: url(${MuteIcon}) no-repeat center;
  background-size: 1vw, 1vw;
  background-color: rgba(255,255,255, 1);
  border: 1px solid white;

  &:hover {
    background-color: rgba(255,255,255, 0.8);
  };

  ${({ videoEnded }) => videoEnded
  && `
    background: url(${ReplayIcon}) no-repeat center;
    background-size: 1vw, 1vw;
    background-color: rgba(255,255,255, 1);

  `
}
`;

export const RoundEpsAndInfoButton = styled(RoundButton)`
  background: url(${InfoIcon}) no-repeat center;
  background-size: 1vw, 1vw;
  background-color: white;
  font-size: 25px;

  height: 2vw;
  width: 2vw;
  
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
