/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { getMediaData } from '../../helpers/getMediaData';
import usePageVisibility from '../../hooks/usePageVisibility';
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
  handleItemLoaded,
  itemsLoaded,
}) => {
  const isVisible = usePageVisibility();
  const [backdropPath, setBackdropPath] = useState();
  const [videoURL, setVideoURL] = useState();
  const [vidExists, setVidExists] = useState(false);
  const [imgFadeOut, setImgFadeOut] = useState(false);
  const [imgFadeIn, setImgFadeIn] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [pausePoint, setPausePoint] = useState(null);
  const [muteActive, setMuteActive] = useState(true);
  const [mediaTitle, setMediaTitle] = useState('');
  const [mediaTagline, setMediaTagline] = useState('');
  const [modal, setModal] = useState();
  const isPlaying = useRef();
  const [toggleState, setToggleState] = useState(false);
  const videoEnded = useRef(false);
  const intersectionThreshold = 0.2;

  const fetchItemData = async () => {
    let data = await getMediaData(mediaType, mediaId);

    setBackdropPath((backdropPath) => `https://image.tmdb.org/t/p/original${data.backdrop_path}`);
    setMediaTitle((mediaTitle) => (data.title ? data.title : data.name));
    setMediaTagline((mediaTagline) => data.tagline);

    data = await getVideos(mediaType, mediaId);
    if (videosAvailable(data.results.length)) {
      // setVideoURL((videoURL) => `https://www.youtube.com/watch?v=${data.results[0].key}`);
      // setVideoURL((videoURL) => `https://www.youtube.com/embed/${data.results[0].key}`);
      setVideoURL((videoURL) => data.results[0].key);
      setVidExists(true);
    }
    setDataLoaded(true);
  };

  const handleVideoPlaying = () => {
    setImgFadeOut((imgFadeOut) => true);
  };

  const handleVideoNearlyEnded = () => {
    setImgFadeOut((imgFadeOut) => false);
    setImgFadeIn((imgFadeIn) => true);
  };

  const handleVideoEnded = () => {
    // setIsPlaying((isPlaying) => false);
    isPlaying.current = false;
    videoEnded.current = true;
  };

  const handleMuteReplayButtonClick = () => {
    if (videoHasEnded(videoEnded.current)) {
      setMuteActive((muteActive) => !muteActive);
    } else {
      videoEnded.current = false;
      setImgFadeOut((imgFadeOut) => true);
      setImgFadeIn((imgFadeIn) => false);
      // setIsPlaying((isPlaying) => true);
      isPlaying.current = true;

    }
  };

  const handleInfoButtonClick = () => {
    // setIsPlaying((isPlaying) => false);
    isPlaying.current = false;
  };

  const checkIfModalActive = () => {
    const modalNode = document.getElementById('modal-root');
    setModal((modal) => modalNode);
    console.log('ModalSet');
  };

  useEffect(() => {
    if (!isEpsInfoBox) {
      checkIfModalActive();
    }
    fetchItemData();
  }, []);

  useEffect(() => {
    if (isVisible === false) {
      isPlaying.current = false;
      setToggleState((toggleState) => !toggleState);
    } else {
      isPlaying.current = true;
      setToggleState((toggleState) => !toggleState);
    }
  }, [isVisible]);

  useEffect(() => {
    if (modal !== undefined) {
      console.log('modalUseEffect');
      if (modal.hasChildNodes()) {
        // setIsPlaying((isPlaying) => false);
        isPlaying.current = false;
        setToggleState((toggleState) => !toggleState);

      } else {
        // setIsPlaying((isPlaying) => true);
        isPlaying.current = true;

      }
    }
  }, [modal]);

  useEffect(() => {
    if (pausePointExists(pausePoint)) {
      const videoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          console.log(videoIsOffScreen(entry.intersectionRatio, intersectionThreshold));
          if (videoIsOffScreen(entry.intersectionRatio, intersectionThreshold) && isPlaying.current) {
            // setIsPlaying((isPlaying) => false);
            isPlaying.current = false;
            setToggleState((toggleState) => !toggleState);

          } else if (!videoIsOffScreen(entry.intersectionRatio, intersectionThreshold) && !videoEnded.current && (modal === undefined || !modal.hasChildNodes())) {

            // setIsPlaying((isPlaying) => true);
            isPlaying.current = true;
            setToggleState((toggleState) => !toggleState);

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
              isPlaying={isPlaying.current}
              muteActive={muteActive}
              imgFadeOut={imgFadeOut}
              imgFadeIn={imgFadeIn}
              handleVideoPlaying={handleVideoPlaying}
              handleVideoEnded={handleVideoEnded}
              handleVideoNearlyEnded={handleVideoNearlyEnded}
              handleItemLoaded={handleItemLoaded}
              itemsLoaded={itemsLoaded}
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
