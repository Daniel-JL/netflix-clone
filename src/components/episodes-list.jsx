import React, { useState } from 'react';
import styled from 'styled-components';
import EpisodesListItemContainer from './episodes-list-item-container';

const ListContainer = styled.div`
  width: 100%;
`;

function EpisodesList(props) {
  const [selectedSeason, setSelectedSeason] = useState(1);

  return (
    <div>
      {props.dataLoaded
        && (
        <ListContainer>
          {
              [
                ...Array(props.seasonEpisodeData[selectedSeason - 1].length),
              ].map((value: undefined, index: number) => (
                <div data-index={index} key={index} >
                  <EpisodesListItemContainer
                    mediaId={props.mediaId}
                    episodeNum={index + 1}
                    seasonNum={selectedSeason}
                    episodeData={props.seasonEpisodeData[selectedSeason - 1][index]}
                  />
                </div>
              ))
            }
        </ListContainer>
        )}
    </div>

  );
}

export default EpisodesList;
