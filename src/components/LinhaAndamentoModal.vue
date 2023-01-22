<template>
    <li class="li-collapse col s12 tooltipped" :data-tooltip="textoTooltip">
        <div class="collapsible-header grey lighten-4 text-light-blue text-darken-3" @click="changeIcons"><i class="material-icons">{{ icone }}</i>
            <div class="col s5">

                {{dataAndamento}}
            </div>
            <div class="col s7">


                {{andamento.tx_status}}
        </div>  
        </div>
        <div class="collapsible-body  grey darken-1 white-text">
            <span>{{andamento.funci}} - {{andamento.nome}}</span>
            <p >
               <span style="font-weight: bold"> {{andamento.tx_obs}}</span>
            </p>
        </div>
    </li>
</template>

<script>
  import M from "materialize-css"  
export default {
props:{
    andamento:{}
},
data(){
    return{
        icone:"arrow_drop_down",
        textoTooltip: "clique para detalhar"
    }
},
methods:{

    changeIcons: function(){
       console.log("change")
       this.icone = this.icone == "arrow_drop_down" ?"arrow_drop_up"  :"arrow_drop_down"
       this.textoTooltip = this.textoTooltip == "clique para detalhar" ? "Clique para resumir" : "clique para detalhar"
       document.querySelectorAll('.material-tooltip').forEach(o=> o.style.visibility = "hidden");
       const t = document.querySelectorAll('.tooltipped')
                    M.Tooltip.init(t);
    }
},computed:{
    dataAndamento: function(){

        const data = new Date(this.andamento.datetime)
        return data.toLocaleDateString("pt-BR")+"-"+data.toLocaleTimeString('pt-BR')
    }
}
}
</script>

<style>
   
    .collapsible-header{
        border-radius:16px!important
    }
    .collapsible-body{
        border-radius:16px!important
    }
    .li-collapse{
        border-radius:16px!important
    }
</style>