import React from 'react';
import ContentLoader from 'react-content-loader';
import styled from 'styled-components';

const ContentLoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const MotionBackgroundLoadingSkeleton = () => {
  return (
    <ContentLoaderContainer>
      <ContentLoader
        speed={3}
        backgroundColor="rgb(64,64,64)"
        foregroundColor="rgb(64,64,64)"
        style={{ width: '100%', height: '27vw' }}
      >
        <rect x="" y="0" rx="0" ry="0" width="100%" height="27vw" /> 

      </ContentLoader>
    </ContentLoaderContainer>
  );
};

export default MotionBackgroundLoadingSkeleton;
