import { TipoNotificacion } from './TipoNotificacion';
export interface IRespuesta<T> {
    
    Resultado: boolean;
    Entidades: T[];
    Mensajes: string[];
    TipoNotificacion: TipoNotificacion;

};