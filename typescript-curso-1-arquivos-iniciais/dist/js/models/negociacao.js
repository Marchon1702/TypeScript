export class Negociacao {
    constructor(data, quantidade, valor) {
        this._data = data;
        this._quantidade = quantidade;
        this._valor = valor;
    }
    ;
    // get = "getter" é um método que so serve para lermos o valor, quando formos le-los basta acessa-los como se fosse um atributo normal da classe (console.log(instancia.data))
    get data() {
        return this._data;
    }
    get quantidade() {
        return this._quantidade;
    }
    get valor() {
        return this._valor;
    }
    get volume() {
        return this._valor * this._quantidade;
    }
}
;
