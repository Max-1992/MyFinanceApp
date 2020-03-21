
export class IngresoEgreso {
    description: string;
    quantity: number;
    type: string;
    uid?: string;

    constructor( obj ) {
        this.description = obj && obj.description || null;
        this.quantity = obj && obj.quantity || null;
        this.type = obj && obj.type || null;
        // this.uid = obj && obj.uid || null;
    }

}