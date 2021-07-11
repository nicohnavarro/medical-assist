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

@NgModule({
  declarations: [StatisticsComponent,VerticalBarComponent,HeatMapCalendarComponent,PieChartComponent],
  imports: [
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    StatisticsRoutingModule,
    SharedModule,
    AngularMaterialModule                                               
  ]
})
export class StatisticsModule { }