export class Users{
    constructor(
        public id_usuario:string,
        public nombre: string,
        public apellido: string,
        public usuario: string,
        public correo: string,
        public password: string,
        public newpassword: string,
        public estatus: string,
        recaptchaToken?: string
    ){}
}