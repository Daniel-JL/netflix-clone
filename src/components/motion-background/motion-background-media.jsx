/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { useFetch } from '../../hooks/useFetch';
import { getMediaData } from '../../helpers/getMediaData';
import getVideos from '../../helpers/getVideos';
import {
  RectPlayButton,
  RectInfoButton,
  RoundMuteButton,
} from '../buttons';

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

const BillboardVideo = styled.div`
  position: absolute;
  width: 100%;
  top:0;
  z-index: 0;
  height: 100%;
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
  isPlaying,
  muteActive,
  imgFadeOut,
  imgFadeIn,
  setPlayer,
  handleVideoPlaying,
  handleVideoEnded,
}) => {
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
              />
              {vidExists
              && (
                <BillboardVideo>
                  <ReactPlayer
                    ref={setPlayer}
                    // className="videoFrame"
                    url={videoURL}
                    playing={isPlaying}
                    controls={false}
                    playIcon={false}
                    muted={muteActive}
                    onStart={() => handleVideoPlaying()}
                    onProgress={(played) => {
                      if (imgFadeOut !== true) {
                        handleVideoPlaying();
                      }

                      if (played.played >= 0.94) {
                        handleVideoEnded();
                      }
                    }}
                    width="100%"
                    height="100%"
                    config={{
                      youtube: {
                        playerVars: {
                          cc_load_policy: 3,
                          iv_load_policy: 3,
                          rel: 0,
                          controls: 0,
                          disablekb: 1,
                          fs: 0,
                          modestbranding: 1,
                        },
                      },
                    }}
                  />
                </BillboardVideo>
              )}

            </div>
          )}
    </MotionBackgroundMediaContainer>
  );
};

export default MotionBackgroundMedia;
