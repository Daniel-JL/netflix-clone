import React, { useState, useRef, useEffect } from 'react';
import { LocoRow } from './loco-row';

const LocoRowGroup = ({
  genreTypeArr, 
  numItems,
  setModalProps,
  numSlidersLoaded,
}) => {
  return (
    <div>
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
        />
      ))
    }
  </div>
  )
};

export default LocoRowGroup;