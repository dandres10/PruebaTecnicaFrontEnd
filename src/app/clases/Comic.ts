import { IComic } from './IComic';

export class Comic {



	Id: number;
	Nombre: string;
	Autor: string;
	Fecha: Date;

	constructor() { }



	public MapearDatosServicioClase(datosServicio) {
		debugger;
		let listaComic: IComic[] = [];

		datosServicio.forEach(element => {
			let objComic: IComic = {
				Id: element.id,
				Nombre: element.title,
				Autor: element.creators.items[0].name != undefined ? element.creators.items[0].name : 'no registra',
				Fecha: element.dates.date
			}
			listaComic.push(objComic);
		});

		return listaComic;
	}




}