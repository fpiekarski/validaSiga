<template>
    <div class="col s12 separador-pergunta">
        <div class="col s10">
            <span>Pergunta: {{index+1}}</span>
            <div class="col s12"></div>
            <div class="col s11 word-wrap">
                <span class="txtdestaque ">{{ txtPergunta }}</span>
            </div>
            <div class="col s11 word-wrap" style="margin-top:1%" >

                <p>{{ respostaPergunta }}</p>
            </div>
        </div>
        <div class="col s1">
            <a @click="editar" v-if="editavel" class="btn"><i class="material-icons">edit</i></a>
        </div>
    </div>
</template>

<script>
export default {

    props: {
        pergunta: [],
        editavel: Boolean,
        index:Number
    },
    computed: {
        txtPergunta: function () {
            return this.pergunta.texto
        },
        respostaPergunta: function () {
            return this.pergunta.resposta ? this.pergunta.resposta : "Sem resposta"
        }
    }, methods: {
        editar: function () {
            this.$emit("editar", { pergunta: this.pergunta })
        }
    }
}
</script>

<style>
.separador-pergunta {
    margin-top: 3%;
    border: 1px dotted grey;
    padding-top: 2% !important;
    padding-bottom: 2% !important;
    border-radius: 16px;
    margin-bottom: 1%;
}
.word-wrap{
    word-wrap:break-word;
    justify-content: center;
    text-align: justify;

}
</style>