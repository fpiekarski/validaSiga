<template>
  <div class="botao-componente">
    <a @click="click" :class="`btn btn-andamento ${classe} tooltipped`" :data-tooltip="txTooltip">
      <div class="col s12 row left-align" style="padding-left:-15px; vertical-align: middle;">
        <!-- <div class="col s1"> -->

          <i :class="`material-icons realce ${iconClass}`" style="margin-right:2%">{{icon}}</i>
        <!-- </div> -->
        <!-- <div class="col s10 left-align"> -->

          {{ txBtn }}
        <!-- </div> -->
      </div>
    </a>
  </div>
</template>
<script>
  import M from "materialize-css"
export default {
  props: {
    txBtn: String,
    classe: String,
    evento: String,
    icon: String,
    iconClass: String,
    txTooltip:String
  }, methods: {
    click: function () {
      this.$emit("clicou", this.evento)
    }
  }, mounted(){
    M.AutoInit()
  }
}
</script>

<style>
.botao-componente {
  margin-top: 2.5%
}

.btn-andamento {
  width: 100%;
  min-height: auto;
  white-space: normal !important;
  word-wrap: break-word!important;
  
}
.icon-black{
  background: black;
}
.realce{
  
}
.small-text{
  font-size: small;
}
</style>