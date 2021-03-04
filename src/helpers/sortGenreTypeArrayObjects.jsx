const sortGenreTypeArrayObjects = (movieGenres, tvGenres) => {
  const longestArrLength = movieGenres.length > tvGenres.length ? movieGenres.length : tvGenres.length;
  const genreArr = [];

  for (let i = 0; i < longestArrLength; i++) {
    if (movieGenres.length > 0 && i < movieGenres.length) {
      genreArr.push(
        {
          mediaType: 'movie',
          genre: movieGenres[i],
        },
      );
    }
    if (tvGenres.length > 0 && i < tvGenres.length) {
      genreArr.push(
        {
          mediaType: 'tv',
          genre: tvGenres[i],
        },
      );
    }
  }

  return genreArr;
};

export default sortGenreTypeArrayObjects;
