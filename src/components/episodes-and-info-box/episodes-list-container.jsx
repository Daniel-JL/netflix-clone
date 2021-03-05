import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import getSeasonData from '../../helpers/getSeasonData';
import EpisodesList from './episodes-list';
import EpisodesListItem from './episodes-list-item';
import EpisodesListLoadingSkeleton from './episodes-list-loading-skeleton';
import { EpisodeDropdown } from '../dropdowns';

const Container = styled.div`
  width: 90%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  justify-self: center;
  padding-top: 0.6vw;
  margin: auto;
`;

const ListContainer = styled.div`
  display: none;

  ${({ imagesLoaded }) => imagesLoaded && `
      display: block;
  `}
`;

const EpisodeDropDownContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: space-between;
`;

const processValidEpisodes = (data, season) => {
  const validEpisodes = [];
  let episodeAirDate;
  let todaysDate = new Date();

  const dd = String(todaysDate.getDate()).padStart(2, '0');
  const mm = String(todaysDate.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = todaysDate.getFullYear();
  todaysDate = `${yyyy}/${mm}/${dd}`;

  if (data.episodes) {
    for (let j = 0; j < data.episodes.length; j++) {
      episodeAirDate = data.episodes[j].air_date.replace(/-/g, '/');
      if (episodeAirDate < todaysDate) {
        validEpisodes.push(data.episodes[j]);
      }
    }
  }
  return {
    seasonNum: season,
    episodeData: validEpisodes,
  };
};

const EpisodesListContainer = ({
  mediaId,
  numEpsPerSeason,
}) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [episodesListItemData, setEpisodesListItemData] = useState(new Array(numEpsPerSeason.length));
  const [isLoading, setIsLoading] = useState(false);
  const [noEpsToDisplay, setNoEpsToDisplay] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const numItemsLoaded = useRef(0);

  const processSeasonData = async () => {
    const data = await getSeasonData(mediaId, selectedSeason);

    const validEpisodeData = processValidEpisodes(data, selectedSeason);
    if (validEpisodeData.episodeData.length > 0) {
      loadEpisodeListItemData(validEpisodeData);
    } else {
      setNoEpsToDisplay(true);
      setImagesLoaded((imagesLoaded) => true);
    }

    setDataLoaded(true);
  };

  const handleImgLoad = () => {
    let numItemsToLoad;

    numItemsLoaded.current += 1;
    if (episodesListItemData[selectedSeason - 1].episodeListItems.length >= 10) {
      numItemsToLoad = 10;
    } else {
      numItemsToLoad = episodesListItemData[selectedSeason - 1].episodeListItems.length;
    }

    if (numItemsLoaded.current >= numItemsToLoad) {
      setImagesLoaded((imagesLoaded) => true);
    }
  };

  const loadEpisodeListItemData = (validEpisodeData) => {
    const episodesListItemDataCopy = episodesListItemData;

    episodesListItemDataCopy[selectedSeason - 1] = {
      season: selectedSeason,
      episodeListItems:
      [
        ...Array(validEpisodeData.episodeData.length),
      ].map((undefined, index) => (
        <EpisodesListItem
          key={index}
          mediaId={mediaId}
          episodeNum={index + 1}
          seasonNum={selectedSeason}
          episodeData={validEpisodeData.episodeData[index]}
          handleImgLoad={handleImgLoad}
        />
      )),
    };

    setEpisodesListItemData((episodesListItemData) => episodesListItemDataCopy);

    setIsLoading((isLoading) => false);
  };

  const changeSelectedSeason = (newSelectedSeason) => {
    if (newSelectedSeason !== selectedSeason) {
      setIsLoading((isLoading) => true);
      setImagesLoaded((imagesLoaded) => false);
      setSelectedSeason((selectedSeason) => newSelectedSeason);
      if (episodesListItemData[newSelectedSeason - 1] === undefined) {
        setDataLoaded(false);
      }
    }
  };

  useEffect(() => {
    if (episodesListItemData[selectedSeason - 1] === undefined) {
      setIsLoading((isLoading) => true);
      processSeasonData();
    } else {
      setIsLoading((isLoading) => false);
    }
  }, [selectedSeason]);

  return (
    <Container id="epslistcontainer">
      <EpisodeDropDownContainer>
        Episodes
        <EpisodeDropdown
          selectedSeason={selectedSeason}
          numEpsPerSeason={numEpsPerSeason}
          changeSelectedSeason={changeSelectedSeason}
        />
      </EpisodeDropDownContainer>
      {!imagesLoaded && <EpisodesListLoadingSkeleton />}
      {(dataLoaded && !noEpsToDisplay)
      ? (
        <div>
          <ListContainer imagesLoaded={imagesLoaded}>
            <EpisodesList
              numEpsPerSeason={numEpsPerSeason}
              episodesListItemData={episodesListItemData}
              selectedSeason={selectedSeason}
              changeSelectedSeason={changeSelectedSeason}
              isLoading={isLoading}
            />
          </ListContainer>
        </div>
      )
      : 'Episode list data unavailable'
    }
    </Container>
  );
};

export default EpisodesListContainer;
