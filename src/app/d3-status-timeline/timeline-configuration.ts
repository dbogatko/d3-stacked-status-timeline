import { HistoryItem } from './history-item';

export class TimelineConfiguration {
  public width = 1000;
  public font = 'sans-serif';
  public fontSize = 10;
  public rowHeight = 40;
  public rowPadding = 10;
  public tickSize = 10;
  public tickPadding = 2.5;
  public tickColor = '#D8DADB';
  public tickIntervalMins = 60;
  //TODO: might be better to move to the method 'draw' instead
  public onClickRect: (item: HistoryItem) => void;
}
