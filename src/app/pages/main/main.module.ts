import { ExcelService } from './../../services/excel.service';
import { FooterComponent } from './../../components/layout/footer/footer.component';
import { NavbarComponent } from './../../components/layout/navbar/navbar.component';
import { InfoHomeComponent } from './../../components/shared/info-home/info-home.component';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main.routing.module';
import { AngularMaterialModule } from '../../modules/angular-material.module';
import { SharedModule } from '../../modules/shared.module';
import { TranslateModule} from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [MainComponent,InfoHomeComponent,NavbarComponent,FooterComponent],
  imports: [
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MainRoutingModule,
    SharedModule,
    AngularMaterialModule                             
  ],
  providers:[
    ExcelService
  ]
})
export class MainModule { }
