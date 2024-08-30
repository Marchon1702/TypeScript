import { TarefasController } from "./controllers/tarefas-controller.js";

const form = document.querySelector("#form");
const tarefasController = new TarefasController();

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    tarefasController.adiciona();
  });
}

document.addEventListener("click", (e) => {
  const targetButton = e.target as HTMLElement;

  if (targetButton && targetButton.classList.contains("btn__remove")) {
    const tarefaIdDelete = Number(targetButton.id);
    tarefasController.deleta(tarefaIdDelete);
    return;
  }
});
