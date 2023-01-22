<template>
    <div v-if="visivel" class="card blue-grey lighten-1" style="position: absolute; height: 100px;width: 350px;">
        <div class="card-content white-text"  style="height: 250px!important;">
            <div v-if="dadosFunci.length != {}" class="card-title">
                <div class="row col s12" style="height:350px;padding:0!important">
                    <div class="col s12">
                        {{ dadosFunci.nome }}
                    </div>
                    <div class="col s12">
                        {{ dadosFunci.cargo.nome }}
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import pesquisa from '../services/pesquisa';
export default {
    props: {
        funci: String,
        visivel: Boolean,
        atualizar:Number
    },
    mounted() {

        this.getDadosFunci()
    },
    data() {
        return {
            dadosFunci: {nome:"", cargo:{nome:""}}
        }
    },
    methods: {
        getDadosFunci: async function () {
            const f = await pesquisa.post("dadosFunci", { funci: this.funci })
            this.dadosFunci = f.data
        }
    },
    watch:{
        atualizar: function(){
            this.getDadosFunci()
        }
    }
}
</script>

<style>

</style>