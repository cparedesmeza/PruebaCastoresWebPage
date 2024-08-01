import { Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import { Link } from '../../models/links';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrl: './busqueda.component.css'
})
export class BusquedaComponent implements OnInit {
  @Input() idVideo: any;
  @Output() marcarFavorita = new EventEmitter;
  
  public busqueda:Link;
  
  constructor(){
    this.busqueda = {title: '', date:'', url:'', description:''}
  }
  ngOnInit() {
    this.busqueda = {
      title: this.idVideo.snippet.title,
      date: this.idVideo.snippet.publishTime,
      url: this.idVideo.id.videoId,
      description: this.idVideo.snippet.description
    }
  }

  
  elegirFavorita(event:Event, id=this.idVideo){
     this.marcarFavorita.emit({
        item:id
     })
  }
}
