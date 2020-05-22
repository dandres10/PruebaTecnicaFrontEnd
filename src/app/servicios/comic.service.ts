import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import * as CryptoJS from 'crypto-js';
import { Comic } from '../clases/comic/Comic';
import { Usuario } from '../clases/usuario/Usuario';
import { Pedido } from '../clases/pepido/Pedido';
import { IRespuesta } from '../clases/Respuesta/IRespuesta';


@Injectable({
  providedIn: 'root'
})
export class ComicService {

  private ts: number;
  private hash: string;
  private hastMD5: any;





  constructor(private http: HttpClient) {


    this.ts = Date.now();
    this.hash = `${this.ts}${environment.privatekey}${environment.publickey}`;
    this.hastMD5 = CryptoJS.MD5(this.hash.toString());


  }


  headerPublic = new HttpHeaders({
    'Content-Type': 'application/json',

    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*'


  });



  getComics(): Observable<any> {
    let url: string = `http://gateway.marvel.com/v1/public/comics?ts=${this.ts}&apikey=${environment.publickey}&hash=${this.hastMD5}`;
    return this.http.get(url).pipe(map((resp: any) => resp.data.results));
  }

  getCreadoresComic(id: number): Observable<any> {
    let url: string = `http://gateway.marvel.com/v1/public/comics/${id}/creators?ts=${this.ts}&apikey=${environment.publickey}&hash=${this.hastMD5}`;
    return this.http.get(url).pipe(map((resp: any) => resp.data.results));
  }

  guardarComic(comic: Comic): Observable<any> {

    let url: string = `api/Comic/GuadarComic`;
    return this.http.post(url, JSON.stringify(comic), { headers: this.headerPublic });
  }

  public guardarUsuario(usuario: Usuario):Observable<any> {
    
    let url: string = `api/Usuario/GuadarUsuario`;

    return this.http.post<IRespuesta<Usuario>>(url, JSON.stringify(usuario), { headers: this.headerPublic });
  }

   guardarPedido(pedido: Pedido[]): Observable<any> {
    let url: string = `api/Pedido/GuadarPedido`;
    return this.http.post(url, JSON.stringify(pedido), { headers: this.headerPublic });
  }



}
