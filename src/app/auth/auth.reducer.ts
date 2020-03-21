import { User } from './user.model';
import { Actions, SET_USER, UNSET_USER } from './auth.actions';


// Crear la interfaz de nuestro Estado inicial
export interface AuthState {
   user: User
}

// Creamos nuestro Estado inicial
const initState: AuthState = {
    user: null
}

// Declaramos nuestro Reducer
export function authReducer( state = initState, action: Actions ): AuthState {
    
    switch (action.type) {
        case SET_USER:          
            return {
                user: {
                    ...action.user
                }
            };

        case UNSET_USER:          
            return {
                user: null
            };
    
        default:
            return state;
    }
}