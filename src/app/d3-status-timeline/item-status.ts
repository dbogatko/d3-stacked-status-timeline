export class ItemStatus {
  name: string;
  color: string;

  constructor(name: string, color: string) {
    this.name = name;
    this.color = color;
  }
}

export const statuses = {
  BLUE: new ItemStatus('BLUE', '#AED6F1'),
  GREEN: new ItemStatus('GREEN', '#A3E4D7'),
  RED: new ItemStatus('RED', '#F1948A'),
  UNDEFINED: new ItemStatus('UNDEFINED', '#D5DBDB'),
};
