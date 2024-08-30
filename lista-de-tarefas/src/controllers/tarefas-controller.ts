import { Tarefa } from "../models/Tarefa";
import { Tarefas } from "../models/tarefas";
import { TarefasView } from "../views/tarefas-view";

export class TarefasController {
  private inputTarefa = <HTMLInputElement>document.querySelector("#add-tarefas");
  private tarefas = new Tarefas();
  private tarefasView = new TarefasView('#tarefas-area');

  public adiciona(): void {
    //if(!this.inputTarefa.value) return;
    const tarefa = new Tarefa(this.formataDataAtual(), this.inputTarefa.value);
    this.tarefas.adiciona(tarefa);
    this.limpaInput()
    this.tarefasView.update(this.tarefas)
  }

  public deleta(tarefaIdDelete: number) {
    this.tarefas.deleta(tarefaIdDelete)
    this.tarefasView.update(this.tarefas)
  }

  private formataDataAtual(): Date {
    const dia = new Date().getDate();
    const mes = new Date().getMonth();
    const ano = new Date().getFullYear();

    return new Date(ano, mes, dia);
  }

  private limpaInput() {
    this.inputTarefa.value = ""
    this.inputTarefa.focus()
  }
}
