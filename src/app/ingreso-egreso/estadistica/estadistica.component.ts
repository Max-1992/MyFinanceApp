import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../ingreso-egreso.model';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { IgEgAppState } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  ingresos: number;
  egresos: number;

  cuantosIngresos: number;
  cuantosEgresos: number;

  Subscription: Subscription;

  public doughnutChartLabels: Label[] = ['Ingreso', 'Egresos'];
  public doughnutChartData: MultiDataSet = [];
  public doughnut: ChartType = 'doughnut';

  constructor( private store: Store<IgEgAppState> ) { }

  ngOnInit() {
    this.Subscription = this.store.select('igrensoEgreso')
                                  .subscribe( ingresEgres => {
                                    console.log('ingresoEgreso', ingresEgres.items)
                                    this.contarIngresoEgreso( ingresEgres.items )
                                  })                     
  }

  contarIngresoEgreso( items: IngresoEgreso[] ) {
    this.ingresos = 0;
    this.egresos = 0;
    this.cuantosEgresos = 0;
    this.cuantosIngresos = 0;

    items.forEach( item => {
        if( item.type === 'ingreso' ) {
          this.cuantosIngresos ++;
          this.ingresos += item.quantity
        } else {
          this.cuantosEgresos ++;
          this.egresos += item.quantity
        }
    });

    this.doughnutChartData = [ [this.ingresos, this.egresos] ];
   
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}
