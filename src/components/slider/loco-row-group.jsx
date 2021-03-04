import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import LoadingSkeleton from '../loading-skeleton';
import { MotionBackground } from '../motion-background/motion-background';
import LocoRow from './loco-row';

const GroupContainer = styled.div`
  position: relative;
  display: none;

  ${({ itemsLoaded }) => itemsLoaded && `
      display: block;
  `}
`;

const ContentContainer = styled.div`

`;

const ScrollLoadPoint = styled.div`
  position: absolute;
  width: 100%;
  height: 50%;
  top: 50%;
`;

const LocoRowGroup = ({
  genreTypeArr, 
  trendingItemData,
  numItems,
  setModalProps,
  numSlidersLoaded,
  setInfiniteScrollLoadPoint,
  portalRef,
}) => {
  const [itemsLoaded, setItemsLoaded] = useState(false);
  const numItemsLoaded = useRef(0);
  let scrollRef = useRef(0);
  let itemsToLoad;


  if (numSlidersLoaded === 1) {
    itemsToLoad = 5;
  } else {
    itemsToLoad = 4;
  }

  const handleItemLoaded = () => {
    console.log('handleItemLoaded');
    numItemsLoaded.current += 1;
    
    if (numItemsLoaded.current > itemsToLoad) {
      setItemsLoaded((itemsLoaded) => itemsLoaded + 1);
    }
  };

  return (
    <div>
      {!itemsLoaded && <LoadingSkeleton />}
      <GroupContainer itemsLoaded={itemsLoaded}>
        {itemsLoaded && 
          <ScrollLoadPoint 
            id="scrollLoadPoint" 
            ref={setInfiniteScrollLoadPoint}
          />
        }
        <ContentContainer>
          {numSlidersLoaded === 1 &&
            <MotionBackground
              mediaType={trendingItemData.mediaType}
              mediaId={trendingItemData.id}
              ageRating={trendingItemData.ageRating}
              isEpsInfoBox={false}
              handleItemLoaded={handleItemLoaded}
              itemsLoaded={itemsLoaded}
              portalRef={portalRef}
            />
          }
          {
            [
              ...Array(numItems),
            ].map((value: undefined, index: number) => (
              <LocoRow 
                key={index + numSlidersLoaded}
                genreName={genreTypeArr[index].genre.name}
                genreId={genreTypeArr[index].genre.id}
                mediaType={genreTypeArr[index].mediaType}
                numSlidersLoaded={index + 1 + numSlidersLoaded}
                setModalProps={setModalProps}
                handleItemLoaded={handleItemLoaded}
                itemsLoaded={itemsLoaded}
              />
            ))
          }
        </ContentContainer>
        
        
      </GroupContainer>
    </div>
  )
};

export default LocoRowGroup;
