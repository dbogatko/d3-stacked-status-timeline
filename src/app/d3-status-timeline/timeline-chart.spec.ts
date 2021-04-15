import { TimelineChart } from './timeline-chart';
import { TimelineConfiguration } from './timeline-configuration';

describe('TimelineChart', () => {
  it('should create an instance', () => {
    expect(new TimelineChart(new TimelineConfiguration())).toBeTruthy();
  });
});
