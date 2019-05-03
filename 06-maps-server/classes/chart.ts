export class ChartData {
  private months: string[] = ['January', 'February', 'March', 'April'];
  private values: string[] = [1, 2, 3, 4];

  constructor(){

  }

  getChartData() {
      return [
          {data: this.values, label: 'Viewings'}
      ];
  }

  incrementValue(month: string, value: number) {
      month = month.toLowerCase().trim();
      for(let i in this.months){
          if(this.months[i] === month){
              this.values[i] += value;
          }
      }

      return this.getChartData();
  }
}