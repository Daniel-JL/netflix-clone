/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { useFetch } from '../hooks/useFetch';
import { getMediaData } from '../helpers/getMediaData';
import getVideos from '../helpers/getVideos';

const BillboardRow = styled.div`
  width: 100%;
  padding-top: 40%;
`;

const BillboardRowEpsInfo = styled(BillboardRow)`
  padding-top: 1%;
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

  ${({ isEpsInfoBox }) => !isEpsInfoBox
  && `
    position: absolute;
    width: 100%;
    padding-top: 56.25%;
    top:0;
  `
  } 

  ${({ isEpsInfoBox }) => isEpsInfoBox
  && `
    position: static;
    width: 100%;
    padding-top: 56.25%;
    top:0;
  `
  } 


`;

const MotionBackgroundMediaContainerEpsInfoBox = styled(MotionBackgroundMediaContainer)`
  position: static;
  z-index: 0;
  // padding-top: 0%;

  
`;

const MotionBackgroundContainer = styled.div`
  // position: relative;
  width: 100%;

`;

const baseURL = 'https://image.tmdb.org/t/p/';

const url = ''.concat(baseURL, 'trending/all/week?api_key=', process.env.REACT_APP_MOVIE_DB_API_KEY);

export const MotionBackground = ({
  itemData,
  isEpsInfoBox,
}) => {
  const [backdropPath, setBackdropPath] = useState();
  const [videoURL, setVideoURL] = useState();
  const [imgFadeOut, setImgFadeOut] = useState(false);
  const [imgFadeIn, setImgFadeIn] = useState(false);
  const billboardImgRef = useRef();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [videoPlayerRef, setVideoPlayerRef] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  // const [videoEnded, setVideoEnded] = useState(false);
  const videoEnded = useRef(false);

  const fetchItemData = async () => {
    let data = await getMediaData(itemData.mediaType, itemData.id);
    setBackdropPath((backdropPath) => `${baseURL}original${data.backdrop_path}`);

    data = await getVideos(itemData.mediaType, itemData.id);
    setVideoURL((videoURL) => `https://www.youtube.com/watch?v=${data.results[0].key}`);
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
    <MotionBackgroundContainer>
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
            </div>
          )

          // <BillboardImage src={backdropPath} />
        }
        {/* <iframe src='https://www.youtube.com/embed/5794f65592514142a4002ec0'
        frameborder='0'
        allow='autoplay; encrypted-media'
        allowfullscreen
        title='video'
            /> */}
      </MotionBackgroundMediaContainer>

      <BillboardRow ref={setVideoPlayerRef} />
    </MotionBackgroundContainer>
  );
};

export function MotionBackGroundEpsInfoBox() {
  return (
    <MotionBackgroundContainer>
      <MotionBackgroundMediaContainerEpsInfoBox>
        <BillboardImage src="http://image.tmdb.org/t/p/original/7nRrq4GGHd2RctkPJOB8u6aq1P0.jpg" />
        {/* <iframe src='https://www.youtube.com/embed/5794f65592514142a4002ec0'
        frameborder='0'
        allow='autoplay; encrypted-media'
        allowfullscreen
        title='video'
            /> */}
      </MotionBackgroundMediaContainerEpsInfoBox>

      <BillboardRowEpsInfo />
    </MotionBackgroundContainer>
  );
}
