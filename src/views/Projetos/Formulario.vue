<template>
  <section>    
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="" class="label">
          Nome do Projeto
        </label>
        <input 
          type="text" 
          class="input" 
          v-model="nomeDoProjeto" 
          id="nomeDoProjeto"
        />
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
import { defineComponent } from 'vue';
import { useStore } from '@/store';
import { ALTERA_PROJETO, ADICIONA_PROJETO, NOTIFICAR } from '@/store/tipo-mutacoes';
import { TipoNotificacao } from '@/interfaces/INotificacao';

export default defineComponent ({
  name: 'Formulario',
  props: {
    id: {
      type: String
    }
  },
  mounted() {
    if(this.id) {
      const projeto = this.store.state.projetos.find(proj => proj.id == this.id)
      this.nomeDoProjeto = projeto?.nome || ''
    }
  },
  data () {
    return {
      nomeDoProjeto: ""      
    };
  },
  methods: {
    salvar () {
      if (this.id) {
        this.store.commit(ALTERA_PROJETO, {
          id: this.id,
          nome: this.nomeDoProjeto
        })
      } else {
        this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto)        
      }
      this.nomeDoProjeto = '';
      this.store.commit(NOTIFICAR, {
        titulo: 'Um novo projeto foi salvo!',
        texto: 'Tudo certo, seu projeto já está disponível!',
        tipo: TipoNotificacao.SUCESSO
      })
      this.$router.push('/projetos')
    }
  },
  setup() {
    const store = useStore()
    return {
      store
    }
  }
})
</script>

<style scoped>
  input {
    margin-bottom: 1rem;
  }
  
</style>