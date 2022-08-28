import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "auth" , loadChildren:()=>import("./auth/auth.module").then(m => m.AuthModule)},
  {path: "error" , loadChildren:()=> import("./error/error.module").then(m=> m.ErrorModule)},
  {path: "", loadChildren:() => import("./app/app.module").then(m => m.AppModule)},
  {path: "**" , redirectTo: "./error/not-found"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
