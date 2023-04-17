import { Controler } from "./app/controller/Controler.js";

const controler = new Controler(
    document.querySelector('#data'),
    document.querySelector('#quantidade'),
    document.querySelector('#valor')
)

document.querySelector('[data-botao="delete"]').addEventListener('click', () => {
    controler.deleteAll();
})

document.querySelector('[data-form=""]').addEventListener('submit', (e) => {
    e.preventDefault();
    controler.adicionaNegociacao();
})

document.querySelector('[data-botao="import"]').addEventListener('click', () => {
    controler.import();
})