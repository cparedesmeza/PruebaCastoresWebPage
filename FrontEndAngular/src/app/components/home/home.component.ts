import { Component, OnInit} from '@angular/core';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { Global } from '../../services/global';
import { UserService } from '../../services/user.services';
import { Users } from '../../models/users';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  public id_usuario: string = '';
  public url: string = Global.url;
  public usuario: Users;
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private userService : UserService,
  ){
    this.usuario = {
        id_usuario:'',
        nombre:'',
        apellido:'',
        usuario:'',
        correo:'',
        password:'',
        newpassword:'',
        estatus:''
    }
  }
  ngOnInit(){
    this._route.params.subscribe((params:Params) =>{
      this.id_usuario = params['id'];
    });
    this.userService.getUser(this.id_usuario).subscribe(res=>{
      if(res.message == 'success'){
        this.usuario = res.results[0];
      }
    })

  }
  
}
