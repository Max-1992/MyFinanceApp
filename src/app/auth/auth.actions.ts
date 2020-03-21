import { Action } from '@ngrx/store';
import { User } from './user.model';

// Declaramos acciones
export const SET_USER = '[Auth] Set User';
export const UNSET_USER = '[Auth] Unset User';

// Creamos las acciones
export class SetUserAction implements Action {
    readonly type = SET_USER;

    constructor( public user: User ) {}
}

export class UnSetUserAction implements Action {
    readonly type = UNSET_USER;
}

// Declaramos el tipo de acciones permitidas en nuestro reducer.
export type Actions = SetUserAction | UnSetUserAction;