import { Negociacao } from "../models/NegociacaoBrain.js";
import { DataHelper } from "../helpers/DataHelper.js";
import { NegociacoesMemory } from "../models/NegociacoesMemory.js";
import { NegociacoesView } from "../view/NegociaçõesView.js";
import { MensagemInfo } from "../models/MensageInfo.js";
import { MensagemView } from "../view/MensagemView.js";
import { ProxyFactory } from "../services/ProxyFactory.js";
import { FetchNotes } from "../services/FetchNotes.js";
import { listen } from "../services/listener.js";

export class Controler {
    constructor (data, quantidade, valor) {
        this._inputData =  data;
        this._inputQuantidade = quantidade;
        this._inputValor = valor;
        this._ordem = 'decrescente';
        this._notes = new FetchNotes();

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
        this.ouvir();
    }
    
    deleteAll () {
        this._memory.deleta();
        this._limpaCampos();

        this._mensagemInfo.updateTexto('Negociações apagadas com sucesso');
    }

    async import () {
        const negociações = await this._notes.buscaNotas();
        negociações.forEach(objeto => {
            this._memory.adiciona(new Negociacao(
                new Date(objeto.data),
                objeto.quantidade,
                objeto.valor
            ));
        })
        this._mensagemInfo.updateTexto('Negociações importadas.')
        this.ouvir();
    }

    ordena (coluna) {
        if(this._ordem === 'crescente') {
            this._memory.ordena((a, b) => b[coluna.dataset.valor] - a[coluna.dataset.valor])
            this._ordem = 'decrecente';
        } else {
            this._memory.ordena((a, b) => a[coluna.dataset.valor] - b[coluna.dataset.valor]);
            this._ordem = 'crescente';
        }
        this.ouvir();
    }
    
    ouvir () {
        let self = this;
        const colunas = document.querySelectorAll('[data-valor]');
        colunas.forEach(coluna =>
            coluna.addEventListener('click', () => {
                self.ordena(coluna);
            })
        );
    }

    _criaNegociacao () {
        const negociacaoTemp = new Negociacao(
            DataHelper.parseDate(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
        this._notes.enviarNota(negociacaoTemp)
            .then(console.log);
        return negociacaoTemp;
    }

    _limpaCampos () {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = '';
        
        this._inputData.focus();
    }
}