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

function EpisodesList(props) {
  const [selectedSeasonChange, setSelectedSeasonChange] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [numItemsPerLoad, setNumItemsPerLoad] = useState(10);
  const [itemLimit, setItemLimit] = useState(10);
  const [episodesListItemData, setEpisodesListItemData] = useState([]);
  const [allSeasonItemsLoaded, setAllSeasonItemsLoaded] = useState(false);

  const renderEpisodeListItems = () => {
    if(episodesListItemData.episodeListItems !== undefined) {
      return episodesListItemData.episodeListItems.slice(0, itemLimit)
        .map((value:undefined, index:number) => (
          episodesListItemData.episodeListItems[index]
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
    setSelectedSeason((selectedSeason) => props.selectedSeason);
    setEpisodesListItemData((episodesListItemData) => props.episodesListItemData[props.selectedSeason - 1]);
    setSelectedSeasonChange((selectedSeasonChange) => !selectedSeasonChange);
  }, [JSON.stringify(props.episodesListItemData), props.selectedSeason]);

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
      {props.dataLoaded
        && (
        <ListContainer>
          <EpisodeDropDownContainer>
            Episodes
            <EpisodeDropdown
              selectedSeason={props.selectedSeason}
              seasonEpisodeData={props.seasonEpisodeData}
              changeSelectedSeason={props.changeSelectedSeason}
              resetEpisodeListItemLimit={resetEpisodeListItemLimit}
            />
          </EpisodeDropDownContainer>
          {props.isLoading
            ? <div>Test</div>
            : renderEpisodeListItems()

            // :props.episodesListItemData[props.selectedSeason - 1].episodeListItems
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
