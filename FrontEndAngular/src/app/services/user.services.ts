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
    prueba(){
        console.log("soy el servicio de articles");
    }
    login(user: Users):Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type','application/json')
        return  this._http.post(this.url +'login',params,{headers:headers});
    }
}