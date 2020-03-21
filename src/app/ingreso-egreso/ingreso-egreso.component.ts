import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ActivarLoadingActions, DesactivarLoadingActions } from '../shared/actions/ui.actions';
import { IgEgAppState } from './ingreso-egreso.reducer';


@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  form: FormGroup;
  tipo: string = 'ingreso';
  ingresoEgreso: IngresoEgreso;
  loading: boolean;
  subscription: Subscription = new Subscription();

  
  constructor( 
        private formbuilder: FormBuilder,
        private ingresoEgresoServices: IngresoEgresoService,
        private store: Store<IgEgAppState>
      ) { 
    this.buildForm();
  }

  ngOnInit() {
    this.subscription = this.store.select('ui')
                                  .subscribe( state => this.loading = state.isLoading );
  }

  crearIngresoEgreso() {
    this.ingresoEgreso = new IngresoEgreso({ ...this.form.value, type: this.tipo });
    const action: ActivarLoadingActions = new ActivarLoadingActions();
    this.store.dispatch( action );

    this.ingresoEgresoServices.crearIngresoEgreso(this.ingresoEgreso)
                              .then( (data) => {
                                const action: DesactivarLoadingActions = new DesactivarLoadingActions();
                                this.store.dispatch( action );
                                Swal.fire('Creado', this.ingresoEgreso.description, 'success');
                                this.resetBuildForm();
                              })
                              .catch( err => {
                                console.error(err);
                              });
    
  }

  resetBuildForm() {
    this.form.reset();
  }

  private buildForm() {
    this.form = this.formbuilder.group({
      description: ['', [Validators.required] ],
      quantity: [0, [Validators.min(0), Validators.required] ]
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
