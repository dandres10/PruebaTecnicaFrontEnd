import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import * as CryptoJS from 'crypto-js';

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


  getComics(): Observable<any> {
    let url: string = `http://gateway.marvel.com/v1/public/comics?ts=${this.ts}&apikey=${environment.publickey}&hash=${this.hastMD5}`;
    return this.http.get(url).pipe(map((resp: any) => resp.data.results));
  }

  getCreadoresComic(id: number): Observable<any> {
    let url: string = `http://gateway.marvel.com/v1/public/comics/${id}/creators?ts=${this.ts}&apikey=${environment.publickey}&hash=${this.hastMD5}`;
    return this.http.get(url).pipe(map((resp: any) => resp.data.results));
  }



}
