import React, { useState, useRef, useEffect } from 'react';

const InfiniteScroll = ({
  locoRowGroup,
  genreTypeArr,
}) => {
  const scrollGroupActive = useRef(0);
  const [toggleForRerender, setToggleForRerender] = useState(false);
  const [scrollLimitReached, setScrollLimitReached] = useState(scrollGroupActive.current);
  const [infiniteScrollLoadPoint, setInfiniteScrollLoadPoint] = useState(null);
  const numItemsPerScroll = 5;
  const maxNumScrollLoads = Math.floor(genreTypeArr.length / numItemsPerScroll);

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
      { threshold: 0.2 },
    ),
  );

  const mountMoreComponents = () => {
    scrollGroupActive.current++;
    //  Scroll load point removed until new items loaded
    setInfiniteScrollLoadPoint(0);
    setToggleForRerender((toggleForRerender) => !toggleForRerender);
  };

  useEffect(() => {
    const currentElement = infiniteScrollLoadPoint;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [infiniteScrollLoadPoint]);

  useEffect(() => {
    setScrollLimitReached(scrollGroupActive.current);
  }, [scrollGroupActive.current]);

  return (
    <div>
      {/* 
        Load a new LocoRowGroup each time the scroll point is reached. The scroll load
        point is set to somewhere further down the page. The new Sliders in the 
        LocoRowGroup are loaded with new genres from genreTypeArr so that each Slider
        is unique. 
      */}
        { 
          [
            ...Array(maxNumScrollLoads),
          ].map((value: undefined, index: number) => (
            scrollLimitReached + 1 > index && (
              <div>
                {
                  React.Children.map(locoRowGroup, (child) => 
                    React.cloneElement(child, {
                      key: index,
                      setInfiniteScrollLoadPoint: setInfiniteScrollLoadPoint,
                      genreTypeArr: genreTypeArr.slice(index*numItemsPerScroll, index*numItemsPerScroll + numItemsPerScroll),
                      numItems: numItemsPerScroll,
                      numSlidersLoaded: numItemsPerScroll*index + 1,
                    })
                  ) 
                }
            </div>
            )
          ))
        }
    </div>
  );
};

export default InfiniteScroll;
