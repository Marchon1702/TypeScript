import { Negociacao } from "./negociacao.js";

// Tipando um array não basta apenas declarar Array, dentro de <> devemos especificar que tipos de dados este array irá conter, caso ele tenha mais de um usamos o any.
export class Negociacoes {
    private negociacoes: Array<Negociacao> = []

    adiciona(negociacao: Negociacao) {
        this.negociacoes.push(negociacao)
    }

    lista(): ReadonlyArray<Negociacao> {
        return this.negociacoes
    }
}