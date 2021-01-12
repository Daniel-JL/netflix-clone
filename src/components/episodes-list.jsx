import React, { useState } from 'react';
import styled from 'styled-components';
import EpisodesListItemContainer from './episodes-list-item-container';

const Container = styled.div`
  width: 100%;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // align-self: center;

`;

const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function EpisodesList(props) {
  const [selectedSeason, setSelectedSeason] = useState(1);

  return (
    <Container>
      {props.dataLoaded
        && (
        <ListContainer>
          {
              [
                ...Array(props.seasonEpisodeData[selectedSeason - 1].length),
              ].map((value: undefined, index: number) => (
                // <div data-index={index} key={index} >
                  <EpisodesListItemContainer
                    key={index}
                    mediaId={props.mediaId}
                    episodeNum={index + 1}
                    seasonNum={selectedSeason}
                    episodeData={props.seasonEpisodeData[selectedSeason - 1][index]}
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
