import React, {
  useState, useRef, useEffect, createContext,
} from 'react';
import { SliderItem } from './slider-item';
import { getMediaData } from '../../helpers/getMediaData';
import { getAgeRating } from '../../helpers/getAgeRating';
import mediaIsMovie from '../../helpers/mediaIsMovie';

const SliderItemContainer = ({
  setModalProps,
  mediaType,
  mediaId,
  handleImageLoaded,
}) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [imgLoadingErr, setImgLoadingErr] = useState(false);
  const [imgLoadedSuccess, setImgLoadedSuccess] = useState(false);
  const [itemHoverActive, setItemHoverActive] = useState(false);
  const [itemHoverTransition, setItemHoverTransition] = useState(true);
  const [itemDimensions, setItemDimensions] = useState({});
  const [mediaTitle, setMediaTitle] = useState();
  const [posterPath, setPosterPath] = useState();
  const [genres, setGenres] = useState();
  const [runtimeOrNumberOfSeasons, setRuntimeOrNumberOfSeasons] = useState();
  const [ageRating, setAgeRating] = useState();
  const [overview, setOverview] = useState();
  const [delayHandler, setDelayHandler] = useState();
  const delayDuration = 300;

  const fetchItemData = async () => {
    const data = await getMediaData(mediaType, mediaId);

    setMediaTitle((mediaTitle) => (data.title ? data.title : data.name));
    setPosterPath((posterPath) => `http://image.tmdb.org/t/p/w780${data.backdrop_path}`);
    setGenres((genres) => [
      ...Array(data.genres.length),
    ].map((undefined, index) => data.genres[index].name));
    setRuntimeOrNumberOfSeasons((runtimeOrNumberOfSeasons) => (mediaIsMovie(mediaType) ? `${data.runtime}m` : data.number_of_seasons));
    setOverview((overview) => data.overview);

    const ageRating = await getAgeRating(mediaId, mediaType);
    setAgeRating((ageRating) => ageRating);
  

    setDataLoaded(true);
  };

  const handleMouseOver = (itemContainerRef) => {
    if (imgLoadedSuccess) {
      setDelayHandler(setTimeout(() => {
        const rect = itemContainerRef.getBoundingClientRect();
        setItemDimensions((itemDimensions) => ({
          left: rect.x,
          top: rect.y + window.scrollY,
          bottom: rect.bottom,
          right: rect.right,
          width: rect.right - rect.left,
          height: rect.bottom - rect.top,
        }));
        setItemHoverTransition(true);
        setItemHoverActive(true);
      }, delayDuration));
    }
  };

  const handleMouseOut = () => {
    clearTimeout(delayHandler);
    setItemHoverTransition(false);
  };

  const handleModalDismount = () => {
    setItemHoverActive(false);
  };

  const handleImgLoadingErr = () => {
    setImgLoadingErr(true);
  };

  const handleImgLoadedSuccess = () => {
    setImgLoadedSuccess(true);
    handleImageLoaded();
  };

  const handleEpsAndInfoButtonClick = () => {
    setModalProps(
      mediaId,
      mediaType,
      posterPath,
      runtimeOrNumberOfSeasons,
      genres,
      ageRating,
      overview,

    );
  };

  useEffect(() => {
    if (!dataLoaded) {
      fetchItemData();
    }
  });

  return (
    <div>
      {dataLoaded
        && (
        <SliderItem
          mediaTitle={mediaTitle}
          mediaId={mediaId}
          mediaType={mediaType}
          ageRating={ageRating}
          genres={genres}
          imgLoadedSuccess={imgLoadedSuccess}
          imgLoadingErr={imgLoadingErr}
          dataLoaded={dataLoaded}
          posterPath={posterPath}
          runtimeOrNumberOfSeasons={runtimeOrNumberOfSeasons}
          itemHoverActive={itemHoverActive}
          itemHoverTransition={itemHoverTransition}
          handleMouseOver={handleMouseOver}
          handleMouseOut={handleMouseOut}
          handleModalDismount={handleModalDismount}
          setImgLoadingErr={handleImgLoadingErr}
          setImgLoadSuccess={handleImgLoadedSuccess}
          handleEpsAndInfoButtonClick={handleEpsAndInfoButtonClick}
          itemDimensions={itemDimensions}
        />
        )}
    </div>
  );
};

export default SliderItemContainer;
