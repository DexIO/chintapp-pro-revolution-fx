export class Carta {
    usuario?: string;
    contenido?: string;
    isRespuesta?: string;
    _id?: string;
    uid?: any;

    constructor(usuario, contenido, isRespuesta) {
        this.usuario = usuario;
        this.contenido = contenido;
        this.isRespuesta = isRespuesta;
    }
}
