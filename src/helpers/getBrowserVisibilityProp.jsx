const getBrowserVisibilityProp = () => {
  if (typeof document.hidden !== 'undefined') {
    // Opera 12.10 and Firefox 18 and later support
    return 'visibilitychange';
  } if (typeof document.msHidden !== 'undefined') {
    return 'msvisibilitychange';
  } if (typeof document.webkitHidden !== 'undefined') {
    return 'webkitvisibilitychange';
  }
};

export default getBrowserVisibilityProp;
