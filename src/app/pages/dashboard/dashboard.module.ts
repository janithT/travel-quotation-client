import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';

import { MyQuotationsComponent } from './quotation/my-quotations/my-quotations.component';
import { NewQuotationsComponent } from './quotation/new-quotations/new-quotations.component';


@NgModule({
  declarations: [
    HomeComponent,
    MyQuotationsComponent,
    NewQuotationsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    SharedModule
  ]
})
export class DashboardModule { }
