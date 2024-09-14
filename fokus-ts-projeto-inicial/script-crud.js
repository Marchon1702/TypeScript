let estadoInicial = {
    tarefas: [
        {
            id: "asjkasdj",
            descricao: "Tarefa concluída",
            concluida: true,
        },
        {
            id: "adhndmsw",
            descricao: "Tarefa pendente 1",
            concluida: false,
        },
        {
            id: "asbgrtyu",
            descricao: "Tarefa pendente 2",
            concluida: false,
        },
    ],
    tarefaSelecionada: null,
    tarefaAhEditar: null,
};
const gerarId = () => Date.now().toString(36);
const jahExiste = (tarefa) => estadoInicial.tarefas.find(tarefaExistente => tarefaExistente.descricao === tarefa.descricao);
const selecionarTarefa = (estado, tarefa) => {
    return Object.assign(Object.assign({}, estado), { tarefaSelecionada: tarefa === estado.tarefaSelecionada ? null : tarefa });
};
const editarTarefa = (estado, tarefa) => {
    return Object.assign(Object.assign({}, estado), { tarefaAhEditar: tarefa });
};
const concluirTarefa = (estado, tarefa) => {
    return Object.assign(Object.assign({}, estado), { tarefas: estado.tarefas.map((tarefaMapeada) => {
            if (tarefaMapeada === tarefa) {
                return Object.assign(Object.assign({}, tarefa), { concluida: !tarefa.concluida });
            }
            return tarefaMapeada;
        }) });
};
const adicionarTarefa = (estado, tarefa) => {
    if (jahExiste(tarefa)) {
        throw new Error(`Tarefa já adicionada, use uma variação na sua descrição de tarefa. 
      Ex: ${tarefa.descricao} Variação de informação!`);
    }
    if (estado.tarefaAhEditar) {
        return Object.assign(Object.assign({}, estado), { tarefas: estado.tarefas.map(tarefaExistente => {
                var _a;
                if (tarefaExistente.id === ((_a = estado.tarefaAhEditar) === null || _a === void 0 ? void 0 : _a.id)) {
                    return Object.assign(Object.assign({}, tarefaExistente), { descricao: tarefa.descricao });
                }
                ;
                return tarefaExistente;
            }), tarefaAhEditar: null });
    }
    return Object.assign(Object.assign({}, estado), { tarefas: [...estado.tarefas, tarefa] });
};
const cancelarTarefa = (form) => {
    form.classList.toggle("hidden");
    form.reset();
};
const deletarTarefa = (estado, textArea) => {
    const tarefaAhDeletar = textArea.value;
    return Object.assign(Object.assign({}, estado), { tarefas: estado.tarefas.filter((tarefa) => tarefa.descricao !== tarefaAhDeletar) });
};
const removerTarefasConcluidas = (estado) => {
    var _a;
    if ((_a = estado.tarefaSelecionada) === null || _a === void 0 ? void 0 : _a.concluida) {
        estado.tarefaSelecionada = null;
    }
    return Object.assign(Object.assign({}, estado), { tarefas: estado.tarefas.filter((tarefa) => !tarefa.concluida) });
};
const removerTodasTarefas = (estado) => {
    estado.tarefaSelecionada = null;
    atualizarUI();
    return Object.assign(Object.assign({}, estado), { tarefas: [] });
};
const atualizarUI = () => {
    const ulTarefas = document.querySelector(".app__section-task-list");
    const formAdicionarTarefa = document.querySelector(".app__form-add-task");
    const labelForm = document.querySelector(".app__form-label");
    const emAndamentoArea = document.querySelector(".app__section-active-task-label");
    const btnAdicionarTarefas = document.querySelector(".app__button--add-task");
    const textArea = document.querySelector(".app__form-textarea");
    const btnCancelarTarefa = document.querySelector(".app__form-footer__button--cancel");
    const btnRemoverUmaTarefa = document.querySelector(".app__form-footer__button--delete");
    const btnRemoverTarefas = document.querySelector("#btn-remover-todas");
    const btnRemoverConcluidas = document.querySelector("#btn-remover-concluidas");
    if (!btnRemoverConcluidas) {
        throw new Error("btnRemoverConcluidas não foi encontrado.");
    }
    btnRemoverConcluidas.onclick = () => {
        estadoInicial = removerTarefasConcluidas(estadoInicial);
        atualizarUI();
    };
    btnRemoverTarefas.onclick = () => {
        estadoInicial = removerTodasTarefas(estadoInicial);
        atualizarUI();
    };
    if (!btnAdicionarTarefas) {
        throw Error("btnAdicionarTarefas não foi encontrado.");
    }
    btnAdicionarTarefas.onclick = () => {
        labelForm.innerHTML = "Adicionando Tarefa";
        formAdicionarTarefa === null || formAdicionarTarefa === void 0 ? void 0 : formAdicionarTarefa.classList.toggle("hidden");
    };
    formAdicionarTarefa.onsubmit = (event) => {
        event.preventDefault();
        const descricao = textArea.value;
        if (estadoInicial.tarefaAhEditar) {
            estadoInicial = adicionarTarefa(estadoInicial, Object.assign(Object.assign({}, estadoInicial.tarefaAhEditar), { descricao: descricao }));
        }
        else {
            estadoInicial = adicionarTarefa(estadoInicial, {
                id: gerarId(),
                descricao: descricao,
                concluida: false,
            });
        }
        formAdicionarTarefa === null || formAdicionarTarefa === void 0 ? void 0 : formAdicionarTarefa.classList.add("hidden");
        atualizarUI();
    };
    if (!btnCancelarTarefa) {
        throw new Error("btnCancelarTarefa não foi encontrado!");
    }
    btnCancelarTarefa.onclick = () => {
        cancelarTarefa(formAdicionarTarefa);
    };
    if (!btnRemoverUmaTarefa) {
        throw new Error("btnRemoverUmaTarefa não foi encontrado!");
    }
    btnRemoverUmaTarefa.onclick = () => {
        estadoInicial = deletarTarefa(estadoInicial, textArea);
        labelForm.innerHTML = 'Adicionando Tarefa';
        atualizarUI();
    };
    if (ulTarefas)
        ulTarefas.innerHTML = "";
    estadoInicial.tarefas.forEach((tarefa) => {
        const li = document.createElement("li");
        li.classList.add("app__section-task-list-item");
        const taskIconSvg = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
        fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#FFF" />
        <path
        d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
        fill="#01080E" />
        </svg>
    `;
        const svgIcon = document.createElement("svg");
        svgIcon.innerHTML = taskIconSvg;
        const paragraph = document.createElement("p");
        paragraph.classList.add("app__section-task-list-item-description");
        paragraph.textContent = tarefa.descricao;
        const button = document.createElement("button");
        button.classList.add("app_button-edit");
        const editIcon = document.createElement("img");
        editIcon.setAttribute("src", "/imagens/edit.png");
        button.appendChild(editIcon);
        button.addEventListener("click", (e) => {
            e.stopPropagation();
            estadoInicial = editarTarefa(estadoInicial, tarefa);
            console.log(estadoInicial);
            if (estadoInicial.tarefaAhEditar) {
                labelForm.innerHTML = "Editando Tarefa";
                formAdicionarTarefa === null || formAdicionarTarefa === void 0 ? void 0 : formAdicionarTarefa.classList.remove("hidden");
                textArea.value = estadoInicial.tarefaAhEditar.descricao;
            }
        });
        if (tarefa.concluida) {
            button.setAttribute("disabled", "true");
            li.classList.add("app__section-task-list-item-complete");
        }
        li.appendChild(svgIcon);
        li.appendChild(paragraph);
        li.appendChild(button);
        li.addEventListener("click", () => {
            estadoInicial = selecionarTarefa(estadoInicial, tarefa);
            atualizarUI();
        });
        if (estadoInicial.tarefaSelecionada === tarefa) {
            li.classList.add("app__section-task-list-item-active");
            emAndamentoArea.innerText = `#Em andamento: ${tarefa.descricao}`;
        }
        if (estadoInicial.tarefaSelecionada === null) {
            emAndamentoArea.innerText = `#Em andamento:`;
        }
        svgIcon.onclick = () => {
            estadoInicial = concluirTarefa(estadoInicial, tarefa);
            atualizarUI();
        };
        ulTarefas === null || ulTarefas === void 0 ? void 0 : ulTarefas.appendChild(li);
    });
};
document.addEventListener('TarefaFinalizada', () => {
    if (estadoInicial.tarefaSelecionada) {
        estadoInicial.tarefaSelecionada.concluida = true;
        atualizarUI();
    }
});
atualizarUI();
