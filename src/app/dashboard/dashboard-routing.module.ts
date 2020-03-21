import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Coponents
import { DashboardComponent } from './dashboard.component';
import { EstadisticaComponent } from '../ingreso-egreso/estadistica/estadistica.component';
import { DetalleComponent } from '../ingreso-egreso/detalle/detalle.component';
import { IngresoEgresoComponent } from '../ingreso-egreso/ingreso-egreso.component';


const routes: Routes = [
    {    
      path: '', 
      component: DashboardComponent,
      children: [
        { path: '', component: EstadisticaComponent },
        { path: 'finanzas', component: IngresoEgresoComponent },
        { path: 'detalle', component: DetalleComponent }
      ],
    }
]



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
