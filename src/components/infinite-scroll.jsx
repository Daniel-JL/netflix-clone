/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import { InfiniteScrollComponents } from './infinite-scroll-components';

const InfiniteScroll = ({
  motionBackground,
  locoRow,
  maxNumScrollLoads,
  movieGenres,
  tvGenres,
}) => {
  const scrollGroupActive = useRef(0);
  const [toggleForRerender, setToggleForRerender] = useState(false);
  const [scrollLimitReached, setScrollLimitReached] = useState(scrollGroupActive.current);
  const [element, setElement] = useState(null);
  // const { maxNumScrollLoads } = props;

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
    console.log(scrollLimitReached);
  }, [scrollGroupActive.current]);

  useEffect(() => {

  }, []);

  return (
    <div>
      <div>
        {motionBackground}
        {locoRow}
        {locoRow}
        {/* <InfiniteScrollComponents
          scrollLimitReached={scrollGroupActive.current}
          maxNumScrollLoads={props.maxNumScrollLoads}
        /> */}
        { 
          [
            ...Array(maxNumScrollLoads - 1),
          ].map((value: undefined, index: number) => (
            scrollLimitReached + 1 > index && 
            React.Children.map(locoRow, (child) => 
              React.cloneElement(child, {
                genreName:movieGenres[index].name,
                genreId:movieGenres[index].id
              })
          )))
        }
      </div>
      <div id="scrollPoint" ref={setElement} />
    </div>
  );
};

export default InfiniteScroll;
