import { Tarefa } from "../models/Tarefa";
import { Tarefas } from "../models/tarefas";
import { Views } from "./views";

export class TarefasView extends Views<Tarefas> {
  protected template(tarefas: Tarefas): string {
    return `
    ${tarefas
        .tarefas
        .map((tarefa: Tarefa): string => {
        return `
        <li class="tarefa-area">
          <span class="tarefa">${tarefa.nome}</span>
          <div class="opcoes-tarefa">
            <button id="${tarefa.idDelete}" class="btn__remove">DELETE</button>
          </div>
        </li>
        `
    }).join('')}`;
  }
}
