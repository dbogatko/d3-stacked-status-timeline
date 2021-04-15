import { TimelineConfiguration } from './timeline-configuration';
import { HistoryItem } from './history-item';
import * as d3Axis from 'd3-axis';
import * as d3Scale from 'd3-scale';
import * as d3 from 'd3-selection';
import * as d3Time from 'd3-time';
import { statuses } from './item-status';

export class TimelineChart {
  private readonly config: TimelineConfiguration;
  constructor(config: TimelineConfiguration) {
    this.config = config;
  }

  public draw(
    chartContainerCSS: string,
    data: HistoryItem[],
    startDate: Date,
    endDate: Date
  ): void {
    const groups: Map<string, HistoryItem[]> = this.groupHistoryBySource(data);
    const systemNames: Array<string> = Array.from(groups.keys());
    const numberOfSystem = systemNames.length;

    // drawing root svg
    const chartHeight =
      (numberOfSystem + 1) * this.config.rowHeight + // we are adding 1 to numberOfSystems just to make height a little bit more
      (numberOfSystem + 2) * this.config.rowPadding;

    //TODO: might be calculated dynamically based on input data
    const svg = d3
      .select(chartContainerCSS)
      .append('svg')
      .attr('width', this.config.width)
      .attr('height', chartHeight);

    //TODO: approach to calculate text width should be improved to work with long texts
    const maxSystemNameLength: number = systemNames
      .map((value) => value.length)
      .reduce((previous, current) => (current > previous ? current : previous));

    // drawing scales
    const xScale = d3Scale
      .scaleTime()
      .domain([startDate, endDate])
      .range([0, this.config.width]);

    const yScale = d3Scale
      .scaleBand()
      .domain(systemNames)
      .range([
        0,
        numberOfSystem * this.config.rowHeight +
          (numberOfSystem + 2) * this.config.rowPadding,
      ]);

    const root = svg.append('g');
    const chartArea = root
      .append('g')
      .attr(
        'transform',
        `translate(${maxSystemNameLength * this.config.fontSize}, 0)`
      );

    // X axis building
    const numberOfTimeTicks = this.getNumberOfTimeTicks(
      startDate,
      endDate,
      this.config.tickIntervalMins
    );

    const topAxis = d3Axis
      .axisBottom(xScale)
      .ticks(numberOfTimeTicks)
      .tickSize(this.config.tickSize)
      .tickPadding(this.config.tickPadding);

    //TODO: need to find way to move these into css
    chartArea
      .append('g')
      .attr('class', 'top-axis')
      .style('font', `${this.config.fontSize}px ${this.config.font}`)
      .style('color', `${this.config.tickColor}`)
      .call(topAxis);

    // Y axis building
    const topAxisHeight: number = (d3
      .select('.top-axis')
      .node() as HTMLElement).getBoundingClientRect().height;
    const leftAxis = d3Axis
      .axisRight(yScale)
      .tickSize(this.config.tickSize)
      .tickPadding(this.config.tickPadding);
    root
      .append('g')
      .attr('transform', `translate(0, ${topAxisHeight})`)
      .style('font', `${this.config.fontSize}px ${this.config.font}`)
      .style('color', `${this.config.tickColor}`)
      .attr('class', 'left-axis')
      .call(leftAxis);

    // building chart
    let systemIndex = 0;
    groups.forEach((history, source) => {
      const row = chartArea
        .append('g')
        .attr(
          'transform',
          `translate(0,${topAxisHeight + this.config.rowPadding})`
        );

      const points = this.getTransitionPoints(
        source,
        history,
        startDate,
        endDate
      );

      this.addRow(this.config, row, points, systemIndex, xScale, endDate);
      systemIndex++;
    });
  }

  private addRow(
    config: TimelineConfiguration,
    row: d3,
    points: HistoryItem[],
    systemIndex: number,
    xScale: d3Scale,
    endDate: Date
  ): void {
    row
      .selectAll('rect')
      .data(points)
      .enter()
      .append('rect')
      .attr('id', 'rect')
      .attr('x', (d, i) => {
        return xScale(d.dateTime);
      })
      .attr('y', (d, i) => {
        return (
          config.rowPadding +
          (config.rowHeight + config.rowPadding) * systemIndex
        );
      })
      .attr('width', (d, i) => {
        if (points.length - 1 === i) {
          return xScale(endDate) - xScale(d.dateTime);
        } else {
          return xScale(points[i + 1].dateTime);
        }
      })
      .attr('height', config.rowHeight)
      .attr('title', (d, i) => {
        return d.dateTime.toString();
      })
      .attr('fill', (d) => {
        return d.status.color;
      })
      .attr('opacity', '1')
      .on('click', (d, i) => {
        this.config.onClickRect(d);
      });
  }

  private getNumberOfTimeTicks(
    startDate: Date,
    endDate: Date,
    intervalMins: number
  ): number {
    return d3Time.timeMinutes(startDate, endDate, intervalMins).length;
  }

  private groupHistoryBySource(
    history: HistoryItem[]
  ): Map<string, HistoryItem[]> {
    const groups: Map<string, HistoryItem[]> = new Map();
    history.forEach((item) => {
      if (groups.has(item.source)) {
        groups.get(item.source).push(item);
      } else {
        groups.set(item.source, [item]);
      }
    });
    return groups;
  }

  private getTransitionPoints(
    source: string,
    sourceHistory: HistoryItem[],
    startDate: Date,
    endDate: Date
  ): Array<HistoryItem> {
    const points: Array<HistoryItem> = [];
    let currentStatus = statuses.UNDEFINED;
    for (const point of sourceHistory) {
      if (point.dateTime >= endDate) {
        break;
      }
      if (point.dateTime >= startDate && point.status !== currentStatus) {
        points.push(point);
        currentStatus = point.status;
      }
    }
    if (points[0].dateTime !== startDate) {
      const item = new HistoryItem();
      item.source = source;
      item.dateTime = startDate;
      item.status = statuses.UNDEFINED;
      points.unshift(item);
    }
    return points;
  }
}
