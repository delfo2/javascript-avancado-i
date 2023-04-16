import { Negociacao } from "../models/NegociacaoBrain.js";
import { DataHelper } from "../helpers/DataHelper.js";
import { NegociacoesMemory } from "../models/NegociacoesMemory.js";
import { NegociacoesView } from "../view/NegociaçõesView.js";
import { MensagemInfo } from "../models/MensageInfo.js";
import { MensagemView } from "../view/MensagemView.js";
import { ProxyFactory } from "../services/ProxyFactory.js";
import { FetchNotes } from "../services/FetchNotes.js";

export class Controler {
    constructor (data, quantidade, valor) {
        this._inputData =  data;
        this._inputQuantidade = quantidade;
        this._inputValor = valor;
        let self = this;

        this._memory = ProxyFactory.criar(
            new NegociacoesMemory(),
            new NegociacoesView(document.querySelector("#negociacoesView")),
            'adiciona',
            'deleta',
            'ordena'
        )

        this._mensagemInfo = ProxyFactory.criar(
            new MensagemInfo(),
            new MensagemView(document.querySelector("#mensagemView")),
            'updateTexto'
        )
    }

    adicionaNegociacao () {
        this._memory.adiciona(this._criaNegociacao());
        this._mensagemInfo.updateTexto('Negociação criada com sucesso');

        this._limpaCampos();
    }
    
    deleteAll () {
        this._memory.deleta();
        this._limpaCampos();

        this._mensagemInfo.updateTexto('Negociações apagadas com sucesso');
    }

    async import () {
        const notes = new FetchNotes();
        const negociações = await notes.buscaNotas();
        negociações.forEach(objeto => {
            this._memory.adiciona(new Negociacao(
                new Date(objeto.data),
                objeto.quantidade,
                objeto.valor
            ));
        })
        this._mensagemInfo.updateTexto('Negociações importadas.')
    }

    ordena (coluna) {
        self._memory.ordena((a, b) => a[coluna] - b[coluna])
    }

    _criaNegociacao () {
        return new Negociacao(
            DataHelper.parseDate(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    _limpaCampos () {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = '';
        
        this._inputData.focus();
    }
}