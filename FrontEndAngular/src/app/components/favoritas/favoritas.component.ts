import { Component, OnInit} from '@angular/core';
import { youtubeService } from '../../services/youtube.services';
import { UserService } from '../../services/user.services';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-favoritas',
  templateUrl: './favoritas.component.html',
  styleUrl: './favoritas.component.css'
})
export class FavoritasComponent implements OnInit{

  public register: any;
  public id: string;
  public user:any;
  constructor(
    private youtubeService: youtubeService,
    private _router : Router,
    private _route: ActivatedRoute,
    private userService: UserService,
  ){
    this.register = {title:'', description:'',date:'',url:''}
    this.id = '';
  }
  ngOnInit(){
    this._route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.userService.getUser(this.id).subscribe(res=>{
      if(res.message === 'success'){
         this.user = res.results[0];
         this.youtubeService.getFavorita(this.user).subscribe(res=>{
          if(res.message === 'success'){
             this.register = res.results;
          }
          });
      }
    });
    
  }
  seleccionarFavorita(event:Event, id= this.register){
    this.youtubeService.deleteFavorita(id).subscribe(res=>{
      if(res.message === 'Video eliminado de favoritos'){
        Swal.fire({
          title: "Registro de video deseleccionado",
          text: "Ya no es de tus favoritos",
          icon: "success"
        })
        this._router.navigate(['/home/' + this.id]) 
      }
    })
  }
}
