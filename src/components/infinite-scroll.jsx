import React, { useState, useRef, useEffect } from 'react';

const InfiniteScroll = ({
  motionBackground,
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
      { threshold: 0.4 },
    ),
  );

  const mountMoreComponents = () => {
    scrollGroupActive.current++;
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
    console.log('entered');
    setScrollLimitReached(scrollGroupActive.current);
  }, [scrollGroupActive.current]);

  return (
    <div>
      {motionBackground}
        { 
          [
            ...Array(maxNumScrollLoads),
          ].map((value: undefined, index: number) => (
            scrollLimitReached + 1 > index && (
              <div ref={setInfiniteScrollLoadPoint}>
                {
                  React.Children.map(locoRowGroup, (child) => 
                    React.cloneElement(child, {
                      key: index,
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
