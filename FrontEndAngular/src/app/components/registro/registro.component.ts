import { Component } from '@angular/core';
import { Users } from '../../models/users';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
    public form:Users;
    
    constructor(){
      
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
      console.log(this.form)
    }
}
