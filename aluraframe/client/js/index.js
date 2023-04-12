import { Controler } from "./app/controller/Controler.js";

const controler = new Controler(
    document.querySelector('#data'),
    document.querySelector('#quantidade'),
    document.querySelector('#valor')
)


// const tabua = document.querySelector('[data-tabela=""]');

document.querySelector('[data-form=""]').addEventListener('submit', (e) => {
    e.preventDefault();
    controler.adicionaNegociacao();
})