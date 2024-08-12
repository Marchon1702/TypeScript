import { negociacaoController } from "./controllers/negociacao-controller.js";
const negociacao = new negociacaoController();
const form = document.querySelector('.form');
form.addEventListener('submit', event => {
    event.preventDefault();
    negociacao.adiciona();
});
