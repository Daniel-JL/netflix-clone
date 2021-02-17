/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { getMediaData } from '../../helpers/getMediaData';
import getVideos from '../../helpers/getVideos';
import LoadingSkeleton from '../loading-skeleton';
import MotionBackgroundMedia from './motion-background-media';
import MotionBackgroundOverlay from './motion-background-overlay';

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

const videosAvailable = (numVideos) => {
  return numVideos > 0;
};

const videoHasEnded = (videoEnded) => {
  return videoEnded === false;
};

const pausePointExists = (pausePoint) => {
  return pausePoint !== null;
};

const videoIsOffScreen = (intersectionRatio, intersectionThreshold) => {
  return intersectionRatio <= intersectionThreshold;
};

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
  const [isPlaying, setIsPlaying] = useState();
  const [muteActive, setMuteActive] = useState(true);
  const [mediaTitle, setMediaTitle] = useState('');
  const [mediaTagline, setMediaTagline] = useState('');
  const [player, setPlayer] = useState();
  const [modal, setModal] = useState();
  const videoEnded = useRef(false);
  const intersectionThreshold = 0.2;

  const fetchItemData = async () => {
    let data = await getMediaData(mediaType, mediaId);

    setBackdropPath((backdropPath) => `https://image.tmdb.org/t/p/original${data.backdrop_path}`);
    setMediaTitle((mediaTitle) => (data.title ? data.title : data.name));
    setMediaTagline((mediaTagline) => data.tagline);

    data = await getVideos(mediaType, mediaId);

    if (videosAvailable(data.results.length)) {
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
    if (videoHasEnded(videoEnded.current)) {
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
    setModal((modal) => modalNode);
  };

  useEffect(() => {
    if (!isEpsInfoBox) {
      checkIfModalActive();
    }
    fetchItemData();
  }, []);

  useEffect(() => {
    if (modal !== undefined) {
      if (modal.hasChildNodes()) {
        setIsPlaying((isPlaying) => false);
      } else {
        setIsPlaying((isPlaying) => true);
      }
    }
  }, [modal]);

  useEffect(() => {
    if (pausePointExists(pausePoint)) {
      const videoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (videoIsOffScreen(entry.intersectionRatio, intersectionThreshold) && isPlaying) {
            setIsPlaying(false);
          } else if (!videoIsOffScreen(entry.intersectionRatio, intersectionThreshold) && !videoEnded.current && (modal === undefined || !modal.hasChildNodes())) {
            setIsPlaying(true);
          }
        });
      }, { threshold: intersectionThreshold });
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
