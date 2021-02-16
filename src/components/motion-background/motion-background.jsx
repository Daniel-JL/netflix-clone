/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { getMediaData } from '../../helpers/getMediaData';
import getVideos from '../../helpers/getVideos';
import LoadingSkeleton from '../loading-skeleton';
import MotionBackgroundMedia from './motion-background-media';
import MotionBackgroundOverlay from './motion-background-overlay';
import {
  RectPlayButton,
  RectInfoButton,
  RoundMuteButton,
} from '../buttons';

const MotionBackgroundContainer = styled.div`
  width: 100%;
  
  ${({ isEpsInfoBox }) => isEpsInfoBox
  && `
    height: 27.765vw;
  `
} 
`;

const SpacingRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-top: 40%;
  z-index: 2;
  color: white;
`;

export const MotionBackground = ({
  mediaType,
  mediaId,
  ageRating,
  isEpsInfoBox,
}) => {
  const [backdropPath, setBackdropPath] = useState();
  const [videoURL, setVideoURL] = useState();
  const [vidExists, setVidExists] = useState(false);
  const [imgFadeOut, setImgFadeOut] = useState(false);
  const [imgFadeIn, setImgFadeIn] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [pausePoint, setPausePoint] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muteActive, setMuteActive] = useState(true);
  const [mediaTitle, setMediaTitle] = useState('');
  const [mediaTagline, setMediaTagline] = useState('');
  const [player, setPlayer] = useState();
  const [modal, setModal] = useState();
  const videoEnded = useRef(false);

  const fetchItemData = async () => {
    let data = await getMediaData(mediaType, mediaId);
    setBackdropPath((backdropPath) => `https://image.tmdb.org/t/p/original${data.backdrop_path}`);
    if (data.title) {
      setMediaTitle((mediaTitle) => data.title);
    } else if (data.name) {
      setMediaTitle((mediaTitle) => data.name);
    }
    setMediaTagline((mediaTagline) => data.tagline);

    data = await getVideos(mediaType, mediaId);
    if (data.results.length > 0) {
      setVideoURL((videoURL) => `https://www.youtube.com/watch?v=${data.results[0].key}`);
      setVidExists(true);
    }
    setDataLoaded(true);
  };

  const handleVideoPlaying = () => {
    setImgFadeOut((imgFadeOut) => true);
  };

  const handleVideoEnded = () => {
    setImgFadeOut((imgFadeOut) => false);
    setImgFadeIn((imgFadeIn) => true);
    videoEnded.current = true;
  };

  const handleMuteReplayButtonClick = () => {
    if (videoEnded.current === false) {
      setMuteActive((muteActive) => !muteActive);
    } else {
      videoEnded.current = false;
      player.seekTo(0);
      setImgFadeOut((imgFadeOut) => true);
      setImgFadeIn((imgFadeIn) => false);
      setIsPlaying((isPlaying) => true);
    }
  };

  const handleInfoButtonClick = () => {
    setIsPlaying((isPlaying) => false);
  };

  const checkIfModalActive = () => {
    const modalNode = document.getElementById('modal-root');
    console.log(modalNode);
    setModal((modal) => modalNode);
  };

  useEffect(() => {
    if (!isEpsInfoBox) {
      checkIfModalActive();
    }
    fetchItemData();
  }, []);

  // useEffect(() => {
  //   console.log('modal activated');
  //   console.log(isEpsInfoBox);
  //   console.log(modal);

  //   if (modal !== undefined) {
  //     console.log(modal);
  //     if (modal.hasChildNodes()) {
  //       setIsPlaying((isPlaying) => false);
  //     } else {
  //       setIsPlaying((isPlaying) => true);
  //     }
  //   }
  // }, [modal]);

  useEffect(() => {
    if (pausePoint !== null) {
      const videoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          console.log(entry.intersectionRatio);
          if (entry.intersectionRatio <= 0.2 && isPlaying) {
            setIsPlaying(false);
          } else if (entry.intersectionRatio > 0.2 && !videoEnded.current && (modal === undefined || !modal.hasChildNodes())) {
            setIsPlaying(true);
          }
        });
      }, { threshold: 0.2 });
      videoObserver.observe(pausePoint);
    }
  }, [pausePoint]);

  return (
    <MotionBackgroundContainer isEpsInfoBox={isEpsInfoBox}>
      {!dataLoaded && !isEpsInfoBox
        ? <LoadingSkeleton />
        : (
          <div>
            <MotionBackgroundMedia
              isEpsInfoBox={isEpsInfoBox}
              dataLoaded={dataLoaded}
              backdropPath={backdropPath}
              videoURL={videoURL}
              vidExists={vidExists}
              isPlaying={isPlaying}
              muteActive={muteActive}
              imgFadeOut={imgFadeOut}
              imgFadeIn={imgFadeIn}
              setPlayer={setPlayer}
              handleVideoPlaying={handleVideoPlaying}
              handleVideoEnded={handleVideoEnded}
            />
            <MotionBackgroundOverlay
              mediaId={mediaId}
              mediaType={mediaType}
              mediaTitle={mediaTitle}
              mediaTagline={mediaTagline}
              ageRating={ageRating}
              isEpsInfoBox={isEpsInfoBox}
              handleMuteReplayButtonClick={handleMuteReplayButtonClick}
              handleInfoButtonClick={handleInfoButtonClick}
              setPausePoint={setPausePoint}
            />
          </div>
        )}

      <SpacingRow />
    </MotionBackgroundContainer>
  );
};
