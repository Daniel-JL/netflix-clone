/* eslint-disable import/prefer-default-export */
import React from 'react';
import { LocoRow } from '../slider/loco-row';

export const Latest = (props) => {
  return (
    <div style={{backgroundColor: 'darkslategray', zIndex: -2}}>
      <LocoRow setModalProps={props.setModalProps}/>
      <LocoRow setModalProps={props.setModalProps}/>
      <LocoRow setModalProps={props.setModalProps}/>
      <LocoRow setModalProps={props.setModalProps}/>
      <LocoRow setModalProps={props.setModalProps}/>
    </div>
  );
};
