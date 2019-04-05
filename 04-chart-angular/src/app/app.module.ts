import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChartsModule } from 'ng2-charts';


import { AppComponent } from './app.component';
import { ChartComponent } from './components/chart/chart.component';

const config: SocketIoConfig = {
  url: 'http://localhost:5000',
  options: {}
};

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
