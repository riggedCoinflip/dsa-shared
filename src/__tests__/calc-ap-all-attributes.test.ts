import {prefix} from '../calc-ap/calc-ap-helper';

describe('calcApHelper', () => {
  describe('rename', () => {
    it('renames correctly', () => {
      expect(prefix('name', 'prefix')).toBe('prefixName');
    });
  });
});
