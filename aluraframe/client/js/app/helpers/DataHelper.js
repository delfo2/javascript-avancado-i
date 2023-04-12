export class DataHelper {
    constructor () {
        throw new Error('Essa classe não deve ser instanciada.');
    }

    static parseDate (string) {
        if(/^\d{4}-\d{2}-\d{2}$/.test(string)) {
            return new Date(
                ...string.split('-').map((item, i) =>
                    i % 2 ? (parseInt(item) - 1).toFixed() : item));
        }
        throw new Error(`Formato passado é inválido! "${string}", formato esperado: yyyy-mm-dd`);
    }

    static parseString (date) {
        if(date) {
            const dia = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            const mes = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
            return `${dia}/${mes}/${date.getFullYear()}`
        }
        throw new Error(`O parametro de data é ${date}, não é possível tratar`);
    }
}