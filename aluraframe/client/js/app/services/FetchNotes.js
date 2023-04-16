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
}