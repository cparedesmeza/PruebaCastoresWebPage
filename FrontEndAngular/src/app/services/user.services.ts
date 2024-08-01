import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Global } from "./global";
import { Users } from "../models/users";

@Injectable()
export class UserService{

    public url: string;

    constructor(
        private _http:HttpClient
    ){
        this.url = Global.url;
    }

    login(user: Users):Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type','application/json')
        return  this._http.post(this.url +'login',params,{headers:headers});
    }
    NewUser(user: Users):Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type','application/json')
        return  this._http.post(this.url +'NewUser',params,{headers:headers});
    }
    getUser(id_usuario:string):Observable<any>{
        return this._http.get(this.url+'getUser/'+id_usuario);
    }
    searchYoutube():Observable<any> {
        const apiKey = 'AIzaSyAiI2t2c1vWIrubs66bcA5aPaawxIL6lrA';
        const query = 'programación en JavaScript';
        const maxResults = 5;

        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&key=${apiKey}`;

        return this._http.get(url)
    }
}