import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81], label: 'Viewings' },
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April'];

  constructor() { }

  ngOnInit() {
    setInterval(() => {
      const newData = [
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100)
      ];
      this.lineChartData = [
        { data: newData, label: 'Viewings' }
      ];
    }, 3000);
  }

}
