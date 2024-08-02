import { Component,OnInit } from '@angular/core';
import { UserService } from '../../services/user.services';


@Component({
  selector: 'app-monitoreo',
  templateUrl: './monitoreo.component.html',
  styleUrl: './monitoreo.component.css'
})
export class MonitoreoComponent implements OnInit{

  public register: any;
  constructor(
    private userService: UserService
  ){
    this.register = {
      nombre: '',
      usuario: '',
      correo: '',
      fecha_hora: '',
    }
  }
  
  ngOnInit() {
    this.userService.getHistorial().subscribe(res=>{
      if(res.message === 'success'){
          this.register = res.results;
      }
    })
  }
}
