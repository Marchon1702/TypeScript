// Tipando um array não basta apenas declarar Array, dentro de <> devemos especificar que tipos de dados este array irá conter, caso ele tenha mais de um usamos o any.
export class Negociacoes {
    constructor() {
        this.negociacoes = [];
    }
    adiciona(negociacao) {
        this.negociacoes.push(negociacao);
    }
    lista() {
        return this.negociacoes;
    }
}
