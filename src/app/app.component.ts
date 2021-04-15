import { Component, OnInit } from '@angular/core';
import { HistoryItem } from './d3-status-timeline/history-item';
import { statuses } from './d3-status-timeline/item-status';
import { TimelineChart } from './d3-status-timeline/timeline-chart';
import { TimelineConfiguration } from './d3-status-timeline/timeline-configuration';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const configuration: TimelineConfiguration = {
      width: 1000,
      fontSize: 12,
      font: 'calibri',
      rowHeight: 40,
      rowPadding: 2,
      tickSize: 10,
      tickPadding: 2.5,
      tickColor: '#808181',
      tickIntervalMins: 60,
      onClickRect: (item) => this.clickOnRect(item),
    };

    const timelineChart = new TimelineChart(configuration);
    timelineChart.draw(
      '#chart-timeline',
      history,
      new Date(2021, 4, 9, 0, 0),
      new Date(2021, 4, 10, 3, 0)
    );
  }

  private clickOnRect(item: HistoryItem): void {
    console.log(
      'Click by: ' + `${item.source}::${item.status.name}::${item.dateTime}`
    );
  }
}

const history: HistoryItem[] = [
  {
    source: 'System 1',
    status: statuses.BLUE,
    dateTime: new Date(2021, 4, 9, 10, 0),
  },
  {
    source: 'System 1',
    status: statuses.BLUE,
    dateTime: new Date(2021, 4, 9, 11, 0),
  },
  {
    source: 'System 1',
    status: statuses.BLUE,
    dateTime: new Date(2021, 4, 9, 11, 30),
  },
  {
    source: 'System 1',
    status: statuses.GREEN,
    dateTime: new Date(2021, 4, 9, 12, 0),
  },
  {
    source: 'System 1',
    status: statuses.GREEN,
    dateTime: new Date(2021, 4, 9, 13, 0),
  },
  {
    source: 'System 1',
    status: statuses.RED,
    dateTime: new Date(2021, 4, 9, 14, 0),
  },
  {
    source: 'System 1',
    status: statuses.RED,
    dateTime: new Date(2021, 4, 9, 15, 0),
  },
  {
    source: 'System 1',
    status: statuses.GREEN,
    dateTime: new Date(2021, 4, 10, 15, 0),
  },

  // system 2

  {
    source: 'System 2',
    status: statuses.BLUE,
    dateTime: new Date(2021, 4, 9, 2, 0),
  },
  {
    source: 'System 2',
    status: statuses.BLUE,
    dateTime: new Date(2021, 4, 9, 7, 0),
  },
  {
    source: 'System 2',
    status: statuses.BLUE,
    dateTime: new Date(2021, 4, 9, 11, 30),
  },
  {
    source: 'System 2',
    status: statuses.GREEN,
    dateTime: new Date(2021, 4, 9, 14, 0),
  },
  {
    source: 'System 2',
    status: statuses.GREEN,
    dateTime: new Date(2021, 4, 9, 18, 0),
  },
  {
    source: 'System 2',
    status: statuses.RED,
    dateTime: new Date(2021, 4, 9, 22, 0),
  },
  {
    source: 'System 2',
    status: statuses.RED,
    dateTime: new Date(2021, 4, 9, 23, 0),
  },
  {
    source: 'System 2',
    status: statuses.GREEN,
    dateTime: new Date(2021, 4, 10, 15, 0),
  },

  // system 3

  {
    source: 'System 3',
    status: statuses.BLUE,
    dateTime: new Date(2021, 4, 9, 2, 0),
  },
  {
    source: 'System 3',
    status: statuses.BLUE,
    dateTime: new Date(2021, 4, 9, 7, 0),
  },

  {
    source: 'System 3',
    status: statuses.GREEN,
    dateTime: new Date(2021, 4, 9, 14, 0),
  },

  {
    source: 'System 3',
    status: statuses.RED,
    dateTime: new Date(2021, 4, 9, 22, 0),
  },

  {
    source: 'System 3',
    status: statuses.GREEN,
    dateTime: new Date(2021, 4, 9, 23, 0),
  },

  // System 4

  {
    source: 'System 4',
    status: statuses.BLUE,
    dateTime: new Date(2021, 4, 9, 2, 0),
  },
  {
    source: 'System 4',
    status: statuses.BLUE,
    dateTime: new Date(2021, 4, 9, 7, 0),
  },

  {
    source: 'System 4',
    status: statuses.GREEN,
    dateTime: new Date(2021, 4, 9, 14, 0),
  },

  {
    source: 'System 4',
    status: statuses.RED,
    dateTime: new Date(2021, 4, 9, 22, 0),
  },

  {
    source: 'System 4',
    status: statuses.GREEN,
    dateTime: new Date(2021, 4, 9, 23, 0),
  },

  // System 5

  {
    source: 'System 5',
    status: statuses.BLUE,
    dateTime: new Date(2021, 4, 9, 2, 0),
  },
  {
    source: 'System 5',
    status: statuses.BLUE,
    dateTime: new Date(2021, 4, 9, 7, 0),
  },

  {
    source: 'System 5',
    status: statuses.GREEN,
    dateTime: new Date(2021, 4, 9, 14, 0),
  },

  {
    source: 'System 5',
    status: statuses.RED,
    dateTime: new Date(2021, 4, 9, 22, 0),
  },

  {
    source: 'System 5',
    status: statuses.GREEN,
    dateTime: new Date(2021, 4, 9, 23, 0),
  },

  // System 6

  {
    source: 'System 6',
    status: statuses.BLUE,
    dateTime: new Date(2021, 4, 9, 2, 30),
  },
  {
    source: 'System 6',
    status: statuses.BLUE,
    dateTime: new Date(2021, 4, 9, 7, 0),
  },
  {
    source: 'System 6',
    status: statuses.BLUE,
    dateTime: new Date(2021, 4, 9, 11, 30),
  },
  {
    source: 'System 6',
    status: statuses.GREEN,
    dateTime: new Date(2021, 4, 9, 14, 30),
  },
  {
    source: 'System 6',
    status: statuses.GREEN,
    dateTime: new Date(2021, 4, 9, 18, 0),
  },
  {
    source: 'System 6',
    status: statuses.RED,
    dateTime: new Date(2021, 4, 9, 22, 0),
  },
  {
    source: 'System 6',
    status: statuses.RED,
    dateTime: new Date(2021, 4, 9, 23, 0),
  },
  {
    source: 'System 6',
    status: statuses.GREEN,
    dateTime: new Date(2021, 4, 10, 15, 0),
  },

  {
    source: 'System 7',
    status: statuses.BLUE,
    dateTime: new Date(2021, 4, 9, 10, 30),
  },
  {
    source: 'System 7',
    status: statuses.BLUE,
    dateTime: new Date(2021, 4, 9, 11, 30),
  },
  {
    source: 'System 7',
    status: statuses.BLUE,
    dateTime: new Date(2021, 4, 9, 11, 30),
  },
  {
    source: 'System 7',
    status: statuses.GREEN,
    dateTime: new Date(2021, 4, 9, 12, 0),
  },
  {
    source: 'System 7',
    status: statuses.GREEN,
    dateTime: new Date(2021, 4, 9, 13, 0),
  },
  {
    source: 'System 7',
    status: statuses.RED,
    dateTime: new Date(2021, 4, 9, 14, 0),
  },
  {
    source: 'System 7',
    status: statuses.RED,
    dateTime: new Date(2021, 4, 9, 15, 30),
  },
  {
    source: 'System 7',
    status: statuses.GREEN,
    dateTime: new Date(2021, 4, 10, 15, 30),
  },

  {
    source: 'System 8',
    status: statuses.BLUE,
    dateTime: new Date(2021, 4, 9, 8, 15),
  },
  {
    source: 'System 8',
    status: statuses.BLUE,
    dateTime: new Date(2021, 4, 9, 11, 30),
  },
  {
    source: 'System 8',
    status: statuses.BLUE,
    dateTime: new Date(2021, 4, 9, 11, 30),
  },
  {
    source: 'System 8',
    status: statuses.GREEN,
    dateTime: new Date(2021, 4, 9, 10, 0),
  },
  {
    source: 'System 8',
    status: statuses.GREEN,
    dateTime: new Date(2021, 4, 9, 13, 0),
  },
  {
    source: 'System 8',
    status: statuses.RED,
    dateTime: new Date(2021, 4, 9, 11, 0),
  },
  {
    source: 'System 8',
    status: statuses.RED,
    dateTime: new Date(2021, 4, 9, 15, 30),
  },
  {
    source: 'System 8',
    status: statuses.GREEN,
    dateTime: new Date(2021, 4, 10, 12, 30),
  },
];
