import {Pipe, PipeTransform} from '@angular/core';
import {Carta} from "../entities/carta";

@Pipe({
    name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

    transform(cartas: Carta[], texto: string): Carta[] {

        // Campo de búsqueda vacío
        if (texto.trim().length === 0) {
            return cartas;
        }

        // Búsqueda por Usuario (@)
        if (texto.charAt(0) === "@") {
            console.log(texto);
            let alias = texto.split("").pop();
            console.log(alias);
            if (texto.trim().length == 1) {
                return cartas;
            }
            return cartas.filter(usuariosFiltrados => {
                return usuariosFiltrados.usuario.toLowerCase().includes(alias.toLocaleLowerCase());
            })
        }

        // Cartas negras
        if (texto.trim() === "negro" ||
            texto.trim() === "negras" ||
            texto.trim() === "pregunta" ||
            texto.trim() === "preguntas") {
            return cartas.filter(cartasFiltradas => {
                return !cartasFiltradas.isRespuesta;
            })
        }

        // Cartas blancas
        if (texto.trim() === "blanco" ||
            texto.trim() === "blancas" ||
            texto.trim() === "respuesta" ||
            texto.trim() === "respuestas") {
            return cartas.filter(cartasFiltradas => {
                return cartasFiltradas.isRespuesta;
            })
        }


        // Búsqueda por contenido
        return cartas.filter(cartasFiltradas => {
            return cartasFiltradas.contenido.toLowerCase().includes(texto.toLocaleLowerCase());
        })
    }

}
