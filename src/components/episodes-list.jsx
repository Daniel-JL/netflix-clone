import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import EpisodesListItemContainer from './episodes-list-item-container';
import { EpisodeDropdown } from './dropdowns';

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
  const [episodesListItemData, setEpisodesListItemData] = useState([]);

  useEffect(() => {
    console.log(selectedSeasonChange);
    console.log(props.selectedSeason);
    setSelectedSeason((selectedSeason) => props.selectedSeason);
    setEpisodesListItemData((episodesListItemData) => props.episodesListItemData[props.selectedSeason - 1]);
    setSelectedSeasonChange((selectedSeasonChange) => !selectedSeasonChange);
  }, [props.selectedSeason]);

  useEffect(() => {
    console.log(episodesListItemData);
  });

  return (
    <Container>
      {props.dataLoaded
        && (
        <ListContainer>
          <EpisodeDropDownContainer>
            {'Episodes'}
            <EpisodeDropdown 
              selectedSeason={props.selectedSeason}
              seasonEpisodeData={props.seasonEpisodeData}
              changeSelectedSeason={props.changeSelectedSeason}
            />
          </EpisodeDropDownContainer>
          {
            // props.episodesListItemData[props.selectedSeason - 1].episodeListItems
            episodesListItemData.episodeListItems
          }
        </ListContainer>
        )}
    </Container>

  );
}

export default EpisodesList;
