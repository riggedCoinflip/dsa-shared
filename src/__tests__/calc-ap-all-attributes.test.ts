import {prefixString} from '../calc-ap/calc-ap-helper';

describe('calcApHelper', () => {
  describe('rename', () => {
    it('renames correctly', () => {
      expect(prefixString('name', 'prefix')).toBe('prefixName');
    });
  });
});
