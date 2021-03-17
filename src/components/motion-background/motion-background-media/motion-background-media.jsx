import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import YouTube from 'react-youtube';
import './motion-background-media.css';

const BillboardImage = styled.img`
  position: absolute;
  width: 100%;
  top:0;
  z-index: 1;

  ${({ fadeOut }) => fadeOut
    && `opacity: 0;
    transition: opacity 1.5s ease-in-out;`
} 

  ${({ fadeIn }) => fadeIn
    && `opacity: 1;
    transition: opacity 0.5s ease-in-out;`
} 
`;

const VideoContainer = styled.div`
  position: absolute;
  width: 100%;
  top:0;
  z-index: 0;
  height: 100%;
`;

const BillboardVideo = styled.div`
  position: relative; 
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
`;

const MotionBackgroundMediaContainer = styled.div`
  z-index: 0;
  position: absolute;
  width: 100%;
  padding-top: 56.25%;
  top:0;
`;

const MotionBackgroundMedia = ({
  isEpsInfoBox,
  dataLoaded,
  backdropPath,
  videoURL,
  vidExists,
  videoEnded,
  isPlaying,
  muteActive,
  handleVideoEnded,
  handleItemLoaded,
  itemsLoaded,
}) => {
  const [playerEvent, setPlayerEvent] = useState();
  const [videoProgressInterval, setVideoProgressInterval] = useState();
  const [imgFadeOut, setImgFadeOut] = useState(false);
  const [imgFadeIn, setImgFadeIn] = useState(false);

  const fadeInImg = () => {
    setImgFadeOut((imgFadeOut) => false);
    setImgFadeIn((imgFadeIn) => true);
  };

  const fadeOutImg = () => {
    setImgFadeOut((imgFadeOut) => true);
    setImgFadeIn((imgFadeIn) => false);
  };

  const initialiseProgressInterval = (e) => {
    setVideoProgressInterval((videoProgressInterval) => setInterval(() => {
      if (e.target.getCurrentTime()/e.target.getDuration() > 0.96) {
        fadeInImg();
      }
    }, 500));
  };

  const onReady = (e) => {
    setPlayerEvent((playerEvent) => e);
    if (isPlaying === true) {
      fadeOutImg();
      initialiseProgressInterval(e);
    } else {
      e.target.pauseVideo();
    }
  };

  const onPlayerStateChange = (e) => {
    if (e.data === 0) {
      handleVideoEnded();
      playerEvent.target.seekTo(0);
      clearInterval(videoProgressInterval);
    }
  };

  useEffect(() => {
    if (playerEvent && !videoEnded) {
      if (!isPlaying) {
        fadeInImg();
        playerEvent.target.pauseVideo();
        clearInterval(videoProgressInterval);

      } else {
        if (imgFadeOut === false) {
          fadeOutImg();
        }
        initialiseProgressInterval(playerEvent);
        playerEvent.target.playVideo();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (playerEvent) {
      if (!muteActive) {
        playerEvent.target.unMute();
      } else {
        playerEvent.target.mute();
      }
    }
  }, [muteActive]);

  return (
    <MotionBackgroundMediaContainer
      id="media-container"
      isEpsInfoBox={isEpsInfoBox}
    >
      {dataLoaded
          && (
            <div>
              <BillboardImage
                src={backdropPath}
                fadeOut={imgFadeOut}
                fadeIn={imgFadeIn}
                onLoad={() => handleItemLoaded()}
              />
              {vidExists && itemsLoaded
              && (
                <VideoContainer id="vidContainer">
                  <BillboardVideo id="billboardVideo">
                    <YouTube
                      videoId={videoURL}
                      opts={{
                        playerVars: {
                          autoplay: 1,
                          mute: 1,
                          cc_load_policy: 3,
                          iv_load_policy: 3,
                          rel: 0,
                          controls: 0,
                          disablekb: 1,
                          fs: 0,
                          modestbranding: 1,
                        },
                      }}
                      onReady={onReady}
                      onStateChange={onPlayerStateChange}
                      containerClassName="youtubeContainer"
                    />
                  </BillboardVideo>
                </VideoContainer>

              )}
            </div>
          )}
    </MotionBackgroundMediaContainer>
  );
};

export default MotionBackgroundMedia;
