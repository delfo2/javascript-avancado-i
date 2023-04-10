import { Negociacao } from "./app/models/NegociacaoBrain.js";
const n1 = new Negociacao(new Date(), 1, 3);
console.log(n1.quantidade);

/*
const campos = {
    "data" : document.querySelector('#data'),
    "quantidade" : document.querySelector('#quantidade'),
    "valor" : document.querySelector('#valor')
}

const tabua = document.querySelector('[data-tabela=""]');

document.querySelector('[data-form=""]').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const tr = document.createElement('tr');

    for (let campo in campos) {
        const td = document.createElement('td');
        td.textContent = campos[campo].value;
        tr.appendChild(td);
    }
    const td = document.createElement('td');
    td.textContent = campos.quantidade.value * campos.valor.value;
    tr.appendChild(td);
    tabua.appendChild(tr);

    campos.data.value = '';
    campos.data.focus();
    campos.quantidade.value = 1;
    campos.valor.value = '';
})*/