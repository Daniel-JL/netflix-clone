/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import { InfiniteScrollComponents } from './infinite-scroll-components';

const InfiniteScroll = ({
  motionBackground,
  locoRow,
  genreTypeArr,
}) => {
  const scrollGroupActive = useRef(0);
  const [toggleForRerender, setToggleForRerender] = useState(false);
  const [scrollLimitReached, setScrollLimitReached] = useState(scrollGroupActive.current);
  const [element, setElement] = useState(null);
  // const [motionBackgroundRef, motionBackgroundRef] = useState(null);
  const numItemsPerScroll = 5;
  const maxNumScrollLoads = Math.floor(genreTypeArr.length / numItemsPerScroll);

  let videoDiv = document.querySelector('#motion-background');
  const prevY = useRef(0);
  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        const { y } = firstEntry.boundingClientRect;

        if (prevY.current > y && scrollGroupActive.current <= maxNumScrollLoads) {
          mountMoreComponents();
        }

        prevY.current = y;
      },
      { threshold: 0.5 },
    ),
  );

  const mountMoreComponents = () => {
    scrollGroupActive.current++;
    setToggleForRerender((toggleForRerender) => !toggleForRerender);
  };

  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);

  useEffect(() => {
    setScrollLimitReached(scrollGroupActive.current);
  }, [scrollGroupActive.current]);

  return (
    <div>
      <div>
        {motionBackground}
        {locoRow}
        { 
          [
            ...Array(maxNumScrollLoads),
          ].map((value: undefined, index: number) => (
            scrollLimitReached + 1 > index && 
            [
              ...Array(numItemsPerScroll),
            ].map((value: undefined, innerIndex) => (
              React.Children.map(locoRow, (child) => 
                React.cloneElement(child, {
                  genreName:genreTypeArr[innerIndex + numItemsPerScroll*index].genre.name,
                  genreId:genreTypeArr[innerIndex + numItemsPerScroll*index].genre.id,
                  mediaType:genreTypeArr[innerIndex + numItemsPerScroll*index].mediaType,
                  numSlidersLoaded:innerIndex + numItemsPerScroll*index + 1,
                })
              ) 
            )
            )))
        }
      </div>
      <div id="scrollPoint" ref={setElement} />
    </div>
  );
};

export default InfiniteScroll;
