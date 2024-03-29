import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { RoundDarkButton } from '../../common/buttons/buttons';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  justify-self: center;
`;

const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  justify-self: center;
`;

const EpisodeDropDownContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: space-between;
`;

const EpisodesList = ({
  episodesListItemData,
  numItemsPerLoad,
  selectedSeason,
  isLoading,
}) => {
  const [selectedSeasonChange, setSelectedSeasonChange] = useState(false);
  const [currentSelectedSeason, setCurrentSelectedSeason] = useState(1);
  const [itemLimit, setItemLimit] = useState(10);
  const [seasonItemData, setSeasonItemData] = useState([]);
  const [allSeasonItemsLoaded, setAllSeasonItemsLoaded] = useState(false);

  const renderEpisodeListItems = () => {
    if(seasonItemData !== undefined) {
      if(seasonItemData.episodeListItems !== undefined) {
        return seasonItemData.episodeListItems.slice(0, itemLimit)
          .map((value:undefined, index:number) => (
            seasonItemData.episodeListItems[index]
          ))
      }
    }
  };

  const loadMoreItems = () => {
    setItemLimit((itemLimit) => itemLimit + numItemsPerLoad);
  };

  const resetEpisodeListItemLimit = () => {
    setItemLimit((itemLimit) => 10);
    handleItemLimit();
  };

  const handleItemLimit = () => {
    if (itemLimit >= episodesListItemData[selectedSeason - 1].episodeListItems.length) {
      setAllSeasonItemsLoaded(true);
    } else {
      setAllSeasonItemsLoaded(false);
    }
  };

  useEffect(() => {
    setCurrentSelectedSeason((currentSelectedSeason) => selectedSeason);
    setSeasonItemData((seasonItemData) => episodesListItemData[selectedSeason - 1]);
    setSelectedSeasonChange((selectedSeasonChange) => !selectedSeasonChange);
  }, [JSON.stringify(episodesListItemData), selectedSeason]);

  useEffect(() => {
    resetEpisodeListItemLimit();
  }, [selectedSeasonChange]);

  useEffect(() => {
    if(episodesListItemData[0] !== undefined) {
      handleItemLimit();
    }
  }, [itemLimit]);

  return (
    <Container id="epslist-container">
      <ListContainer id="list-container">
        {!isLoading 
          ? renderEpisodeListItems()
          : 'Episode data not available'
        }
        {!allSeasonItemsLoaded &&
          <RoundDarkButton onClick={loadMoreItems}/>
        }
      </ListContainer>
    </Container>

  );
}

export default EpisodesList;
