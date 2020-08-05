import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'clientes',
    loadChildren: () => import('./modules/clients/clients.module').then(m => m.ClientsModule)
  },
  {
    path: '',
    redirectTo: 'clientes',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
