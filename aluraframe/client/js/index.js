import { Controler } from "./app/controller/Controler.js";
import { listen } from "./app/services/listener.js";

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
    // listen(controler.ordena);
})

document.querySelector('[data-botao="import"]').addEventListener('click', () => {
    controler.import();
    // controler.ordena();
})