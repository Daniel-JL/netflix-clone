import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import EpisodesListItemContainer from './episodes-list-item-container';
import { EpisodeDropdown } from '../dropdowns';
import { RoundDarkButton } from '../buttons';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;

`;

const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const EpisodeDropDownContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: space-between;

`;

function EpisodesList({
  mediaId,
  seasonEpisodeData,
  episodesListItemData,
  selectedSeason,
  changeSelectedSeason,
  dataLoaded,
  isLoading,
}) {
  const [selectedSeasonChange, setSelectedSeasonChange] = useState(false);
  const [currentSelectedSeason, setCurrentSelectedSeason] = useState(1);
  const [numItemsPerLoad, setNumItemsPerLoad] = useState(10);
  const [itemLimit, setItemLimit] = useState(10);
  const [seasonItemData, setSeasonItemData] = useState([]);
  const [allSeasonItemsLoaded, setAllSeasonItemsLoaded] = useState(false);

  const renderEpisodeListItems = () => {
    if(seasonItemData.episodeListItems !== undefined) {
      return seasonItemData.episodeListItems.slice(0, itemLimit)
        .map((value:undefined, index:number) => (
          seasonItemData.episodeListItems[index]
        ))
    }
  };

  const loadMoreItems = () => {
    setItemLimit((itemLimit) => itemLimit + numItemsPerLoad);
  };

  const resetEpisodeListItemLimit = () => {
    setItemLimit((itemLimit) => 10);
    setAllSeasonItemsLoaded(false);
  };

  useEffect(() => {
    setCurrentSelectedSeason((currentSelectedSeason) => selectedSeason);
    setSeasonItemData((seasonItemData) => episodesListItemData[selectedSeason - 1]);
    setSelectedSeasonChange((selectedSeasonChange) => !selectedSeasonChange);
  }, [JSON.stringify(episodesListItemData), selectedSeason]);

  useEffect(() => {
    if(episodesListItemData.episodeListItems !== undefined) {
      if (itemLimit >= episodesListItemData.episodeListItems.length) {
        setAllSeasonItemsLoaded(true);
      }
    }
    
  }, [itemLimit]);

  useEffect(() => {
    console.log(episodesListItemData);
  });

  return (
    <Container>
      {dataLoaded
        && (
        <ListContainer>
          <EpisodeDropDownContainer>
            Episodes
            <EpisodeDropdown
              selectedSeason={currentSelectedSeason}
              seasonEpisodeData={seasonEpisodeData}
              changeSelectedSeason={changeSelectedSeason}
              resetEpisodeListItemLimit={resetEpisodeListItemLimit}
            />
          </EpisodeDropDownContainer>
          {isLoading
            ? <div>Test</div>
            : renderEpisodeListItems()
          }
          {!allSeasonItemsLoaded &&
            <RoundDarkButton onClick={loadMoreItems}/>
          }
        </ListContainer>
        )}
    </Container>

  );
}

export default EpisodesList;
