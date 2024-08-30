export class Tarefa {
  public readonly idDelete: number
  public readonly idEdit: number
  public data: Date
  public nome: string

  constructor(data: Date, nome: string) {
    this.idDelete = new Date().getMilliseconds()
    this.idEdit = new Date().getMilliseconds()
    this.data = data
    this.nome = nome
  }
}