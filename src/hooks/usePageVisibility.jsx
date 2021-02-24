import React, { useState } from 'react';
import getIsDocumentHidden from '../helpers/getIsDocumentHidden';
import getBrowserVisibilityProp from '../helpers/getBrowserVisibilityProp';

const usePageVisibility = () => {
  const [isVisible, setIsVisible] = useState(getIsDocumentHidden());

  const onVisibilityChange = () => setIsVisible(getIsDocumentHidden());

  React.useEffect(() => {
    const visibilityChange = getBrowserVisibilityProp();
    document.addEventListener(visibilityChange, onVisibilityChange, false);
    return () => {
      document.removeEventListener(visibilityChange, onVisibilityChange);
    };
  });
  return isVisible;
};

export default usePageVisibility;
