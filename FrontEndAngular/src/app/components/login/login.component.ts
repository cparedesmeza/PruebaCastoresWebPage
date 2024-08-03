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
           this._userService.newHistorial(res.results[0]).subscribe(res=>{
           if(res.message= 'success'){
              console.log('datos guardados');
           }
        })
        Swal.fire({
          title: "Login realizado",
          text: "Bienvenido!",
          icon: "success"
        })
        
        this._router.navigate(['/home/' + res.results[0].id_usuario]) 
      }else{
        Swal.fire({
          title: "Login no realizado",
          text: "Usuario o contraseña incorrectos",
          icon: "error"
        })
      }
      });
    }
}
