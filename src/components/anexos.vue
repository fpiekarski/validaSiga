<template>
  <div class="row col s12">
    <h5>Anexos</h5>
    <ul>
        <li v-for="a in anexos" :key="a.id">
        <a class="tooltipped" target="_blank" data-tooltip="Clique para baixar o anexo" :href="`https://pxl0hosp0266.dispositivos.bb.com.br${a.link}`"><i class="material-icons">attach_file</i>{{a.nomeAnexo}}</a>
        </li>
    </ul>
  </div>
</template>

<script>
import M from "materialize-css"
export default {
    props:{
        anexo:[]
    },
    methods:{
        recuperaAnexo: async function(e){
            console.log(e)
        }
    },
    mounted(){
        M.AutoInit()
    },
    computed:{
        anexos: function(){
            const t = []
            this.anexo.map(k=>{
                const c = document.createElement("span")
                c.innerHTML = k
                const l = c.children[0]
                const link = l.getAttribute('href')
                const doc = l.innerHTML.trim()

                t.push({nomeAnexo:doc,link })

            })
            return t
        }

    }
}
</script>

<style>
a:hover{
    cursor:pointer
}
</style>