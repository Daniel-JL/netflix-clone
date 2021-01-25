import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import getEpisodeData from '../../helpers/getEpisodeData';
import EpisodesListItem from './episodes-list-item';

const Container = styled.div`
  width: 100%;
`;

function EpisodesListItemContainer(props) {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [episodeName, setEpisodeName] = useState();
  const [episodeDescription, setEpisodeDescription] = useState();
  const [episodeNumber, setEpisodeNumber] = useState();
  const [imagePath, setImagePath] = useState();
  const [imgLoadingErr, setImgLoadingErr] = useState(false);
  const [imgLoadedSuccess, setImgLoadedSuccess] = useState(false);
  const [runtime, setRuntime] = useState('');

  const fetchEpisodeData = async () => {
    console.log(props.episodeData);
    setEpisodeName((episodeName) => props.episodeData.name);
    setEpisodeDescription((episodeDescription) => props.episodeData.overview);
    setEpisodeNumber((episodeNumber) => props.episodeData.episode_number);
    setImagePath((imagePath) => `http://image.tmdb.org/t/p/w780${props.episodeData.still_path}`);
    setDataLoaded(true);
  };

  const handleImgLoadingErr = () => {
    console.log('img-error');
    setImgLoadingErr(true);
  };

  const handleImgLoadedSuccess = () => {
    console.log('imgloadsuccess-EpListItem');
    setImgLoadedSuccess(true);
    // props.handleImgLoaded();
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
      <EpisodesListItem
        episodeNumber={episodeNumber}
        episodeName={episodeName}
        episodeDescription={episodeDescription}
        imagePath={imagePath}
        imgLoadedSuccess={imgLoadedSuccess}
        imgLoadingErr={imgLoadingErr}
        handleImgLoadingErr={handleImgLoadingErr}
        handleImgLoadedSuccess={handleImgLoadedSuccess}
      />
      )}
    </Container>
  );
}

export default EpisodesListItemContainer;
