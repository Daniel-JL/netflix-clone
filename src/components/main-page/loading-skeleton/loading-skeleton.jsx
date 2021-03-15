import React from 'react';
import ContentLoader from 'react-content-loader';
import styled from 'styled-components';

const ContentLoaderContainer = styled.div`
  margin-top: 10vh;
  position: absolute;
  width: 100%;
`;

const RectangleRow = styled.div`
  display: flex;
  
`;

const LoadingSkeleton = () => {
  return (
    <ContentLoaderContainer>
      <ContentLoader
        speed={3}
        // viewBox="0 0 400 150"
        // viewBox="0 0 100 100"
        // width={80}
        // height={100}
        backgroundColor="#101010"
        foregroundColor="#303030"
        style={{ width: '100%' }}
      >
        <rect x="5%" y="10%" rx="1" ry="1" width="14vw" height="8vw" /> 
        <rect x="20%" y="10%" rx="1" ry="1" width="14vw" height="8vw" /> 
        <rect x="35%" y="10%" rx="1" ry="1" width="14vw" height="8vw" /> 
        <rect x="50%" y="10%" rx="1" ry="1" width="14vw" height="8vw" />
        <rect x="65%" y="10%" rx="1" ry="1" width="14vw" height="8vw" />
        <rect x="80%" y="10%" rx="1" ry="1" width="14vw" height="8vw" />
      </ContentLoader>
    </ContentLoaderContainer>
    
  );
};

export default LoadingSkeleton;
