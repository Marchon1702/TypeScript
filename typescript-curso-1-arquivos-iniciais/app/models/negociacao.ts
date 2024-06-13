export class Negociacao {
    // Essas variaveis com # significam que são variaveis de campo privado dentro da classe, ou seja elas não podem ser acessadas do lado de fora, nem para imprimir na tela, nem para mudar seu valor.
    // A única forma de acessar essas variaveis é através dos métodos internos da própria classe.
    private _data: Date;
    private _quantidade: number;
    private _valor: number;
    constructor(data: Date, quantidade: number, valor: number) {
        this._data = data;
        this._quantidade = quantidade;
        this._valor = valor;
    };
    // get = "getter" é um método que so serve para lermos o valor, quando formos le-los basta acessa-los como se fosse um atributo normal da classe (console.log(instancia.data))
    get data(): Date {
        return this._data
    }

    get quantidade(): number {
        return this._quantidade
    }

    get valor(): number {
        return this._valor
    }

    get volume(): number {
        return this._valor * this._quantidade
    }
};