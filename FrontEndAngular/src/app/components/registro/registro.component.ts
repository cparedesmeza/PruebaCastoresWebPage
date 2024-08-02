import { Component } from '@angular/core';
import { UserService } from '../../services/user.services';
import { Router } from '@angular/router';

declare var grecaptcha: any;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
    public form:any;
    
    constructor(
       private _usersService: UserService,
       private _router: Router,
    ){
     
      this.form = {
        id_usuario:'',
        nombre:'',
        apellido:'',
        usuario:'',
        correo:'',
        password:'',
        newpassword:'',
        estatus:'',
        recaptchaToken: ''
      }
    }

    onSubmit =(e:Event)=>{
      e.preventDefault();
      grecaptcha.ready(() => {
        grecaptcha.execute('6LeTlB0qAAAAAFywzKvdZLVqDEIti2JOCD01x8hE', { action: 'submit' }).then((token: string) => {
          this.form.recaptchaToken = token;
          // Enviar el formulario al backend después de obtener el token
          this._usersService.NewUser(this.form).subscribe(res => {
            console.log(res)
            if (res.message == 'success') {
              alert('Usuario Creado, Bienvenido a la comunidad')
              this._router.navigate(['login']);
            }
          });
        });
      });
    }
}
