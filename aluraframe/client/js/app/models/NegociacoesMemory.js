export class NegociacoesMemory {

    constructor() {
        this._negociacoes = [];
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }
    
    get negociacoes() {
        let reference = this._negociacoes;
        return  reference;
    }

    deleta () {
        this._negociacoes = [];
    }
    
    ordena(criterio) {
        this._negociacoes.sort(criterio);        
    }
}