import getPage from './getPage';

const findCommonElements = (arr1, arr2) => {
  
};

const sortDataForUniqueSlider = async (dataList, mediaIdList, mediaType, genreName, genreId) => {
  let url;
  const page = dataList.length + 1;

  if (genreName === 'trending') {
    url = `https://api.themoviedb.org/3/trending/${mediaType}/week?page=${page}&api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}`;
  } else {
    url = `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&with_genres=${genreId}&page=${page}`;
  }

  const getPagesUntilUniqueSliderItems = async () => {
    let data;
    try {
      data = await fetch(url)
        .then(
          (response) => response.json(),
        )
        .then((data) => {

          return data;

        });
    } catch (error) {
      console.log(error);
      throw (error);
    }
  };


  let data = await getPagesUntilUniqueSliderItems();
  console.log(data);
  return data;
};

export default sortDataForUniqueSlider;
