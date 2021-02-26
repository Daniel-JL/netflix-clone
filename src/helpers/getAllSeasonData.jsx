const getAllSeasonData = async (mediaId, numSeasons) => {
  const seasonDataArr = new Array(numSeasons);
  let data;

  for (let i = 0; i < numSeasons; i++) {
    seasonDataArr[i] = [i + 1];
  }

  try {
    data = await Promise.all(
      seasonDataArr.map(
        (seasonDataArr) => fetch(`https://api.themoviedb.org/3/tv/${mediaId}/season/${seasonDataArr}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}`)
          .then(
            (response) => response.json(),
          ),
      ),
    );
  } catch (error) {
    console.log(error);
    throw (error);
  }

  return data;
};

export default getAllSeasonData;
