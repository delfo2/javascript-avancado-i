export function listen (fn) {
    const colunas = document.querySelectorAll('[data-valor]');
    colunas.forEach(coluna =>
        coluna.addEventListener('click', function () {
            fn(coluna.dataset.valor)

        })
    );
}