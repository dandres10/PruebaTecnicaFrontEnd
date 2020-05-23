import { Component, OnInit } from '@angular/core';
import { ComicService } from '../../servicios/comic.service';
import { IRespuesta } from '../../clases/Respuesta/IRespuesta';
import { ReporteCompraDetalle } from '../../clases/compra/consultas/ReporteCompraDetalle';
import { ReporteCompra } from '../../clases/compra/consultas/ReporteCompra';
import { timer } from 'rxjs';
import { Comic } from 'src/app/clases/comic/Comic';
import { RespuestaCompraDetalle } from '../../clases/compra/consultas/RespuestaCompraDetalle';
import { RespuestaCompra } from '../../clases/compra/consultas/RespuestaCompra';


@Component({
  selector: 'app-reporte-compra',
  templateUrl: './reporte-compra.component.html',
  styleUrls: ['./reporte-compra.component.css']
})
export class ReporteCompraComponent implements OnInit {

  numeroDocumento: number;
  orden: string;
  respuestaCompraDetalles: IRespuesta<RespuestaCompraDetalle>;
  mostrarCompraDetalles: RespuestaCompraDetalle[] = [];
  mostrarCompra: RespuestaCompra[] = [];
  respuestaCompra: IRespuesta<RespuestaCompra>;
  reporteCompra: ReporteCompra;
  reporteDetalleCompra: ReporteCompraDetalle;
  respuestaCompraEntidades: any;
  cargaDatos: boolean = false;
estado:number = 0;

  constructor(private _comicServicio: ComicService) {

    this.numeroDocumento = parseInt(localStorage.getItem("numeroDocumento"));
    this.orden = localStorage.getItem("orden");

    if ( this.orden ) {
      this.estado++;
      this.obtenerReporte();
      localStorage.clear();
    }

  

  }

  ngOnInit(): void {
  }


  obtenerReporte() {


    this.reporteCompra = {
      GuidPedido: this.orden,
      NumeroDocumento: this.numeroDocumento
    };

    this.reporteDetalleCompra = {
      GuidPedido: this.orden,
      NumeroDocumento: this.numeroDocumento
    }


    this._comicServicio.reporteCompra(this.reporteCompra)
      .subscribe((resp: IRespuesta<RespuestaCompra>) => {
        this.respuestaCompra = { ...resp };
        this.mostrarCompra = this.respuestaCompra.Entidades;
        this.cargaDatos = true;
      }, (error) => { console.log('no se mapearon los datos' + error) })


    this._comicServicio.reporteDetalle(this.reporteDetalleCompra)
      .subscribe((resp: IRespuesta<RespuestaCompraDetalle>) => {
        this.respuestaCompraDetalles = resp;
        this.mostrarCompraDetalles = this.respuestaCompraDetalles.Entidades;
        this.cargaDatos = true;
      }, (error) => { console.log('no se mapearon los datos' + error) })











  }




}
