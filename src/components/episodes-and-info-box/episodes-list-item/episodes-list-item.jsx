import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Link,
} from 'react-router-dom';
import ImageWithOverlay from '../image-with-overlay/image-with-overlay';
import { PlayButton } from '../../common/buttons/buttons';
import ImageErrorPlaceholder from '../../../assets/images/no-img-placeholder.png';

const Container = styled.div`
  width: 100%;
  background-color: rgb(64,64,64)
`;

const ItemContainer = styled.div`
  width: 100%;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ItemInfoContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const ImgContainer = styled.div`
  width: 25%;
  margin: 10px;
`;

const EpisodeImage = styled.img`
  width: 100%;
`;

const EpisodeDetailsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin: 5px;
`;

const EpisodeTitleRuntimeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 90%;
`;

const EpisodeDescriptionContainer = styled.div`
  display: inline-block;
  font-size: 80%;
  width: 100%;
  height: 70%;
  max-width: 100%;
`;

function EpisodesListItem({
  episodeData,
  handleImgLoad,
}) {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [episodeName, setEpisodeName] = useState();
  const [episodeDescription, setEpisodeDescription] = useState();
  const [episodeNumber, setEpisodeNumber] = useState();
  const [imagePath, setImagePath] = useState();
  const [imgLoadingErr, setImgLoadingErr] = useState(false);
  const [imgLoadedSuccess, setImgLoadedSuccess] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);
  const [runtime, setRuntime] = useState('');

  const fetchEpisodeData = async () => {
    setEpisodeName((episodeName) => episodeData.name);
    setEpisodeDescription((episodeDescription) => episodeData.overview);
    setEpisodeNumber((episodeNumber) => episodeData.episode_number);
    setImagePath((imagePath) => `http://image.tmdb.org/t/p/w780${episodeData.still_path}`);
    setDataLoaded(true);
  };

  const handleImgLoadingErr = () => {
    setImagePath((imagePath) => ImageErrorPlaceholder);
    handleImgLoad();
    setImgLoadingErr(true);
  };

  const handleImgLoadedSuccess = () => {
    handleImgLoad();
    setImgLoadedSuccess(true);
  };

  const handleMouseOver = () => {
    setMouseOver(true);
  };

  const handleMouseOut = () => {
    setMouseOver(false);
  };

  useEffect(() => {
    if (!dataLoaded) {
      fetchEpisodeData();
    }
  }, []);

  return (
    <Container>
      {dataLoaded
      && (
        <Link
          key={1}
          to="/watch"
          style={{ color: 'inherit', textDecoration: 'inherit'}}
        >
          <ItemContainer 
            id="episodes-list-item" 
            onMouseEnter={handleMouseOver}
            onMouseLeave={handleMouseOut}
          >
            <ItemInfoContainer>
              {episodeNumber}
              <ImgContainer>
                <ImageWithOverlay 
                  image={<EpisodeImage
                    alt="Slider image"
                    src={imagePath}
                    onError={() => handleImgLoadingErr()}
                    onLoad={
                      () => handleImgLoadedSuccess()
                    }
                  />}
                  overlayItem={<PlayButton>|></PlayButton>}
                  fadeIn={mouseOver}
                />
              </ImgContainer>
              
              <EpisodeDetailsContainer>
                <EpisodeTitleRuntimeContainer>
                  <div>
                    {episodeName}
                  </div>
                  <div>
                    23m
                  </div>
                </EpisodeTitleRuntimeContainer>
                <EpisodeDescriptionContainer>
                  {episodeDescription}
                </EpisodeDescriptionContainer>
              </EpisodeDetailsContainer>
            </ItemInfoContainer>
            
          </ItemContainer>
        </Link>
      )}
    </Container>
  );
}

export default EpisodesListItem;
