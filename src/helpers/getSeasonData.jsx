const getSeasonData = async (mediaId, seasonNum) => {
  let data;

  try {
    data = await fetch(`https://api.themoviedb.org/3/tv/${mediaId}/season/${seasonNum}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}`)
          .then(
            (response) => response.json(),
          );
  } catch (error) {
    console.log(error);
    throw (error);
  }

  return data;
};

export default getSeasonData;
