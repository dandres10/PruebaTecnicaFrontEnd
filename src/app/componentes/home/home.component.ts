import { Component } from '@angular/core';
import { ComicService } from '../../servicios/comic.service';
import { Comic } from '../../clases/Comic';
import { IComic } from '../../clases/IComic';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  respuesta: any[] = [];




  constructor(private _comicServicio: ComicService) {

    this._comicServicio.getComics().subscribe(resp => this.respuesta = resp);

    
  }

  buscar(){
    console.log(this.respuesta[0]);
  }

 




}
