<template>
        <li Tabindex="0" aria-label="" class="ng-scope ng-isolate-scope timeline--info">
          <article >
            <time  class="ng-binding ng-hide" style="font-size: 10px;">{{time}} </time>
            <p class="ng-binding">{{status}}</p>
            <small class="ng-binding" style="font-size: 10px;">Responsável</small><br>
            <small class="ng-binding" style="font-size: 10px;">{{chaveFunci}} - {{nomeFunci}}</small>
            <div class="timeline__details ng-binding" tabindex="0"></div>
            <div class="col s12" v-if="tx_obs.length > 0">
              <div class="col s12">Observação</div>
              <div class="col s12">{{tx_obs}}</div>
            </div>
          </article>
        </li>
</template>

<script>
export default {
 props:{
 fase:{}

 },
 computed:{
  time: function(){
    const date =  new Date(this.fase.datetime)
    return date.toLocaleDateString('pt-BR') + "-" +date.toLocaleTimeString('pt-BR',{timeZone: "America/Araguaina"})
  },
  nomeFunci: function(){
    return this.fase.nome
  },
  chaveFunci: function(){
    return this.fase.funci
  },
  status: function(){
    return this.fase.tx_status
  },
  tx_obs: function(){
    return this.fase.tx_obs || ""
  }
 }
}
</script>

<style>
  li{
    box-sizing: unset;
  }
</style>