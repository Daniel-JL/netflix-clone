/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import { InfiniteScrollComponents } from './infinite-scroll-components';

export const InfiniteScroll = (props) => {
  const scrollGroupActive = useRef(0);
  const [toggleForRerender, setToggleForRerender] = useState(false);
  const [element, setElement] = useState(null);
  const { maxNumScrollLoads } = props;

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

  return (
    <div>
      <InfiniteScrollComponents
        scrollLimitReached={scrollGroupActive.current}
        maxNumScrollLoads={props.maxNumScrollLoads}
        viewName={props.viewName}
      />
      <div ref={setElement} />
    </div>
  );
};
