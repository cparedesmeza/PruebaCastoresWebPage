import { Component } from '@angular/core';
import { UserService } from '../../services/user.services';
import { mailServices } from '../../services/mail.services';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recupassword',
  templateUrl: './recupassword.component.html',
  styleUrl: './recupassword.component.css'
})
export class RecupasswordComponent {

  public form: any;
  constructor(
    private userService : UserService,
    private mailService : mailServices,
    private _router: Router,
  ){
    this.form = {
      correo : '',
      password:'',
      usuario:'',
      nombre:'',
    }
  }
  onSubmit(e:Event){
    e.preventDefault();
    this.userService.getUserByMail(this.form.correo).subscribe(res=>{
      if(res.message === 'success'){
        this.form.password = res.results[0].password;
        this.form.usuario = res.results[0].usuario;
        this.form.nombre = res.results[0].nombre;
        this.mailService.sendMail(this.form).subscribe(res=>{
          Swal.fire({
            title: "Correo Enviado",
            text: "Usuario existente",
            icon: "success"
          })
          
          this._router.navigate(['/login'])
        })
      }else{
        Swal.fire({
          title: "Correo no enviado",
          text: "Usuario inexistente",
          icon: "error"
        })
      }
    })
  }
}
