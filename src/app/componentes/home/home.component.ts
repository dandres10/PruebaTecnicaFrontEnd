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
  respuestaFiltro: any[] = [];
  carrito: Comic[] = [];
  comic = new Comic();
  cantidadCarritoCompra: number = 0;
  forma: FormGroup;
  contPrecios: number = 0;
  busquedaActivo: boolean = false;
  busqueda: any;



  constructor(private _comicServicio: ComicService, private fb: FormBuilder) {
    this.crearFormulario();
    this.iniciarFormulario();


    this._comicServicio.getComics().subscribe(resp => { this.respuesta = resp; console.log(resp) });


  }
  
  filtrar() {
    this.respuestaFiltro = this.buscarFiltro(this.forma.get("nombre").value, this.respuesta);
    console.log( this.respuestaFiltro);
  }

  buscarFiltro(termino: any, data: any): any {
    this.busquedaActivo = true;
    let respuesta: any = [];
    termino = termino.toLowerCase();

    for (let i = 0; i < data.length; i++) {

      let comic = data[i].title.toLowerCase();
      let dataComic = data[i];
      if (comic.indexOf(termino) >= 0) {
       
        respuesta.push(dataComic);
      }

    }

    return respuesta;

  }

  quitarFiltro() {
    this.busquedaActivo = false;
    this.limpiarFormulario();
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




    localStorage.setItem(`${this.cantidadCarritoCompra}`, JSON.stringify(this.comic));


  }


  agregarListaCarritoNoDuplicado(id: number) {

    if (!this.carrito.find(resp => resp.Id === id)) {

      this.carrito.push(this.comic);
      this.guardarComicApi(this.comic);
      this.cantidadCarritoCompra++;

    }

  }

  guardarComicApi(comic: Comic) {
    this._comicServicio.guardarComic(comic).subscribe();
  }

  buscar(id: number): any {
    return this.respuesta.find(resp => resp.id == id);
  }

  crearFormulario() {
    this.forma = this.fb.group({
      cantidad: [''],
      autor: [''],
      nombre: ['']
    });
  }

  cargarDataAlFormulario() {
    this.forma.reset({
      cantidad: 1

    });


  }

  limpiarFormulario() {
    this.forma.reset({
      cantidad: 1,
      autor: '',
      nombre: ''

    });

    localStorage.clear();
  }


  iniciarFormulario() {
    this.forma.reset({
      cantidad: 1

    });

    localStorage.clear();
  }




















}
