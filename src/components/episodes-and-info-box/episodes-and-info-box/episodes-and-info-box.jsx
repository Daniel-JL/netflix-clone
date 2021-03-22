import React, { useState, useRef, useEffect } from 'react';
import {
  useHistory,
} from 'react-router-dom';
import styled from 'styled-components';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import getMediaData from '../../../helpers/getMediaData';
import mediaIsMovie from '../../../helpers/mediaIsMovie';
import MotionBackground from '../../motion-background/motion-background/motion-background';
import EpisodesListContainer from '../episodes-list-container/episodes-list-container';
import MoreLikeThisBoxContainer from '../more-like-this-box-container/more-like-this-box-container';

const EpisodesAndInfoBoxContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 50%;
  background: #fff;
  border: 2px solid #444;
  color: white;
  background-color: rgb(32,32,32);
  top: 20px;
  padding-bottom: 25px;
`;

const epsInfoBoxLoadedFromSliderItem = (mediaId) => mediaId !== undefined && mediaId !== '';

const getMediaDataFromUrl = (currentUrl) => {
  let mediaId;
  let mediaType;

  if (currentUrl.slice(8, 16) === 'genre/83') {
    mediaId = currentUrl.slice(31);
    mediaType = currentUrl.slice(28, 30);
  } else if (currentUrl.slice(8, 19) === 'genre/34399') {
    mediaId = currentUrl.slice(37);
    mediaType = currentUrl.slice(31, 36);
  } else if (currentUrl.slice(19, 24) === 'movie') {
    mediaId = currentUrl.slice(25);
    mediaType = currentUrl.slice(19, 24);
  } else {
    mediaId = currentUrl.slice(22);
    mediaType = currentUrl.slice(19, 21);
  }

  return {
    id: mediaId,
    type: mediaType,
  };
};

const EpisodesAndInfoBox = ({
  epsAndInfoBoxProps,
  setScrollHidden,
  setModalProps,
}) => {
  const [epsInfoBoxData, setEpsInfoBoxData] = useState(epsAndInfoBoxProps);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [transitionComplete, setTransitionComplete] = useState(false);
  const history = useHistory();
  const ref = useRef();
  useOnClickOutside(ref, () => back());
  document.body.style.overflow = 'hidden';

  const back = () => {
    setModalProps('', '', '', '', '', '', '', '');
    setScrollHidden();
    history.goBack();
    document.body.style.overflow = 'scroll';
  };

  const fetchMediaData = async () => {
    const currentUrl = history.location.pathname;
    const mediaData = getMediaDataFromUrl(currentUrl);

    const data = await getMediaData(mediaData.type, mediaData.id);

    setEpsInfoBoxData((epsInfoBoxData) => ({
      mediaId: mediaData.id,
      mediaType: mediaData.type,
      runtimeOrNumberOfSeasons: (mediaIsMovie(mediaData.type)
        ? `${data.runtime}m`
        : [
          ...Array(data.number_of_seasons),
        ].map((undefined, index) => (
          {
            seasonNum: index + 1,
            numEps: data.seasons[index].episode_count,
          }
        ))
      ),
      overview: data.overview,
    }));

    setDataLoaded(true);
  };

  useEffect(() => {
    if (epsInfoBoxLoadedFromSliderItem(epsInfoBoxData.mediaId)) {
      setDataLoaded(true);
    } else {
      fetchMediaData();
    }
  }, []);

  return (
    <EpisodesAndInfoBoxContainer
      ref={ref}
    >
      {dataLoaded
      && (
      <div>
        <MotionBackground
          isEpsInfoBox
          mediaType={epsInfoBoxData.mediaType}
          mediaId={epsInfoBoxData.mediaId}
          handleItemLoaded={() => {}}
          itemsLoaded
          transitionComplete={transitionComplete}
        />
        {epsInfoBoxData.mediaType === 'tv'
              && (
              <EpisodesListContainer
                mediaId={epsInfoBoxData.mediaId}
                numEpsPerSeason={epsInfoBoxData.runtimeOrNumberOfSeasons}
              />
              )}
        <MoreLikeThisBoxContainer
          mediaId={epsInfoBoxData.mediaId}
          mediaType={epsInfoBoxData.mediaType}
        />
      </div>
      )}
    </EpisodesAndInfoBoxContainer>

  );
};

export default EpisodesAndInfoBox;
