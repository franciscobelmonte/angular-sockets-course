import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../../services/websocket.service';

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

  constructor(public http: HttpClient, public wsService: WebsocketService) { }

  ngOnInit() {
    this.getData();
    this.listenSocket();
  }

  getData() {
    this.http.get('http://localhost:5000/chart').subscribe(response => {
      this.lineChartData = response.chart;
    });
  }

  listenSocket() {
    this.wsService.listen('change-data').subscribe(response => {
      this.lineCharData = response.chart;
    })
  }

}
