import getTrendingMediaIdsAndTypes from './getTrendingMediaIdsAndTypes';

describe('getTrendingMediaIdsAndTypesFunction', () => {
  it('should return an array of Ids and Types', async () => {
    expect(getTrendingMediaIdsAndTypes(31)).toBe('test');
  });
});
