export function listen (fn) {
    const colunas = document.querySelectorAll('[data-valor]');
    colunas.forEach(coluna =>
        coluna.addEventListener('click', function () {
            console.log('click');
            fn(coluna.dataset.valor)

        })
    );
}