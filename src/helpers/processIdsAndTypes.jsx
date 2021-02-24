const processIdsAndTypes = (data, numIdsNeeded, mediaType) => {
  const numItemsPerPage = 20;
  const movieTvShowIdsAndTypes = { ids: [], types: [] };
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < numItemsPerPage; j++) {
      if (data[i].results[j].backdrop_path === undefined) {
        console.log(data[i]);
      }
      if (data[i].results[j].backdrop_path !== null) {
        movieTvShowIdsAndTypes.ids.push(data[i].results[j].id);
        if (mediaType !== undefined) {
          movieTvShowIdsAndTypes.types.push(mediaType);
        } else {
          movieTvShowIdsAndTypes.types.push(data[i].results[j].media_type);
        }

        if (movieTvShowIdsAndTypes.ids.length >= numIdsNeeded) {
          break;
        }
      }
    }
  }
  return movieTvShowIdsAndTypes;
};

export default processIdsAndTypes;
