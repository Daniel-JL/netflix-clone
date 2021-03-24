const getMediaData = async (mediaType, mediaId) => {
  let data;

  try {
    data = await fetch(`https://api.themoviedb.org/3/${mediaType}/${mediaId}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}`)
      .then(
        (response) => response.json(),
      );
  } catch (error) {
    console.log(error);
    throw (error);
  }

  return data;
};

export default getMediaData;
