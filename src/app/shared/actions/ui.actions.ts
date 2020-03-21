import { Action } from '@ngrx/store';

// Declaramos acciones
export const ACTIVAR_LOADING = '[UI Loading] Cargando...';
export const DESACTIVAR_LOADING = '[UI Loading] Fin de carga...';

// Creamos las acciones
export class ActivarLoadingActions implements Action {
    readonly type = ACTIVAR_LOADING;
}

export class DesactivarLoadingActions implements Action {
    readonly type = DESACTIVAR_LOADING;
}

// Declaramos el tipo de acciones permitidas en nuestro reducer.
export type Actions = ActivarLoadingActions |
                      DesactivarLoadingActions;