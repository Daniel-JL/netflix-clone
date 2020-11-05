/* eslint-disable import/prefer-default-export */
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalStyle = {
  position: "fixed",
  height: 1000,
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
  // backgroundColor: "rgba(0,0,0,.2)",
  // color: "##FFF",
  // fontSize: "40px",
};

export const Modal = (props) => {
  // const mount = document.getElementById('modal-root');
  // const el = document.createElement('div');

  // useEffect(() => {
  //   mount.appendChild(el);
  //   return () => mount.removeChild(el);
  // }, [el, mount]);

  // return createPortal(children, el);

  return createPortal(
    <div style={modalStyle}>
      {props.children}
    </div>,
    document.getElementById("modal-root"),
  );
};
