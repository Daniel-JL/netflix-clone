import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import getSeasonData from '../../helpers/getSeasonData';
import EpisodesList from './episodes-list';
import MoreLikeThisItem from './more-like-this-item';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  width: 90%;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

const GridItem = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  align-self: center;
  margin: 1vw;
`;

function MoreLikeThisBox({
  isLoading,
  imgSrcArray,
  mediaDetails,
}) {
  return (
    <GridContainer>
      {isLoading
        ? <div>Loading</div>
        : 
            [
              ...Array(imgSrcArray.length),
            ].map((value: undefined, index: number) => (
              <GridItem data-index={index} key={index}>
                <MoreLikeThisItem 
                  imgSrc={imgSrcArray[index]} 
                  mediaDetails={mediaDetails[index]}
                />
              </GridItem>
               
            ))
        }


    </GridContainer>
  );
}

export default MoreLikeThisBox;
