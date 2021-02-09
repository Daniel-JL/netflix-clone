/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { useFetch } from '../hooks/useFetch';
import { getMediaData } from '../helpers/getMediaData';
import getVideos from '../helpers/getVideos';
import { RoundMuteButton } from './buttons';

const BillboardRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-top: 40%;
  z-index: 2;
  color: white;

`;

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

  // height: 100%;
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

const MotionBackgroundContainer = styled.div`
  // position: relative;
  width: 100%;
  
  ${({ isEpsInfoBox }) => isEpsInfoBox
  && `
    height: 27.765vw;
  `
} 
`;

const MediaTitleAndTagline = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 3vw;

`;

const MediaTitle = styled.div`
  font-size: 180%;
`;

const Tagline = styled.div`

`;

const AgeRatingAndControl = styled.div`

`;

const baseURL = 'https://image.tmdb.org/t/p/';

const url = ''.concat(baseURL, 'trending/all/week?api_key=', process.env.REACT_APP_MOVIE_DB_API_KEY);

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
  const billboardImgRef = useRef();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [videoPlayerRef, setVideoPlayerRef] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [mediaTitle, setMediaTitle] = useState('');
  const [mediaTagline, setMediaTagline] = useState('');
  const videoEnded = useRef(false);

  const fetchItemData = async () => {
    let data = await getMediaData(mediaType, mediaId);
    setBackdropPath((backdropPath) => `${baseURL}original${data.backdrop_path}`);
    if (data.title) {
      setMediaTitle((mediaTitle) => data.title);
    } else if (data.name) {
      setMediaTitle((mediaTitle) => data.name);
    }
    setMediaTagline((mediaTagline) => data.tagline);
    console.log(data);

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

  useEffect(() => {
    fetchItemData();
  }, []);

  useEffect(() => {
    if (videoPlayerRef !== null) {
      const videoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio != 1 && isPlaying) {
            setIsPlaying(false);
          } else if (entry.intersectionRatio === 1 && !videoEnded.current) {
            setIsPlaying(true);
          }
        });
      }, { threshold: 1 });
      videoObserver.observe(videoPlayerRef);
    }
  }, [videoPlayerRef]);

  // "http://image.tmdb.org/t/p/original/7nRrq4GGHd2RctkPJOB8u6aq1P0.jpg"
  return (
    <MotionBackgroundContainer isEpsInfoBox={isEpsInfoBox}>
      <MotionBackgroundMediaContainer

        id="media-container"
        isEpsInfoBox={isEpsInfoBox}
      >
        {dataLoaded
          && (
            <div>
              <BillboardImage
                ref={billboardImgRef}
                src={backdropPath}
                fadeOut={imgFadeOut}
                fadeIn={imgFadeIn}
              />
              {vidExists
              && (
                <BillboardVideo>
                  <ReactPlayer
                    className="videoFrame"
                    url={videoURL}
                    playing={isPlaying}
                    controls={false}
                    playIcon={false}
                    muted
                    onStart={() => handleVideoPlaying()}
                    onProgress={(played) => {
                      console.log(played.played);
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
          )

        }
      </MotionBackgroundMediaContainer>
      <BillboardRow
        ref={setVideoPlayerRef}
        id="billboard-row"
        isEpsInfoBox={isEpsInfoBox}
      >
        <MediaTitleAndTagline>
          <MediaTitle>
            {mediaTitle}
          </MediaTitle>
          <Tagline>
            {mediaTagline}
          </Tagline>
        </MediaTitleAndTagline>
        <AgeRatingAndControl>
          <RoundMuteButton />
          {ageRating}
        </AgeRatingAndControl>

      </BillboardRow>
    </MotionBackgroundContainer>
  );
};
