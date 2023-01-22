<template>
    <div id="modalAndamento" @dblclick="prevent" class="modal">
        <div class="modal-content row col s12">
            <div class="col s8">
                <h5>{{ titulo }}</h5>
                <div class="col s12">
                    {{ pergunta }}
                </div>
                <form @submit="def" autocomplete="off">
                    <div class="col s12">
                        <span class="red-text" v-if="requerido">Obrigatória a inclusão de Observação</span>
                        <div class="input-field col s12 validate">
                            <textarea @select="prevent" id="tArea" ref="textArea" class="materialize-textarea"
                                maxlength="500" data-length="500" @keyup="coun">
                            </textarea>
                            <label for="tArea">{{ txQuestao }}</label>
                            <span class="character-counter" style="float: right; font-size: 12px;">{{ count
                            }}/500</span>
                        </div>
                        <div class="input-field col s12" id="divGsol" v-if="showGsol" >
                            <!-- <i class="material-icons prefix">textsms</i> -->

                            <select readonly  autocomplete="off" required="true" @change="setGsol" v-if="showGsol" ref="inputGsol">
                                <option value="" disabled selected>Selecione Um Gerente de Soluções para efetuar o
                                    despacho </option>
                                <option @onmouseover="showUor" v-for="g in GSol" :key="g.matricula" :data-chave="g.matricula"
                                    :value="g.matricula">
                                    <div :data-chave="g.matricula" class="col s5">
                                        {{ g.nome }}
                                    </div>
                                    <div class="col s4 ">
                                        {{g.nome_uor_trabalho}}
                                    </div>

                                    <div  :data-chave="g.matricula" class=" col s2"
                                        style="margin-top: -3%;margin-left: 7%;">
                                        <img :data-chave="g.matricula" class="rounded" :src="g.img"  alt="">

                                    </div>
                                </option>
                            </select>
                          
                        </div>
                        <div class="input-field col s12" id="prefixo" v-if="showPrefixo" >
                            <select name="prefixo"  autocomplete="off" id="selectPrefixo" v-model="prefixoSelecionado">
                                <option value="" disabled selected>Selecione prefixo para solicitar mais informações
                                </option>
                                <option v-for="g in prefixos" :key="g.CD_DEPE_UOR" 
                                    :value="g.CD_DEPE_UOR">{{g.CD_DEPE_UOR}} - {{g.NM_UOR}}
                                    </option>
                            </select>
                        </div>
                    </div>
                    <div class="col s12">
                        <button type="submit" class="btn">{{ txBotao }}</button>
                        <a class="btn modal-close" ref="closeModal">Cancelar</a>
                    </div>
                </form>
            </div>
            <div class="col s4 center" style="overflow-x:auto">
                <h5>Histórico de Andamentos</h5>
                <ul class="collapsible expandable">
                    <LinhaAndamentoModal v-for=" a in andamentos" :andamento="a" :key="a.id" />
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import M from "materialize-css"
import LinhaAndamentoModal from "./LinhaAndamentoModal"
export default {
    props: {
        andamentos: [],
        nextStatus: {},
        texto: {},
        evento: Number,
        atualizar: Number,
        statusAndamento: Number,
        titulo: String,
        pergunta: String,
        txBotao: String,
        campo: String,
        obsNecessaria: [],
        GSol: [],
        prefixos:[]

    },
    data() {
        return {
            txAnotacao: "",
            requerido: false,
            count: 0,
            gsolSelected: "",
            showGsol: Boolean,
            btn: "ola",
            prefixoSelecionado:0,
            showPrefixo:false

        }
    },
    components: {
        LinhaAndamentoModal
    },
    mounted() {
        M.AutoInit()
        const el = document.querySelector(".collapsible.expandable")
        M.Collapsible.init(el, { accordion: false })

    }, methods: {
        eventoClick: async function () {
              
            this.$emit("setStatus", { textoObs: this.txAnotacao, status: this.statusAndamento, gsol: this.gsolSelected.matricula, prefixo: this.prefixoSelecionado })
        },
        prevent: function (o) {
            o.preventDefault()
            o.stopPropagation()
        },
        def: function (o) {
            o.preventDefault()
            o.stopPropagation()
          
            if (this.statusAndamento == 3 && this.gsolSelected == "") {
              

                    M.toast({ html: "Selecione um Gerente de Soluções para Despachar pela DIOPE" })
                    document.getElementById('divGsol').classList.add("border-warning")
                    setTimeout(() => {
                        document.getElementById('divGsol').classList.remove("border-warning")
                    }, 4500);
                    return false;

            }
            if(this.statusAndamento == 13){
                    if(this.prefixoSelecionado == "" || !this.prefixoSelecionado|| this.prefixoSelecionado == 0){
                        M.toast({html:"Atenção, é necessário selecionar um prefixo para demandar"})
                        document.getElementById('prefixo').classList.add("border-warning")
                         setTimeout(() => {
                        document.getElementById('prefixo').classList.remove("border-warning")
                         }, 4500);
                        return false
                    }
            }
            if (this.requerido && this.txAnotacao != "") {
                if (this.txAnotacao.length < 10) {
                    M.toast({ html: "Insira uma justificativa com mais de 10 caracteres" })
                } else {
                    this.eventoClick()
                    this.txAnotacao = ""
                    this.$refs.closeModal.click()
                }
            } else {
                this.eventoClick()
                // M.toast({html:"Obrigatória a inclusão de Observação"})
                this.$refs.closeModal.click()
                return false
            }
        },
        atualizaGsol: async function () {
            var elems = document.querySelectorAll('select');
            M.FormSelect.init(elems);
        },
        coun: function () {
            this.count = this.$refs.textArea.value.length
            this.txAnotacao = this.$refs.textArea.value

        },
        focus: function (o) {
            //   this.$refs.inputGsol.focus()
            console.log("focus - focuds")
            o.preventDefault()
            const a = document.querySelector('.dropdown-trigger')
            var instance = M.Dropdown.getInstance(a);
            // setTimeout(() => {

            //     console.log(instance)
            if (instance && !instance.isOpen) {
                //         console.log("FOCUS")
                this.$refs.inputGsol.click()
            } else {
                this.$refs.btnTrigger.click()
            }
            // }, 150);
        },
        change: function (e) {
            e.stopPropagation()
            e.preventDefault()
            e.stopImmediatePropagation()
            var elems = document.querySelector('.dropdown-trigger');
            const opt = {
                onCloseEnd: function (a) {
                    a.destroy()
                },
                onOpenEnd: function () {
                    console.log("btn")
                }
            }
            M.Dropdown.init(elems, opt);
            setTimeout(() => {
                this.$refs.btnTrigger.click()
            }, 150)
        },
        open: function (e) {
            const a = document.querySelector('.dropdown-trigger')
            var instance = M.Dropdown.getInstance(a);
            e.stopPropagation()
            e.preventDefault()
            e.stopImmediatePropagation()
            setTimeout(() => {
                var elems = document.querySelectorAll('select');
                M.FormSelect.init(elems);
                if (instance && !instance.isOpen) {
                    console.log("if")
                    this.$refs.btnTrigger.click()

                } else {
                    console.log("else")
                    this.change()
                }
              
            }, 150);
            return false
        },
        setGsol: function (o) {
            const matricula = o.target.value
            const gsolSelected = this.GSol.find(p => p.matricula == matricula)
           
            this.gsolSelected = gsolSelected
            
        },
        showUor: function(){
            console.log("show uor")
        }
    },
    watch: {
        atualizar: function () {
            this.txQuestao = this.campo
            const g = this.obsNecessaria.find(o => o.id == this.statusAndamento)
            this.txAnotacao = ""
            this.$refs.textArea.value = ""
            if (g.obs) {
                this.requerido = true
                console.log(this.$refs.textArea.attributes)
                this.$refs.textArea.setAttribute("required", true)
            } else {
                this.$refs.textArea.removeAttribute("required")
                this.requerido = false
            }
            if (this.statusAndamento == 3) {
                this.showGsol = true
                setTimeout(() => {
                    
                    var elems = document.querySelectorAll('select');
                    M.FormSelect.init(elems);
                    const t = document.querySelectorAll('.tooltipped')
                    M.Tooltip.init(t);
                }, 800);
               
                }else if(this.statusAndamento == 13){
                    this.showPrefixo = true
                    this.showGsol = false
                    this.prefixoSelecionado = 0
                    setTimeout(() => {
                    var elems = document.querySelectorAll('select');
                    M.FormSelect.init(elems);
                    const t = document.querySelectorAll('.tooltipped')
                    M.Tooltip.init(t);
                }, 800);
            } else {
                this.showGsol = false
                this.showPrefixo = false
            }
            M.updateTextFields();
        },

    },
    computed: {
        txQuestao: function () {
            if (this.statusAndamento == 12 || this.statusAndamento == 11) {
                const atual = this.andamentos.find(o => o.vigente == 1)
                return atual.tx_obs
            } else {
                return this.campo
            }
        },
    }
}

</script>

<style>
ul.collapsible {
    box-shadow: none;
    border: none
}

.modal {
    width: 80% !important;
    height: 90% !important
}

#dropdown1 {
    width: 400px !important;
    transform: translate(-110% 0) !important;
    height: 450px !important;
    position: fixed;
    left: 50%
}

.border-warning {
    border: 2px dotted red
}

ul.dropdown-content.select-dropdown > li:hover img{
height: 80px!important;
width: 80px!important;

}
ul.dropdown-content.select-dropdown > li:hover{
height: 80px!important;
font-weight: bold;
}
li > span > div > img:hover{
height:80px!important;
width: 80px!important;
}
</style>