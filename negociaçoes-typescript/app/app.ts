import { negociacaoController } from "./controllers/negociacao-controller.js";

const negociacao = new negociacaoController();
const form = document.querySelector(".form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    negociacao.adiciona();
  });
} else {
    throw Error('Não foi possivel iniciar a aplicação, Verifique se o elemento form existe.')
}
