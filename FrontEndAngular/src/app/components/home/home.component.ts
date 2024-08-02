import { Component, OnInit} from '@angular/core';
import { ActivatedRoute,Params} from '@angular/router';
import { Global } from '../../services/global';
import { youtubeService } from '../../services/youtube.services';
import { UserService } from '../../services/user.services';
import { Link } from '../../models/links';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  public texto: any;
  public id_usuario: string = '';
  public url: string = Global.url;
  public favorita: Link;
  public user: any;


  constructor(
    private _route: ActivatedRoute,
    private youtubeService: youtubeService,
    private userService: UserService,
  ) {
    this.texto = {
      input: '',
      idVideo: '',
    }
    this.favorita = {title: '', date:'', url:'', description:'',correo:''}
  }
  ngOnInit(){
    this._route.params.subscribe((params: Params) => {
      this.id_usuario = params['id'];
    });
    
  } 
  
  onsubmit(e: Event) {
    e.preventDefault();
    this.youtubeService.searchYoutube(this.texto.input).subscribe(res => {
      this.texto.idVideo = res.items;
    })
  }

  mostrarFavorita(event:{item:Link}){
      this.favorita = event.item;
      console.log(this.favorita)
      this.youtubeService.newFavorita(this.favorita).subscribe(res=>{
        console.log(res)
      })
  }
}
