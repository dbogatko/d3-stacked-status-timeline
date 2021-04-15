import { ItemStatus } from './item-status';

describe('ItemStatus', () => {
  it('should create an instance', () => {
    expect(new ItemStatus('red-name', 'red')).toBeTruthy();
  });
});
