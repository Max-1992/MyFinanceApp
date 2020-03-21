// Este es el archivo Global que tiene toda la definicion del Estado de nuestra aplicación.

// Permite trabajar con varios reducers en simultaneo
import { ActionReducerMap } from '@ngrx/store';

// importacion de Reducers
import * as fromUI from './shared/reducers/ui.reducer';
import * as fromAuth from './auth/auth.reducer';



export interface AppState {
    ui: fromUI.State;
    auth: fromAuth.AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: fromUI.uiReducer,
    auth: fromAuth.authReducer,
};