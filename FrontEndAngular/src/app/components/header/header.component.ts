import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global';
import { UserService } from '../../services/user.services';
import { Users } from '../../models/users';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  public id_usuario: string = '';
  public url: string = Global.url;
  public usuario: Users;
  constructor(
    private _route: ActivatedRoute,
    private userService: UserService,
  ){
    this.usuario = {
      id_usuario: '',
      nombre: '',
      apellido: '',
      usuario: '',
      correo: '',
      password: '',
      newpassword: '',
      estatus: ''
    }
  }
  ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
      this.id_usuario = params['id'];
    });
    this.userService.getUser(this.id_usuario).subscribe(res => {
      if (res.message == 'success') {
        this.usuario = res.results[0];
      }
    })
  }
}
