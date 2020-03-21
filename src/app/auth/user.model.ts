interface UInterface {
    nombre: string;
    email: string;
    password?: string;
    uid?: string;
  }


export class User implements UInterface {

    public nombre: string;
    public email: string;
    public password?: string;
    public uid?: string;

    constructor( obj?: any ) {
      this.nombre = obj && obj.nombre || null;
      this.uid = obj && obj.uid || null;
      this.email = obj &&  obj.email || null;
    };
}