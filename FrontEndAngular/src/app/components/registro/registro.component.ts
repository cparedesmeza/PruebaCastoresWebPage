import { Component } from '@angular/core';
import { Users } from '../../models/users';
import { UserService } from '../../services/user.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
    public form:Users;
    
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
        estatus:'Activo'
      }
    }

    onSubmit =(e:Event)=>{
      e.preventDefault();
      this._usersService.NewUser(this.form).subscribe(res=>{
        if(res.message == 'success'){
          alert('Usuario creado')
          this._router.navigate(['login']);
        }
      })
    }
}
