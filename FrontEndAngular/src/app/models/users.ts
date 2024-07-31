export class Users{
    constructor(
        public id_usuario:string,
        public nombre: string,
        public apellido: string,
        public usuario: string,
        public email: string,
        contrasena: string,
        newcontrasena: string,
        estatus: string
    ){}
}