import { Component } from '@angular/core';
import { ComicService } from '../../servicios/comic.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Comic } from '../../clases/comic/Comic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  precios: number[] = [12000, 23000, 10000, 15000, 8000, 7000, 6000, 5500, 7800, 9500, 12000, 23000, 10000, 15000, 8000, 7000, 6000, 5500, 7800, 9500];
  respuesta: any[] = [];
  carrito: Comic[] = [];
  comic = new Comic();
  cantidadCarritoCompra: number = 0;
  forma: FormGroup;
  contPrecios: number = 0;



  constructor(private _comicServicio: ComicService, private fb: FormBuilder) {
    this.crearFormulario();


    this._comicServicio.getComics().subscribe(resp => this.respuesta = resp);


  }

  anadirAlCarrito(id: number) {
    let comicfiltrado: any = this.buscar(id);

    this.comic = {
      Id: comicfiltrado.id,
      Autor: comicfiltrado.title,
      Fecha: comicfiltrado.dates[1].date,
      Nombre: comicfiltrado.title,
      Cantidad: this.forma.get("cantidad").value,
      Valor: this.precios[this.cantidadCarritoCompra]
    }

    this.agregarListaCarritoNoDuplicado(id);


    console.log(this.carrito);

    localStorage.setItem(`${this.cantidadCarritoCompra}`, JSON.stringify(this.comic));
    

  }


  agregarListaCarritoNoDuplicado(id: number) {

    if (!this.carrito.find(resp => resp.Id === id)) {

      this.carrito.push(this.comic);
      //this.guardarComicApi(this.comic);
      this.cantidadCarritoCompra++;

    }
    
  }

  guardarComicApi(comic: Comic) {
    this._comicServicio.guardarComic(comic).toPromise().then(resp => console.log(resp)).catch(error => console.log(error));
  }

  buscar(id: number): any {
    return this.respuesta.find(resp => resp.id == id);
  }

  crearFormulario() {
    this.forma = this.fb.group({
      cantidad: ['']
    });
  }

  cargarDataAlFormulario() {
    this.forma.reset({
      cantidad: 1

    });


  }

  limpiarFormulario() {
    this.forma.reset({
      cantidad: 1

    });

    localStorage.clear();
  }

 















}
