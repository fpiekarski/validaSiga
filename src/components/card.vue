<template>
  <div class="row col s6" >
    <div class="col s12 bold medfont">{{tipoAndamento}}</div>
    <div class="col s12">
        <div class="col s2"><a :href="`https://humanograma.intranet.bb.com.br/${chaveFunci}`" target="_blank"><img class="rounded" :src="avatarFunci" alt=""></a></div>
        <div class="col s9 andamento ">
            <div class="col s12  bold">{{chaveFunci}}</div>
            <div class="col s12 ">{{textoAndamento}}</div>
            <div class="col s12">
            <div class="col s8 offset-s5 ">{{dataAndamento}}</div>

            </div>

        </div>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        andamento:{}
    },computed:{
    tipoAndamento: function(){
        return this.andamento.tipoAndamento
    },
    avatarFunci: function(){
        return `https://humanograma.intranet.bb.com.br/avatar/${this.andamento.cd_funci_msg}`
        //return this.andamento.avatarFunci
    },
    chaveFunci: function(){
        return this.andamento.cd_funci_msg
    },
    textoAndamento: function(){
        return this.andamento.mensagem
    },
    dataAndamento: function(){
        const r = new Date(this.andamento.ts_msg)
        return r.toLocaleDateString("pt-BR") + "-"+r.toLocaleTimeString("pt-BR")
    },
    }
}
</script>

<style>
.andamento{
    background-color: rgba(0, 45, 75, 0.15)!important;
    border-radius: 6px;
    border-left: 1px solid grey;
    margin-left: 4%!important
}
.rounded {
    border-radius: 50%;
    height: 65px;
}
.bold {
    font-weight: bold;
}
.medfont {
    font-size: 1rem;
}
</style>