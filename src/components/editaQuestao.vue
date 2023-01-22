<template>
    <div id="modalPerguntas" class="modal">
        <div class="modal-content col s12">
            <h4>{{ pergunta.texto }}</h4>
            <div class="row input-field col s8">
                <textarea id="textPergunta" class="materialize-textarea" v-model="resposta" cols="30"
                    rows="25"></textarea>
            </div>
        </div>
            <div class=" col s12">
                
                <a disabled v-if="edit" class=" waves-effect waves-green btn">Confirma</a>
                <a @click="confirmaEdicao" v-if="!edit" class=" waves-effect waves-green btn">Confirma</a>
                <a class="modal-close waves-effect waves-green btn" ref="closeModal">Cancela</a>
            </div>
    </div>
</template>

<script>
import M from "materialize-css"

export default {

    props: {
        pergunta: [],
        atualiza: Number

    },
    data() {
        return {
            resposta: String,
            OldResposta: String,
            edit: false
        }
    },
    computed: {

    },
    mounted() {
        this.OldResposta == this.resposta
    },
    methods: {
        confirmaEdicao: async function () {
            this.$emit("atualiza", { id: this.pergunta.id, resposta: this.resposta })
            this.$refs.closeModal.click()
        }
    },
    expose: ['resposta'],
    watch: {
        atualiza: function () {
            this.resposta = this.pergunta.resposta
            this.OldResposta = this.resposta
            setTimeout(() => {

                const t = document.getElementById("textPergunta")
                M.textareaAutoResize(t);
            }, 200);
        },
        resposta: function () {
            try {
                if (this.OldResposta == this.resposta) {
                    this.edit = true
            } else {
                this.edit = false

            }
            
        } catch (error) {
            console.log(error)

        }
        }
    }
}
</script>

<style scoped>

.modal {
    height: 70%;
}
</style>