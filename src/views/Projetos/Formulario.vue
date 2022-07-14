<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label">
          Nome do Projeto
        </label>
        <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto" />
        <div class="field">
          <button class="button" type="submit">
            Salvar &#x1F4BE;
          </button>
        </div>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from '@/store';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import useNotificador from '@/hooks/notificador'
import { CADASTRAR_PROJETOS, ALTERAR_PROJETOS } from '@/store/tipo-acoes';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Formulario',
  props: {
    id: {
      type: String
    }
  },

  setup(props) {
    const router = useRouter()
    const store = useStore()
    const { notificar } = useNotificador()

    const nomeDoProjeto = ref("")

    if (props.id) {
      const projeto = store.state.projeto.projetos.find(proj => proj.id == props.id)
      nomeDoProjeto.value = projeto?.nome || ''
    }

    const lidar_com_sucesso = () => {
      nomeDoProjeto.value = '';
      notificar(TipoNotificacao.SUCESSO, 'Perfeito!!!', 'Foi cadastrado um novo projeto com sucessso!!!')
      router.push('/projetos')
    }

    const salvar = () => {
      if (props.id) {
        store.dispatch(ALTERAR_PROJETOS, {
          id: props.id,
          nome: nomeDoProjeto.value
        }).then(lidar_com_sucesso)
      } else {
        store.dispatch(CADASTRAR_PROJETOS, nomeDoProjeto.value)
          .then(lidar_com_sucesso)
      }
    }


    return {
      nomeDoProjeto,
      salvar
    }
  }
})
</script>

<style scoped>
input {
  margin-bottom: 1rem;
}
</style>