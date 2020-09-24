import React, { useState, useRef, useEffect } from 'react';
import {
  NavLink,
} from 'react-router-dom';
import styled from 'styled-components';

const ISliderItemProps = {
  mediaName: 'name',
  imageID: 1,
  maturityRating: 'rating',
  numOfSeasons: 1,

};

const ItemContainer = styled.div`
  height: 139px;
  width: 250px;
  border: 1px solid black;
`;

const SliderItemImage = styled.img`
  width: 100%;
  height: 100%;
`;

export function SliderItem(props) {
  const [imgLoaded, setImgLoaded] = useState(false);
  let movieTvShowIds = [];
  movieTvShowIds = useRef(movieTvShowIds.fill(React.createRef(), 0, 41));
  const maxIdsNeeded = 42;
  const itemsPerPage = 20;
  let posterPath = useRef('');

  const fetchUrlData = () => {
    fetch(`https://api.themoviedb.org/3/${props.mediaType}/${props.mediaId}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        posterPath.current = `http://image.tmdb.org/t/p/original${data.poster_path}`;
        setImgLoaded(true);
      });
  };

  useEffect(() => {
    if(!imgLoaded) {
      fetchUrlData();
    }
  })

  return (
    <ItemContainer>
      {imgLoaded
      && <SliderItemImage src={posterPath.current} />}
    </ItemContainer>
  );
}
