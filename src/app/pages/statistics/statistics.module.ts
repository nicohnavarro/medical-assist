import { PieComponent } from './../../components/highcharts/pie/pie.component';
import { BarComponent } from './../../components/highcharts/bar/bar.component';
import { ColumnComponent } from './../../components/highcharts/column/column.component';
import { PieChartComponent } from './../../components/charts/pie-chart/pie-chart.component';
import { HeatMapCalendarComponent } from './../../components/charts/heat-map-calendar/heat-map-calendar.component';
import { VerticalBarComponent } from './../../components/charts/vertical-bar/vertical-bar.component';
import { StatisticsRoutingModule } from './statistics.routing.module';
import { AngularMaterialModule } from '../../modules/angular-material.module';
import { SharedModule } from '../../modules/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { StatisticsComponent } from "./statistics.component";
import { NgModule } from '@angular/core';                                          
import { ChartModule , HIGHCHARTS_MODULES } from 'angular-highcharts';
import exporting from 'highcharts/modules/exporting.src.js'
export function highchartModules(){
  return [exporting]
}
@NgModule({
  declarations: [StatisticsComponent,VerticalBarComponent,HeatMapCalendarComponent,PieChartComponent,ColumnComponent,BarComponent,PieComponent],
  imports: [
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    StatisticsRoutingModule,
    SharedModule,
    AngularMaterialModule,
    ChartModule
  ],
  providers: [  {provide:HIGHCHARTS_MODULES,useFactory:highchartModules} ],
})
export class StatisticsModule { }