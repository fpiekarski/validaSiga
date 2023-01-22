<template>
  <div class="col s12" style=" margin-top=3%;padding-top: 2%;">
     <div :class="`col s1 `"></div>
    <div :class="`col s1 rounded`">
        <i :class="`material-icons ${statusColor}`">{{statusIcone}}</i>
    </div>
    <div class="col s10 bold destaqueTexto">{{statusTexto}}</div>
  </div>
</template>

<script>
export default {
    props:{
        status:{}    
    },
    computed:{
        statusIcone: function(){
            return this.status.statusIcone.tx
        },
         statusTexto: function(){
            return this.status.tx_status
        },
         statusColor: function(){
            return this.status.statusIcone.color
        },
    }
}
</script>

<style>

.destaqueTexto{
  font-family: BancoDoBrasil Titulos Medium, Calibri, sans-serif;
  font-size: 17px;
  margin-bottom: 2%!important;
}
</style>