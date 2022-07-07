import { INotificacao } from "@/interfaces/INotificacao";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore} from "vuex";
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_TAREFAS } from "./tipo-acoes";
import { NOTIFICAR, DEFINIR_TAREFAS, ADICIONAR_TAREFAS, ALTERA_TAREFA } from "./tipo-mutacoes";
import http from "@/http/index"
import ITarefa from "@/interfaces/ITarefa";
import { EstadoProjeto, projeto } from "./modulos/projeto";

export interface Estado {
  projeto: EstadoProjeto,
  notificacoes: INotificacao[],
  tarefas: ITarefa[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
  state: {
    notificacoes: [],
    tarefas: [],
    projeto: {
      projetos: []
    }
  },
  mutations: {
    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas
    },
    [ADICIONAR_TAREFAS](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa)
    },
    [ALTERA_TAREFA](state, tarefa: ITarefa){
      const index = state.tarefas.findIndex(trf => trf.id == tarefa.id)
      state.tarefas[index] = tarefa
    },
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime(),
      state.notificacoes.push(novaNotificacao),
      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
      }, 3000)
    }
  },
  actions: {
    [OBTER_TAREFAS] ({ commit }) {
      http.get('tarefas')
        .then(response => commit(DEFINIR_TAREFAS, response.data))
    },
    [CADASTRAR_TAREFA] ({ commit }, tarefa: ITarefa) {
      return http.post('/tarefas', tarefa)
        .then(resposta => commit(ADICIONAR_TAREFAS, resposta.data))
    },
    [ALTERAR_TAREFA] ({ commit }, tarefa: ITarefa) {
      return http.put(`/tarefas/${tarefa.id}`, tarefa)   
        .then(() => commit(ALTERA_TAREFA, tarefa))     
    },
  },
  modules: {
    projeto
  }
})

export function useStore(): Store<Estado> {
  return vuexUseStore(key)
}