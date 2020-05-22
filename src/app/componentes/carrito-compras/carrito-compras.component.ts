
import { Component } from '@angular/core';
import { Comic } from '../../clases/comic/Comic';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ComicService } from '../../servicios/comic.service';
import { Usuario } from '../../clases/usuario/Usuario';
import { Router } from '@angular/router';
import { IRespuesta } from '../../clases/Respuesta/IRespuesta';
import { Pedido } from '../../clases/pepido/Pedido';



@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent {

  pedidoCarrito: Comic[] = [];
  total: number = 0;
  formaCarrito: FormGroup;
  datosUsuarioServicio: IRespuesta<Usuario>;
  usuario: Usuario;
  pedidoGuardar: Pedido[] = [];
  pedido: Pedido;



  constructor(private fb: FormBuilder, private _comicServicio: ComicService, private routerModule: Router) {
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
      nombre: 'pepeto',
      numeroDocumento: 1342,
      direccion: 'en la esquina a la derecha',
      celular: 123654,
      tipoDocumento: 2

    });



  }

  usuarioRegistrar() {
    console.log(this.formaCarrito);
    this.usuario = {
      Celular: this.formaCarrito.get("celular").value,
      Direccion: this.formaCarrito.get("direccion").value,
      Nombre: this.formaCarrito.get("nombre").value,
      NumeroDocumento: this.formaCarrito.get("numeroDocumento").value,
      TipoDocumento: parseInt(this.formaCarrito.get("tipoDocumento").value != undefined ? this.formaCarrito.get("tipoDocumento").value : 1)
    }


    this.obtenerDatosUsuario(this.usuario);




  }


  public obtenerDatosUsuario(usuario: Usuario) {


    this._comicServicio.guardarUsuario(usuario).toPromise()
      .then((resp: IRespuesta<Usuario>) => {
        this.datosUsuarioServicio = resp;
        this.guardarPedido();
        //this.routerModule.navigateByUrl("/home");
      })
      .catch(error => console.log(error));




  }


  private guardarPedido() {



    for (let i = 1; i < localStorage.length + 1; i++) {
      let datos: Comic = JSON.parse(localStorage.getItem(i.toString()));

      this.pedido = {
        Cantidad: datos.Cantidad,
        Comic: datos.Id,
        Usuario: this.datosUsuarioServicio.Entidades[0].Id,
        Valor: datos.Valor * datos.Cantidad

      };

      this.pedidoGuardar.push(this.pedido);

    }

    console.log("Pedido enviar", this.pedidoGuardar);

    this._comicServicio.guardarPedido(this.pedidoGuardar).subscribe(resp => console.log(resp));

  }




















}
