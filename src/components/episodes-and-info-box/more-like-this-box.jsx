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
  align-items: center;
  align-self: center;
`;

function MoreLikeThisBox(props) {
  return (
    <GridContainer>
      {props.isLoading
        ? <div>Loading</div>
        : 
            [
              ...Array(props.imgSrcArray.length),
            ].map((value: undefined, index: number) => (
              <GridItem data-index={index} key={index}>
                <MoreLikeThisItem 
                  imgSrc={props.imgSrcArray[index]} 
                  mediaDetails={props.mediaDetails[index]}
                />
              </GridItem>
               
            ))
        }


    </GridContainer>
  );
}

export default MoreLikeThisBox;
