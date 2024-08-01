import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Global } from '../../services/global';
import { youtubeService } from '../../services/youtube.services';
import { Link } from '../../models/links';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  public texto: any;
  public id_usuario: string = '';
  public url: string = Global.url;
  public favorita: Link;


  constructor(
    private _route: ActivatedRoute,
    private youtubeService: youtubeService
  ) {
    this.texto = {
      input: '',
      idVideo: '',
    }
    this.favorita = {title: '', date:'', url:'', description:''}
  }
    
  
  onsubmit(e: Event) {
    e.preventDefault();
    this.youtubeService.searchYoutube(this.texto.input).subscribe(res => {
      this.texto.idVideo = res.items;
    })
  }

  mostrarFavorita(event:{item:Link}){
      this.favorita = event.item;
      this.youtubeService.newFavorita(this.favorita).subscribe(res=>{
        console.log(res)
      })
  }
}
