const processIdsAndTypes = (data, numIdsNeeded, mediaType) => {
  const numItemsPerPage = 20;
  const movieTvShowIdsAndTypes = { ids: [], types: [] };

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < numItemsPerPage; j++) {
      movieTvShowIdsAndTypes.ids.push(data[i].results[j].id);
      movieTvShowIdsAndTypes.types.push(data[i].results[j].media_type);
      if (mediaType !== undefined) {
        movieTvShowIdsAndTypes.types[j] = mediaType;
      }

      if (movieTvShowIdsAndTypes.ids.length >= numIdsNeeded) {
        break;
      }
    }
  }
  return movieTvShowIdsAndTypes;
};

export default processIdsAndTypes;
