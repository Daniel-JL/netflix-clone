import React from 'react';
import ContentLoader from 'react-content-loader';
import styled from 'styled-components';

const ContentLoaderContainer = styled.div`
  // position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const RectangleRow = styled.div`
  display: flex;
  
`;

const MoreLikeThisBoxLoadingSkeleton = () => {
  return (
    <ContentLoaderContainer>
      <ContentLoader
        speed={3}
        backgroundColor="rgb(64,64,64)"
        foregroundColor="rgb(64,64,64)"
        style={{ width: '90%', height: '15vw' }}
      >
        <rect x="5%" y="0" rx="0" ry="0" width="40%" height="15vw" /> 
        <rect x="55%" y="0" rx="0" ry="0" width="40%" height="15vw" /> 
      </ContentLoader>
    </ContentLoaderContainer>
  );
};

export default MoreLikeThisBoxLoadingSkeleton;
