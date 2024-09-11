export class Armazenador {
  private constructor() {}

  public static salvar(chave: string, valor: string) {
    const valorComoString = JSON.stringify(valor);
    localStorage.setItem(chave, valorComoString);
  }

  // reviver é um parâmetro opicional onde permite que o método obter quando chamado, receba uma função que possa ser feita para verificar determinados dados e manipula-los na hora de sua reatribuição.
  public static obter<T>(chave: string, reviver?: (this: any, key: string, value: any) => any): T | null {
    const valor = localStorage.getItem(chave);

    if (valor === null) return null;

    if (reviver) return JSON.parse(valor, reviver) as T;

    return JSON.parse(valor) as T;
  }
}
