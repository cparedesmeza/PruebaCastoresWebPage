import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public form:any;
  constructor(
    private _userService: UserService,
    private _router: Router,
  ){
    this.form = {
      usuario:'',
      correo:'',
      password:'',
    }
  }
  onSubmit =(e:Event)=>{
    e.preventDefault();
    if(this.form.usuario.includes('@')){
        this.form.correo = this.form.usuario;
    }      
      this._userService.login(this.form).subscribe(res=>{
      if(res.message == 'success'){
          Swal.fire({
            title: "Log in realizado",
            text: "Bienvenido de nuevo",
            icon: "success"
          });
          this._router.navigate(['/home/' + res.results[0].id_usuario]) 
      }else{
        Swal.fire({
          title: "Log in no realizado",
          text: "Usuario o password incorrectos",
          icon: "error"
        });
      }
      });
    }
}
