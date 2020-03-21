import { Actions, ACTIVAR_LOADING, DESACTIVAR_LOADING } from '../actions/ui.actions';

// Crear la interfaz de nuestro Estado inicial
export interface State {
    isLoading: boolean;
}

// Creamos nuestro Estado inicial
const initState: State = {
    isLoading: false
}

// Declaramos nuestro Reducer
export function uiReducer( state = initState, action: Actions ) {

    switch (action.type) {
        case ACTIVAR_LOADING:
            return {
                ...state,
                isLoading: true
                
            };
      
        case DESACTIVAR_LOADING:
            return {
                ...state,
                isLoading: false
            };

        default:
            return state
    }
}