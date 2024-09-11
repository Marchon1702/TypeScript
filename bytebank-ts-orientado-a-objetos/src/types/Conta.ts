import { Armazenador } from "./Armazenador.js";
import { ValidaDebito, ValidaDeposito } from "./Decorators.js";
import { GrupoTransacao } from "./GrupoTransacao.js";
import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js";

export class Conta {
  public nome: string;
  private saldo: number = Armazenador.obter<number>('saldo') || 0;
  // Após transações o reviver esta recebendo como argumento uma função que captura a chave data e atribui um new Date() como valor para ele.
  private transacoes: Transacao[] =
   Armazenador.obter<Transacao[]>(("transacoes"),
      (key: string, value: any) => {
        if (key === "data") {
          return new Date(value);
        }
      }
    ) || [];

  constructor(nome: string) {
    this.nome = nome;
  }

  getTitular(): string {
    return this.nome;
  }

  public getSaldo(): number {
    return this.saldo;
  }

  public getDataAcesso(): Date {
    return new Date();
  }

  @ValidaDeposito
  public depositar(valor: number): void {
    this.saldo += valor;
    Armazenador.salvar("saldo", this.saldo.toString());
  }

  @ValidaDebito
  public debitar(valor: number): void {
    this.saldo -= valor;
    Armazenador.salvar("saldo", this.saldo.toString());
  }

  public getGruposTransacoes(): GrupoTransacao[] {
    const gruposTransacoes: GrupoTransacao[] = [];
    const listaTransacoes: Transacao[] = structuredClone(this.transacoes);
    const transacoesOrdenadas: Transacao[] = listaTransacoes.sort(
      (t1, t2) => t2.data.getTime() - t1.data.getTime()
    );
    let labelAtualGrupoTransacao: string = "";

    for (let transacao of transacoesOrdenadas) {
      let labelGrupoTransacao: string = transacao.data.toLocaleDateString(
        "pt-br",
        { month: "long", year: "numeric" }
      );
      if (labelAtualGrupoTransacao !== labelGrupoTransacao) {
        labelAtualGrupoTransacao = labelGrupoTransacao;
        gruposTransacoes.push({
          label: labelGrupoTransacao,
          transacoes: [],
        });
      }
      gruposTransacoes.at(-1).transacoes.push(transacao);
    }

    return gruposTransacoes;
  }

  public registrarTransacao(novaTransacao: Transacao): void {
    if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
      this.depositar(novaTransacao.valor);
    } else if (
      novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA ||
      novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO
    ) {
      this.debitar(novaTransacao.valor);
      novaTransacao.valor *= -1;
    } else {
      throw new Error("Tipo de Transação é inválido!");
    }

    this.transacoes.push(novaTransacao);
    console.log(this.getGruposTransacoes());
    Armazenador.salvar("transacoes", JSON.stringify(this.transacoes));
  }
}

export class ContaPremium extends
Conta {
  registrarTransacao(transacao: Transacao): void {
    if(transacao.tipoTransacao === TipoTransacao.DEPOSITO) {
      console.log("Deposito Premium realizado.")
      transacao.valor += 0.5
    }
    // super quer dizer que estou chamando o método da minha classe pai.
    super.registrarTransacao(transacao)
  }
}

const conta = new Conta('Joana da Silva')
const contaPremium = new ContaPremium("Matheus Marchon")
export default conta;
