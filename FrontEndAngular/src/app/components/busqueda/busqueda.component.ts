import { Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import { Link } from '../../models/links';
import { UserService } from '../../services/user.services';
import { ActivatedRoute,Params} from '@angular/router';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrl: './busqueda.component.css'
})
export class BusquedaComponent implements OnInit {
  @Input() idVideo: any;
  @Output() marcarFavorita = new EventEmitter;
  
  public user:any;
  public busqueda:Link;
  public id_usuario: string = '';
  
  constructor(
    private userService: UserService,
    private _route: ActivatedRoute,
  ){
    this.busqueda = {title: '', date:'', url:'', description:'',correo:''}
  }
  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.id_usuario = params['id'];
    });
    this.userService.getUser(this.id_usuario).subscribe(res=>{
      if(res.message ==='success'){
          
         this.busqueda = {
          title: this.idVideo.snippet.title,
          date: this.idVideo.snippet.publishTime,
          url: this.idVideo.id.videoId,
          description: this.idVideo.snippet.description,
          correo: res.results[0].correo,
        }
         
      }
    });
  }

  
  elegirFavorita(event:Event, id=this.idVideo){
     this.marcarFavorita.emit({
        item:id
     })
     
  }
}
