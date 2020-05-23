
import { Component } from '@angular/core';
import { Comic } from '../../clases/comic/Comic';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ComicService } from '../../servicios/comic.service';
import { Usuario } from '../../clases/usuario/Usuario';
import { Router } from '@angular/router';
import { IRespuesta } from '../../clases/Respuesta/IRespuesta';
import { Pedido } from '../../clases/pepido/Pedido';
import { Compra } from '../../clases/compra/Compra';




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
  datosPedidoServicio: IRespuesta<Pedido>;
  usuario: Usuario;
  pedidoGuardar: Pedido[] = [];
  pedido: Pedido;
  compra: Compra;
  compraFilalizada: boolean = false;



  constructor(private fb: FormBuilder, private _comicServicio: ComicService, private routerModule: Router) {
    this.getLocalStorange();
    this.totalPedido();
    this.crearFormulario();
    //this.cargarDataAlFormulario();


  }

  getLocalStorange() {
    for (let i = 1; i < localStorage.length + 1; i++) {
      this.pedidoCarrito.push(JSON.parse(localStorage.getItem(i.toString())))

    }

  
  }


  totalPedido(): number {
    this.pedidoCarrito.forEach(element => {
      this.total += element.Valor * element.Cantidad;
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
      numeroDocumento: Math.floor(Math.random() * (1000 - 1)) + 1,
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

        this.guardarPedido(this.datosUsuarioServicio);

      })
      .catch(error => console.log(error));




  }






  private guardarPedido(usuario: IRespuesta<Usuario>) {



    for (let i = 1; i < localStorage.length + 1; i++) {
      let datos: Comic = JSON.parse(localStorage.getItem(i.toString()));

      this.pedido = {
        Cantidad: datos.Cantidad,
        Comic: datos.Id,
        Usuario: usuario.Entidades[0].Id,
        Valor: datos.Valor * datos.Cantidad

      };

      this.pedidoGuardar.push(this.pedido);

    }



    this._comicServicio.guardarPedido(this.pedidoGuardar)
      .toPromise()
      .then((resp: IRespuesta<Pedido>) => {
        this.datosPedidoServicio = resp;

        this.guardarCompra(this.datosPedidoServicio);
       
      })
      .catch(error => error);



  }


  private guardarCompra(pedido: IRespuesta<Pedido>) {

    this.compra = {
      Fecha: this.fecha(),
      Pedido: pedido.Entidades[0].Guid,
      Total: this.total
    }

    console.log();

    this._comicServicio.guardarCompra(this.compra)
      .toPromise()
      .then(() => {
        if (this.datosUsuarioServicio.Entidades[0].NumeroDocumento && this.datosPedidoServicio.Entidades[0].Guid) {
          this.compraFilalizada = true;
              localStorage.setItem("numeroDocumento",this.datosUsuarioServicio.Entidades[0].NumeroDocumento.toString())
              localStorage.setItem("orden",this.datosPedidoServicio.Entidades[0].Guid)
        }

        //this.routerModule.navigateByUrl("/home");

      })
      .catch();

  }

  private fecha(): string {
    let date = new Date()

    let day: number = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear();

    let formatoMonth = month < 10 ? `0${month}` : month;

    return `${year}-${formatoMonth}-${day}`;
  }




















}
