import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import getSeasonData from '../helpers/getSeasonData';
import EpisodesList from './episodes-list';

const Container = styled.div`

`;

function EpisodesListContainer(props) {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [epsPerSeason, setEpsPerSeason] = useState([]);
  const [seasonEpisodeData, setSeasonEpisodeData] = useState([]);

  const fetchAllSeasonData = async () => {
    const data = await getSeasonData(props.mediaId, props.numSeasons);
    console.log(data);

    for (let i = 0; i < data.length; i++) {
      setSeasonEpisodeData((seasonEpisodeData) => [...seasonEpisodeData, data[i].episodes])
      // setEpsPerSeason((epsPerSeason) => [...epsPerSeason, data[i].episodes.length]);
    }
    setDataLoaded(true);

    // const data = await getMediaData(props.mediaType, props.mediaId);
    // console.log(data);
    // posterPath.current = `http://image.tmdb.org/t/p/w780${data.backdrop_path}`;

    // genres.current = [
    //   ...Array(data.genres.length),
    // ].map((undefined, index) => data.genres[index].name);

    // if (mediaIsMovie(props.mediaType)) {
    //   runtimeOrNumberOfSeasons.current = `${data.runtime}m`;
    // } else if (moreThanOneSeason(data.number_of_seasons)) {
    //   runtimeOrNumberOfSeasons.current = `${data.number_of_seasons} Seasons`;
    // } else {
    //   runtimeOrNumberOfSeasons.current = `${data.number_of_seasons} Season`;
    // }

    // ageRating.current = await getAgeRating(ageRatingUrl.current, props.mediaType);
  };

  useEffect(() => {
    if (!dataLoaded) {
      fetchAllSeasonData();
    }
  }, []);

  return (
    <div>
      {dataLoaded
      && (
        <EpisodesList
          mediaId={props.mediaId}
          seasonEpisodeData={seasonEpisodeData}
          dataLoaded={dataLoaded}
        />
      )
      }
    </div>
    
  );
}

export default EpisodesListContainer;