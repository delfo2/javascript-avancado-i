export class MensagemInfo {
    constructor (texto = '') {
        this.texto = texto;
    }

    obterTexto () {
        return this.texto;
    }

    updateTexto (texto) {
        this.texto = texto;
    }
}