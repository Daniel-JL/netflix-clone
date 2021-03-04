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
  portalRef,
}) => {
  const isVisible = usePageVisibility();
  const [backdropPath, setBackdropPath] = useState();
  const [videoURL, setVideoURL] = useState();
  const [vidExists, setVidExists] = useState(false);
  const [imgFadeOut, setImgFadeOut] = useState(false);
  const [imgFadeIn, setImgFadeIn] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [pausePoint, setPausePoint] = useState();
  const [muteActive, setMuteActive] = useState(true);
  const [mediaTitle, setMediaTitle] = useState('');
  const [mediaTagline, setMediaTagline] = useState('');
  const [intersectionActive, setIntersectionActive] = useState(true);
  const [modal, setModal] = useState();
  const [modalActive, setModalActive] = useState(false);
  const modalActiveRef = useRef(false);
  // const intersectionActive = useRef(true);
  const isPlaying = useRef();
  const [toggleState, setToggleState] = useState(false);
  const videoEnded = useRef(false);
  const intersectionThreshold = 0.2;
  const mutationObserver = useRef();
  const videoObserver = useRef();

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
  if (pausePoint !== undefined && videoObserver.current === undefined) {
    videoObserver.current = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (videoIsOffScreen(entry.intersectionRatio, intersectionThreshold) && isPlaying.current) {
          fadeOutImg();
          isPlaying.current = false;
          // intersectionActive.current = false;
          setIntersectionActive((intersectionActive) => false);
          // setToggleState((toggleState) => !toggleState);
        } else if (!videoIsOffScreen(entry.intersectionRatio, intersectionThreshold) && !videoEnded.current && (modal === undefined || !modal.hasChildNodes())) {
          fadeInImg();
          isPlaying.current = true;
          setIntersectionActive((intersectionActive) => true);

          // intersectionActive.current = true;
          // setToggleState((toggleState) => !toggleState);
        }
      });
    }, { threshold: intersectionThreshold });
    videoObserver.current.observe(pausePoint);

  }
  

  const fadeInImg = () => {
    setImgFadeOut((imgFadeOut) => false);
    setImgFadeIn((imgFadeIn) => true);
  };

  const fadeOutImg = () => {
    setImgFadeOut((imgFadeOut) => true);
    setImgFadeIn((imgFadeIn) => false);
  };

  const handleVideoPlaying = () => {
    fadeOutImg();
  };

  const handleVideoNearlyEnded = () => {
    fadeInImg();
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
      fadeOutImg();
      isPlaying.current = true;
    }
  };

  const handleInfoButtonClick = () => {
    fadeInImg();
    isPlaying.current = false;
  };

  if (mutationObserver.current === undefined && !isEpsInfoBox) {
    // Options for the observer (which mutations to observe)
    const config = { childList: true };

    const callback = function (mutationsList, observer) {
      // console.log(portalRef.childNodes[0]);
      // Use traditional 'for loops' for IE 11

      for (const mutation of mutationsList) {
        if (portalRef.childNodes[0] !== undefined && !modalActiveRef.current) {
          modalActiveRef.current = true;
          setModalActive((modalActive) => true);
        } else if (portalRef.childNodes[0] === undefined && modalActiveRef.current) {
          modalActiveRef.current = false;
          setModalActive((modalActive) => false);
        }
      }
    };

    // Create an observer instance linked to the callback function
    mutationObserver.current = new MutationObserver(callback);
    mutationObserver.current.observe(portalRef, config);
  }

  useEffect(() => {
    fetchItemData();
  }, []);

  useEffect(() => {
    if (intersectionActive) {
      if (isVisible === false) {
        // fadeInImg();
        isPlaying.current = false;
        setToggleState((toggleState) => !toggleState);
      } else {
        // fadeOutImg();
        isPlaying.current = true;
        setToggleState((toggleState) => !toggleState);
      }
    }
  }, [isVisible]);

  useEffect(() => {
    if (intersectionActive) {
      if (modalActive) {
        fadeInImg();
        isPlaying.current = false;
        setToggleState((toggleState) => !toggleState);
      } else {
        if (imgFadeOut === true) {
          fadeOutImg();
        }
        isPlaying.current = true;
        setToggleState((toggleState) => !toggleState);
      }
    }
  }, [modalActive]);

  useEffect(() => {
    console.log('intersectionActive');
    console.log(intersectionActive);
    if (!intersectionActive) {
      fadeInImg();
      isPlaying.current = false;
      setToggleState((toggleState) => !toggleState);
    } else {
      if (imgFadeOut === true) {
        fadeOutImg();
      }
      isPlaying.current = true;
      setToggleState((toggleState) => !toggleState);
    }
  }, [intersectionActive]);

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
