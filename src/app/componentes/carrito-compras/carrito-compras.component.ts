import { Component } from '@angular/core';
import { Comic } from '../../clases/comic/Comic';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ComicService } from '../../servicios/comic.service';
import { Usuario } from '../../clases/usuario/Usuario';
import { error } from 'protractor';
import { IUsuario } from '../../clases/usuario/IUsuario';

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent {

  pedidoCarrito: Comic[] = [];
  total: number = 0;
  formaCarrito: FormGroup;
  datosUsuarioServicio: any;
  idUsuario: any;


  usuario: Usuario;

  constructor(private fb: FormBuilder, private _comicServicio: ComicService) {
    this.getLocalStorange();
    this.totalPedido();
    this.crearFormulario();
    this.cargarDataAlFormulario();

  }

  getLocalStorange() {
    for (let i = 1; i < localStorage.length + 1; i++) {
      this.pedidoCarrito.push(JSON.parse(localStorage.getItem(i.toString())))

    }

    console.log(this.pedidoCarrito);
  }


  totalPedido(): number {
    this.pedidoCarrito.forEach(element => {
      this.total += element.Valor;
    });

    return this.total;
  }

  crearFormulario() {
    this.formaCarrito = this.fb.group({
      nombre: [''],
      numeroDocumento: [''],
      direccion: [''],
      celular: [''],
      tipoDocumento: ['']
    });

  }

  cargarDataAlFormulario() {
    this.formaCarrito.reset({
      nombre: '',
      numeroDocumento: '',
      direccion: '',
      celular: '',
      tipoDocumento: ''

    });


  }

  usuarioRegistrar() {

    this.usuario = {
      Celular: this.formaCarrito.get("celular").value,
      Direccion: this.formaCarrito.get("direccion").value,
      Nombre: this.formaCarrito.get("nombre").value,
      NumeroDocumento: this.formaCarrito.get("numeroDocumento").value,
      TipoDocumento: parseInt(this.formaCarrito.get("tipoDocumento").value != undefined ? this.formaCarrito.get("tipoDocumento").value : 1)
    }

    console.log(this.usuario);
    //this.obtenerDatosUsuario(this.usuario);

    


  }


  obtenerDatosUsuario(usuario: Usuario) {
    let data: IUsuario;
    this._comicServicio.guardarUsuario(usuario)
      .toPromise().then(resp =>  data = resp.Entidades[0])
      .catch(error => console.log(error));

      console.log("hola",data.Id);
  }


  enviarPedido(){
    
  }



















}
