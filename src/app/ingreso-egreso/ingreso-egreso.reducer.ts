import { IngresoEgreso } from './ingreso-egreso.model';
import { Actions, SET_ITEMS, UNSET_ITEMS } from './ingreso-egreso.actions';
import { AppState } from '../app.reducer';


// Crear la interfaz de nuestro Estado inicial
export interface IngresoEgresoState {
    items: IngresoEgreso[]
}

// Extendemos el AppState de nuestra aplicacion para la carga dinamica.
export interface IgEgAppState extends AppState {
     igrensoEgreso: IngresoEgresoState;
}

// Creamos nuestro Estado inicial
const initState = {
    items: []
}


// Declaramos nuestro Reducer
export function IngresoEgresoReducer( state = initState, action: Actions ): IngresoEgresoState {

    switch (action.type) {
        case SET_ITEMS:
                return {
                    items: [
                        ...action.items.map( item => {
                            return {
                                ...item
                            };
                        })
                    ]          
                }
        
        case UNSET_ITEMS:
            return {
                items: []
            };
    
        default:
           return state;
    }

}