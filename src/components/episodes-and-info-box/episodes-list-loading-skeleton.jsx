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

const EpisodesListLoadingSkeleton = () => {
  return (
    <ContentLoaderContainer>
      <ContentLoader
        speed={3}
        backgroundColor="rgb(64,64,64)"
        foregroundColor="rgb(64,64,64)"
        style={{ width: '90%', height: '75vw', }}
      >
        <rect x="0" y="0" rx="0" ry="0" width="100%" height="7vw" /> 
        <rect x="0" y="7.5vw" rx="0" ry="0" width="100%" height="7vw" /> 
        <rect x="0" y="15vw" rx="0" ry="0" width="100%" height="7vw" /> 
        <rect x="0" y="22.5vw" rx="0" ry="0" width="100%" height="7vw" /> 
        <rect x="0" y="30vw" rx="0" ry="0" width="100%" height="7vw" /> 
        <rect x="0" y="37.5vw" rx="0" ry="0" width="100%" height="7vw" /> 
        <rect x="0" y="45vw" rx="0" ry="0" width="100%" height="7vw" /> 
        <rect x="0" y="52.5vw" rx="0" ry="0" width="100%" height="7vw" /> 
        <rect x="0" y="60vw" rx="0" ry="0" width="100%" height="7vw" /> 
        <rect x="0" y="67.5vw" rx="0" ry="0" width="100%" height="7vw" /> 
      </ContentLoader>
    </ContentLoaderContainer>
    
  );
};

export default EpisodesListLoadingSkeleton;
