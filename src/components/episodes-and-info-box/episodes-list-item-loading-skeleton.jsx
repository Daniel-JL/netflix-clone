import React from 'react';
import ContentLoader from 'react-content-loader';
import styled from 'styled-components';

const ContentLoaderContainer = styled.div`
  position: absolute;
  width: 100%;
`;

const RectangleRow = styled.div`
  display: flex;
  
`;

const EpisodesListItemLoadingSkeleton = () => {
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
        style={{ width: '90%' }}
      >
        <rect x="0%" y="0%" rx="0" ry="0" width="100%" height="7vw" /> 
        </ContentLoader>
    </ContentLoaderContainer>
    
  );
};

export default EpisodesListItemLoadingSkeleton;
