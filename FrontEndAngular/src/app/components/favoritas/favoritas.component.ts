import { Component, OnInit} from '@angular/core';
import { youtubeService } from '../../services/youtube.services';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-favoritas',
  templateUrl: './favoritas.component.html',
  styleUrl: './favoritas.component.css'
})
export class FavoritasComponent implements OnInit{

  public register: any;
  public id: string;
  constructor(
    private youtubeService: youtubeService,
    private _router : Router,
    private _route: ActivatedRoute,
  ){
    this.register = {title:'', description:'',date:'',url:''}
    this.id = '';
  }
  ngOnInit(){
    this.youtubeService.getFavorita().subscribe(res=>{
       if(res.message === 'success'){
          this.register = res.results;
       }
    });
    this._route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
  }
  seleccionarFavorita(event:Event, id= this.register){
    this.youtubeService.deleteFavorita(id).subscribe(res=>{
      if(res.message === 'Video eliminado de favoritos'){
        this._router.navigate(['/home/' + this.id]) 
      }
    })
  }
}
