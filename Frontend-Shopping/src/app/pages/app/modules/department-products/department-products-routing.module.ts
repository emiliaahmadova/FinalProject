import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentProductsComponent } from './components/department-products/department-products.component';
import { DepartmentComponent } from './components/department/department.component';

const routes: Routes = [
  {
    path: '', component: DepartmentComponent, children: [
      { path: ':id', component: DepartmentProductsComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentProductsRoutingModule { }
