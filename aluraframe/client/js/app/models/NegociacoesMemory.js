export class NegociacoesMemory {

    constructor(fn) {
        this._negociacoes = [];
        this._armadilha = fn;
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
        this._armadilha(this);
    }
    
    get negociacoes() {
        let reference = this._negociacoes;
        return  reference;
    }

    deleta () {
        this._negociacoes = [];
        this._armadilha(this)
    }
}