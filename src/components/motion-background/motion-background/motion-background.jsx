import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
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
  const [overlayData, setOverlayData] = useState({
    mediaId,
    mediaType,
    mediaTitle: '',
    mediaTagline: '',
    ageRating,
  });
  const [backdropPath, setBackdropPath] = useState();
  const [videoURL, setVideoURL] = useState();
  const [vidExists, setVidExists] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [pausePoint, setPausePoint] = useState();
  const [muteActive, setMuteActive] = useState(true);
  const [intersectionActive, setIntersectionActive] = useState(true);
  const [modalActive, setModalActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState();
  const [videoEnded, setVideoEnded] = useState(false);
  const modalActiveRef = useRef(false);
  const intersectionThreshold = 0.2;
  const mutationObserver = useRef();
  const videoObserver = useRef();

  const fetchItemData = async () => {
    let data = await getMediaData(mediaType, mediaId);

    setBackdropPath((backdropPath) => `https://image.tmdb.org/t/p/original${data.backdrop_path}`);
    setOverlayData((overlayData) => ({
      ...overlayData,
      mediaTitle: data.title ? data.title : data.name,
      mediaTagline: data.tagline,
    }));

    data = await getVideos(mediaType, mediaId);
    if (videosAvailable(data.results.length)) {
      setVideoURL((videoURL) => data.results[0].key);
      setVidExists(true);
    }

    setDataLoaded(true);
  };

  const initialiseIntersectionObserver = () => {
    videoObserver.current = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (videoIsOffScreen(entry.intersectionRatio, intersectionThreshold)) {
          setIntersectionActive((intersectionActive) => false);
        } else if (!videoIsOffScreen(entry.intersectionRatio, intersectionThreshold)) {
          setIntersectionActive((intersectionActive) => true);
        }
      });
    }, { threshold: intersectionThreshold });
    videoObserver.current.observe(pausePoint);
  };

  const initialiseMutationObserver = () => {
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

    mutationObserver.current = new MutationObserver(callback);
    mutationObserver.current.observe(portalRef, config);
  };

  const handleVideoEnded = () => {
    setIsPlaying((isPlaying) => false);
    setVideoEnded((videoEnded) => true);
  };

  const handleMuteReplayButtonClick = () => {
    if (videoHasEnded(videoEnded)) {
      setIsPlaying((isPlaying) => true);
      setVideoEnded((videoEnded) => false);
    } else {
      setMuteActive((muteActive) => !muteActive);
    }
  };

  const handleInfoButtonClick = () => {
    setIsPlaying((isPlaying) => false);
  };

  useEffect(() => {
    fetchItemData();
    if (!isEpsInfoBox) {
      initialiseMutationObserver();
    }
  }, []);

  useEffect(() => {
    if (pausePoint !== undefined) {
      initialiseIntersectionObserver();
    }
  }, [pausePoint]);

  useEffect(() => {
    if (intersectionActive && !modalActiveRef.current && vidExists && !videoEnded) {
      if (isVisible === false) {
        setIsPlaying((isPlaying) => false);
      } else {
        setIsPlaying((isPlaying) => true);
      }
    }
  }, [isVisible]);

  useEffect(() => {
    if (intersectionActive && !videoEnded) {
      if (modalActiveRef.current) {
        setIsPlaying((isPlaying) => false);
      } else {
        setIsPlaying((isPlaying) => true);
      }
    }
  }, [modalActive]);

  useEffect(() => {
    if (!modalActiveRef.current && !videoEnded) {
      if (!intersectionActive) {
        setIsPlaying((isPlaying) => false);
      } else {
        setIsPlaying((isPlaying) => true);
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
              isPlaying={isPlaying}
              muteActive={muteActive}
              videoEnded={videoEnded}
              handleVideoEnded={handleVideoEnded}
              handleItemLoaded={handleItemLoaded}
              setVideoEnded={setVideoEnded}
              itemsLoaded={itemsLoaded}
            />
            <MotionBackgroundOverlay
              overlayData={overlayData}
              vidExists={vidExists}
              videoEnded={videoEnded}
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
