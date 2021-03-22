import React, {useState, useEffect} from 'react';
import SliderItem from '../slider-item/slider-item';
import getMediaData from '../../../helpers/getMediaData';
import getAgeRating from '../../../helpers/getAgeRating';
import mediaIsMovie from '../../../helpers/mediaIsMovie';

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
  const [delayHandler, setDelayHandler] = useState();
  const [sliderItemData, setSliderItemData] = useState();
  const delayDuration = 300;

  const fetchItemData = async () => {
    const data = await getMediaData(mediaType, mediaId);
    const ageRating = await getAgeRating(mediaId, mediaType);

    setSliderItemData((sliderItemData) => ({
      mediaTitle: data.title ? data.title : data.name,
      posterPath: `http://image.tmdb.org/t/p/w780${data.backdrop_path}`,
      genres: [
        ...Array(data.genres.length),
      ].map((undefined, index) => data.genres[index].name),
      runtimeOrNumberOfSeasons: (mediaIsMovie(mediaType)
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
      ageRating,
    }));

    setDataLoaded(true);
  };

  const handleMouseOver = (itemContainerRef) => {
    if (imgLoadedSuccess) {
      //  Short delay on mouseover for visual effect
      //  Dimensions of SliderItem stored to be passed down to Modal to allow it to
      //  start with same size.
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
      sliderItemData.posterPath,
      sliderItemData.runtimeOrNumberOfSeasons,
      sliderItemData.genres,
      sliderItemData.ageRating,
      sliderItemData.overview,
      itemDimensions,
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
          mediaId={mediaId}
          mediaType={mediaType}
          sliderItemData={sliderItemData}
          imgLoadedSuccess={imgLoadedSuccess}
          imgLoadingErr={imgLoadingErr}
          dataLoaded={dataLoaded}
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
