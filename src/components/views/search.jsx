import React from 'react';
import LocoRow from '../slider/loco-row';
import InfiniteScroll from '../infinite-scroll';

const Search = (props) => {
  const maxNumScrollLoads = 6;

  return (
    <div style={{ backgroundColor: 'darkslategray', zIndex: -2 }}>
      <LocoRow setModalProps={props.setModalProps}/>
      <LocoRow setModalProps={props.setModalProps}/>
      <LocoRow setModalProps={props.setModalProps}/>
      <LocoRow setModalProps={props.setModalProps}/>
      <LocoRow setModalProps={props.setModalProps}/>
      <LocoRow setModalProps={props.setModalProps}/>
      <LocoRow setModalProps={props.setModalProps}/>
      <LocoRow setModalProps={props.setModalProps}/>
      <LocoRow setModalProps={props.setModalProps}/>
      <LocoRow setModalProps={props.setModalProps}/>
      <InfiniteScroll viewName="search" maxNumScrollLoads={maxNumScrollLoads} />
    </div>

  );
};

export default Search;
