export class Armazenador {
    constructor() { }
    static salvar(chave, valor) {
        const valorComoString = JSON.stringify(valor);
        localStorage.setItem(chave, valorComoString);
    }
    // reviver é um parâmetro opicional onde permite que o método obter quando chamado, receba uma função que possa ser feita para verificar determinados dados e manipula-los na hora de sua reatribuição.
    static obter(chave, reviver) {
        const valor = localStorage.getItem(chave);
        if (valor === null)
            return null;
        if (reviver)
            return JSON.parse(valor, reviver);
        return JSON.parse(valor);
    }
}
