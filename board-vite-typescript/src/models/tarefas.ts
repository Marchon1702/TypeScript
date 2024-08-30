import { Tarefa } from "./Tarefa.js";

export class Tarefas {
  public tarefas: Tarefa[] = [];

  public adiciona(tarefa: Tarefa): void {
      this.tarefas.push(tarefa);
  }

  public deleta(tarefaIdDelete: number) {
    this.tarefas = this.tarefas.filter(
      (tarefa) => tarefa.idDelete !== tarefaIdDelete
    );
    console.log(this.tarefas);
  }
}
