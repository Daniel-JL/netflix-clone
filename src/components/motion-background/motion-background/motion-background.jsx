import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import useMutationObserver from "@rooks/use-mutation-observer";
import usePageVisibility from '../../../hooks/usePageVisibility';
import getMediaData from '../../../helpers/getMediaData';
import getVideos from '../../../helpers/getVideos';
import LoadingSkeleton from '../../main-page/loading-skeleton/loading-skeleton';
import MotionBackgroundMedia from '../motion-background-media/motion-background-media';
import MotionBackgroundOverlay from '../motion-background-overlay/motion-background-overlay';

const MotionBackgroundContainer = styled.div`
  width: 100%;
  
  ${({ isEpsInfoBox }) => isEpsInfoBox
  && 'height: 27.765vw;'
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

const videosAvailable = (numVideos) => numVideos > 0;

const videoHasEnded = (videoEnded) => videoEnded === true;

const videoIsOffScreen = (intersectionRatio, intersectionThreshold) => intersectionRatio <= intersectionThreshold;

const MotionBackground = ({
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
  const [modalActive, setModalActive] = useState(false);
  const [toggleState, setToggleState] = useState(false);
  const modalActiveRef = useRef(false);
  const isPlaying = useRef();
  const videoEnded = useRef(false);
  const intersectionThreshold = 0.2;
  const mutationObserver = useRef();
  const videoObserver = useRef();

  // useMutationObserver(portalRef, mutationCallback);

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
          setIntersectionActive((intersectionActive) => false);
        } else if (!videoIsOffScreen(entry.intersectionRatio, intersectionThreshold) && !videoEnded.current && !modalActiveRef.current) {
          fadeInImg();
          isPlaying.current = true;
          setIntersectionActive((intersectionActive) => true);
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
    isPlaying.current = false;
    videoEnded.current = true;
  };

  const handleMuteReplayButtonClick = () => {
    if (videoHasEnded(videoEnded.current)) {
      videoEnded.current = false;
      fadeOutImg();
      isPlaying.current = true;
    } else {
      setMuteActive((muteActive) => !muteActive);
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
      if (portalRef.childNodes[0] !== undefined && !modalActiveRef.current) {
        modalActiveRef.current = true;
        setModalActive((modalActive) => true);
      } else if (portalRef.childNodes[0] === undefined && modalActiveRef.current) {
        modalActiveRef.current = false;
        setModalActive((modalActive) => false);
      }
    };

    if (portalRef.childNodes[0] !== undefined && !modalActiveRef.current) {
      modalActiveRef.current = true;
      setModalActive((modalActive) => true);
    }

    // Create an observer instance linked to the callback function
    mutationObserver.current = new MutationObserver(callback);
    mutationObserver.current.observe(portalRef, config);
  }

  useEffect(() => {
    fetchItemData();
  }, []);

  useEffect(() => {
    if (intersectionActive && !modalActiveRef.current && vidExists) {
      if (isVisible === false) {
        isPlaying.current = false;
        setToggleState((toggleState) => !toggleState);
      } else {
        fadeOutImg();
        isPlaying.current = true;
        setToggleState((toggleState) => !toggleState);
      }
    }
  }, [isVisible]);

  useEffect(() => {
    if (intersectionActive) {
      if (modalActiveRef.current) {
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
    if (!modalActiveRef.current) {
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
              vidExists={vidExists}
              videoEnded={videoEnded.current}
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

export default MotionBackground;
