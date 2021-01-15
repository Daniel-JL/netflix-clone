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

  useEffect(() => {
    console.log(selectedSeasonChange);
    setSelectedSeasonChange((selectedSeasonChange) => !selectedSeasonChange);
  }, [props.selectedSeason]);

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
              [
                ...Array(props.seasonEpisodeData[props.selectedSeason - 1].episodeData.length),
              ].map((value: undefined, index: number) => (
                // <div data-index={index} key={index} >
                  <EpisodesListItemContainer
                    key={index}
                    mediaId={props.mediaId}
                    episodeNum={index + 1}
                    seasonNum={props.selectedSeason}
                    episodeData={props.seasonEpisodeData[props.selectedSeason - 1].episodeData[index]}
                  />
                // </div>
              ))
            }
        </ListContainer>
        )}
    </Container>

  );
}

export default EpisodesList;
