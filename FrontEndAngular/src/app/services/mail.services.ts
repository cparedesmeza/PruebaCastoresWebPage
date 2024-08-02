import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Global } from "./global";

@Injectable()
export class mailServices{
    
    public url : string;
    
    constructor( private _http:HttpClient){
        this.url = Global.url;
    }

    sendMail(correo:string):Observable<any>{
        let params = JSON.stringify(correo);
        let headers = new HttpHeaders().set('Content-Type','application/json')
        return this._http.post(this.url+'sendMail',params,{headers:headers});
    }
}