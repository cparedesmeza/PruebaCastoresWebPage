import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.services';

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
      alert('Formulario Enviado')
      this._userService.login(this.form).subscribe(res=>{
      if(res.message == 'success'){
          this._router.navigate(['/home/' + res.results[0].id_usuario]) 
        }
      });
    }
}
