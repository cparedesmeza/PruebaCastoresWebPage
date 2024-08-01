import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Global } from "./global";
import { Link } from "../models/links";

@Injectable()
export class youtubeService{
    public url : string;
    constructor( private _http:HttpClient){
        this.url = Global.url;
    }
    searchYoutube(search:string):Observable<any> {
        const apiKey = 'AIzaSyAiI2t2c1vWIrubs66bcA5aPaawxIL6lrA';
        const query = search;
        const maxResults = 5;

        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&key=${apiKey}`;

        return this._http.get(url)
    }
    newFavorita(favorita:Link):Observable<any>{
        let params = JSON.stringify(favorita);
        let headers = new HttpHeaders().set('Content-Type','application/json')
        return  this._http.post(this.url +'NewRegister',params,{headers:headers});
    }
    getFavorita():Observable<any>{
        return this._http.get(this.url + 'getRegister')
    }
    deleteFavorita(id:string):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.delete(this.url + 'deleteRegister/'+id,{headers:headers});
    }
}