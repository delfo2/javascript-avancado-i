import { Negociacao } from "../models/NegociacaoBrain.js";
import { DataHelper } from "../helpers/DataHelper.js";
import { NegociacoesMemory } from "../models/NegociacoesMemory.js";
import { NegociacoesView } from "../view/NegociaçõesView.js";
import { MensagemInfo } from "../models/MensageInfo.js";
import { MensagemView } from "../view/MensagemView.js";

export class Controler {
    constructor (data, quantidade, valor) {
        this._inputData =  data;
        this._inputQuantidade = quantidade;
        this._inputValor = valor;

        this._memory = new NegociacoesMemory();
        this._view = new NegociacoesView(document.querySelector("#negociacoesView"));

        this._mensagemInfo = new MensagemInfo();
        this._mensagemAlerta = new MensagemView(document.querySelector("#mensagemView"));
    }

    adicionaNegociacao () {
        this._memory.adiciona(this._criaNegociacao());
        this._view.update(this._memory);
        
        this._mensagemInfo.updateTexto('Negociação criada com sucesso');
        this._mensagemAlerta.update(this._mensagemInfo.obterTexto());

        this._limpaCampos();
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