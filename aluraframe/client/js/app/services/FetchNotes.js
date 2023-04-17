import { handleStatus } from "../helpers/PromiseHelpers.js";


export class FetchNotes {
    async buscaNotas () {
        let link = periodo => `http://localhost:3000/negociacoes/${periodo}`;

        try {
            const result = await Promise.all([
                fetch(link('semana')).then(res => handleStatus(res)),
                fetch(link('anterior')).then(res => handleStatus(res)),
                fetch(link('retrasada')).then(res => handleStatus(res))
            ])
            const retorno = result.flatMap(item => item);
            return retorno;
        } catch (error) {
            throw new Error ('Não foi possível se conectar etc, etc.');
        }
    }
    async enviarNota(nota) {
        try {
            const response = await fetch('http://localhost:3000/negociacoes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nota)
            });
            const resultado = await response.json();
            return resultado;
        } catch (error) {
            throw new Error('Não foi possível enviar a nota, etc, etc.');
        }
    }
}