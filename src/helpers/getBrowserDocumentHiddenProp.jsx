const getBrowserDocumentHiddenProp = () => {
  if (typeof document.hidden !== 'undefined') {
    return 'hidden';
  } if (typeof document.msHidden !== 'undefined') {
    return 'msHidden';
  } if (typeof document.webkitHidden !== 'undefined') {
    return 'webkitHidden';
  }
};

export default getBrowserDocumentHiddenProp;
