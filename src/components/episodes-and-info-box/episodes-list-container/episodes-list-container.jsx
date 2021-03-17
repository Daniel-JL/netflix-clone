import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { EpisodeDropdown } from '../../common/dropdowns/dropdowns';
import EpisodesList from '../episodes-list/episodes-list';
import EpisodesListItem from '../episodes-list-item/episodes-list-item';
import EpisodesListLoadingSkeleton from '../episodes-list-loading-skeleton/episodes-list-loading-skeleton';
import getSeasonData from '../../../helpers/getSeasonData';

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
  padding-top: 2vw;
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

const EpisodesListTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
`;

//  Valid episodes are episodes that have already been released
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

const seasonHasNoEpsData = (numEps) => numEps === 0;

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
  const maxItemsPerLoad = 10;

  const validEpisodesAvailable = (validEpisodes) => validEpisodes > 0;

  const processSeasonData = async () => {
    const data = await getSeasonData(mediaId, selectedSeason);
    const validEpisodeData = processValidEpisodes(data, selectedSeason);

    if (validEpisodesAvailable(validEpisodeData.episodeData.length)) {
      loadEpisodeListItemData(validEpisodeData);
    } else {
      setNoEpsToDisplay(true);
      setImagesLoaded((imagesLoaded) => true);
    }

    setDataLoaded(true);
  };

  const handleImgLoad = () => {
    const numEpisodeItems = episodesListItemData[selectedSeason - 1].episodeListItems.length;
    let numItemsToLoad;
    numItemsLoaded.current += 1;

    if (numEpisodeItems >= maxItemsPerLoad) {
      numItemsToLoad = maxItemsPerLoad;
    } else {
      numItemsToLoad = numEpisodeItems;
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
      if (seasonHasNoEpsData(episodesListItemData[selectedSeason - 1].episodeListItems.length)) {
        setNoEpsToDisplay(true);
      } else {
        setNoEpsToDisplay(false);
      }
    }
  }, [selectedSeason]);

  return (
    <Container id="epslistcontainer">
      <EpisodeDropDownContainer>
        <EpisodesListTitle>Episodes</EpisodesListTitle>
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
                episodesListItemData={episodesListItemData}
                selectedSeason={selectedSeason}
                numItemsPerLoad={maxItemsPerLoad}
                isLoading={isLoading}
              />
            </ListContainer>
          </div>
        )
        : 'Episode list data unavailable'}
    </Container>
  );
};

export default EpisodesListContainer;
