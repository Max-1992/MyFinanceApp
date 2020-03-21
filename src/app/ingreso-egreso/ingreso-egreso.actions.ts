import { Action } from '@ngrx/store';
import { IngresoEgreso } from './ingreso-egreso.model';

// Declaramos acciones
export const SET_ITEMS = '[Ingreso Egreso] Set Items';
export const UNSET_ITEMS =  '[Ingreso Egreso] Unset Items';


// Creamos las acciones
export class SetItemsAction implements Action {
    readonly type = SET_ITEMS;

    constructor( public items: IngresoEgreso[] ) {}
}

export class UnsetItemsAction implements Action {
    readonly type = UNSET_ITEMS;

}

// Declaramos el tipo de acciones permitidas en nuestro reducer.
export type Actions = SetItemsAction |  UnsetItemsAction;