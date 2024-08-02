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
    newHistorial(user: Users):Observable<any>{
        console.log(user)
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type','application/json')
        return  this._http.post(this.url +'newHistory',params,{headers:headers});
    }
    getHistorial():Observable<any>{
        return this._http.get(this.url+'getHistory');
    }


}