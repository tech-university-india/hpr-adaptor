const cacheUtils = require('../../src/utils/mCache');
const cache = require('memory-cache');

describe('cacheUtils', () => {
  afterEach(() => {
    cache.clear();
  });

  describe('setCache', () => {
    it('should set a value in the cache', () => {
      const key = 'test';
      const value = 'testValue';
      const expiry = 1000;

      cacheUtils.setCache(key, value, expiry);

      expect(cache.get(key)).toEqual(value);
    });

    it('should set a value in the cache with a default expiry of 5 minutes', () => {
      const key = 'test';
      const value = 'testValue';

      cacheUtils.setCache(key, value);

      expect(cache.get(key)).toEqual(value);
    });
  });

  describe('getCache', () => {
    it('should return a value from the cache', () => {
      const key = 'test';
      const value = 'testValue';
      const expiry = 1000;

      cache.put(key, value, expiry);

      const result = cacheUtils.getCache(key);

      expect(result).toEqual(value);
    });

    it('should return undefined if the key does not exist in the cache', () => {
      const key = 'nonexistentKey';

      const result = cacheUtils.getCache(key);

      expect(result).toBeNull();
    });
  });
});