import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyQuotationsComponent } from './quotation/my-quotations/my-quotations.component';
import { NewQuotationsComponent } from './quotation/new-quotations/new-quotations.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'quotations', component: MyQuotationsComponent },
      { path: 'quotations/create', component: NewQuotationsComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }


