import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarritoComprasComponent } from './componentes/carrito-compras/carrito-compras.component';
import { HomeComponent } from './componentes/home/home.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'carritoCompra', component: CarritoComprasComponent },
  
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
