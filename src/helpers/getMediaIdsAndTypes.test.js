import { getMediaIdsAndTypes } from './getMediaIdsAndTypes';

describe('getMediaIdsAndTypesFunction', () => {
  it('should return an array of Ids and Types', async () => {
    expect(getMediaIdsAndTypes(31)).toBe('test');
  });
});
