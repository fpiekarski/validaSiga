<template>
    <div class="col row s12 " style="padding: 2% 4% 3%;">
        <div class="col row s12 white black-text container-inf" style=" height: 125px; padding-top:2%">
            <div class="col  goBack" style="margin-left:1%" @click="returnBack">
                <div class="col s12 ">
                    <i class="material-icons">arrow_back</i>
                </div>
                <div class="col s12">
                    voltar
                </div>
            </div>
            <div class="col s1" style="margin-left:1%">
                Protocolo Siga
                <p class="txtdestaque">{{ nrProtocolo }}</p>
            </div>
            <div class="col s3">
                Nome do Produto
                <p class="txtdestaque">{{ nomeProduto }}</p>
            </div>
            <div class="col s1">
                {{ tipoProtocolo }}
                <p class="txtdestaque"><i class="material-icons blue-text">{{ icone }}</i></p>
            </div>
            <div class="col s2">
                Data de Entrada
                <p class="txtdestaque">{{ dataProtocolo }}</p>
            </div>
            <div v-show="sts" class="col s3 center ">
                <div>
                    Status:
                </div>
                <div>
                    <i :class="`material-icons ${iconeColor}`">{{ iconeTx }}</i>
                </div>
                <div>{{ statusProtocolo.tx_status }}</div>
            </div>
        </div>
        <div class="col s12 center" v-show="aguardando">
            <img src="../assets/loading.gif" alt="" srcset="">
        </div>

        <div class="col row s12 white black-text container-inf" style="margin-top: 4px">
            <div class="col s9">


                <div class="col s12">
                    <div class="col s12 ">

                        <!-- <div class="col s3">
                            Produto
                            <p class="txtdestaque2">{{ tipoProduto }}</p>
                        </div> -->
                        <div class="col s2">
                            Protocolo Siga
                            <p class="txtdestaque2">{{ nrProtocolo }}</p>
                        </div>
                        <div class="col s6" @click="openHuman" @mouseenter="cardVisivel=true" @mouseleave="cardVisivel=false">
                            <a target="_blank" ref="linkHuman"
                                :href="`https://humanograma.intranet.bb.com.br/${protocolo.cd_funci_rsp_incl}`">
                                <!-- <div class="flip-card"> -->
                                Demandante
                                <!-- <div class="flip-card-inner"> -->
                                <!-- <div class="flip-card-front"> -->
                                <p class="txtdestaque2">
                                    <img class="rounded"
                                        :src="`https://humanograma.intranet.bb.com.br/avatar/${protocolo.cd_funci_rsp_incl}`"
                                        style="height:35px">
                                    {{ protocolo.cd_funci_rsp_incl }} - {{
                                            protocolo.NOME
                                    }}
                                </p>
                                <cardFunci :funci="protocolo.cd_funci_rsp_incl" :visivel="cardVisivel" :atualizar="atualizar"/>
                                <!-- </div> -->
                                <!-- <div class="flip-card-back"> -->
                                <!-- </div> -->
                                <!-- </div> -->

                                <!-- </div> -->
                            </a>
                        </div>
                        <div class="col s2" style="margin-right:0%">
                            Prefixo
                            <p class="txtdestaque2">{{ protocolo.pref_slc }}</p>
                        </div>
                        <div class="col s2 card center " v-if="!ganhoCliente">
                            <div class="col s6 ">
                                <div class="row ">


                                    <span>{{ ganho }}</span>
                                </div>
                                <span v-bind:class="{'tooltipped':tooltipValor !=''}" :data-tooltip="tooltipValor">{{ protocolo.ganho }}{{ protocolo.valorFinanceiro }}</span>
                            </div>
                            <div class="col s6">
                                <div class="row">
                                    <span>FTE</span>
                                </div>

                                <span>{{ protocolo.FTE != "" ? protocolo.FTE : 0 }}</span>
                            </div>
                        </div>
                        <div class="col s2 card center" v-if="ganhoCliente">
                            <div class="col s12">
                                <div class="row">
                                    <span>Ganho Cliente</span>
                                </div>
                                <i class="material-icons tooltipped" :data-tooltip="msgGanhoCliente">
                                    group_add
                                </i>


                            </div>
                        </div>
                    </div>
                    <div class="col s12 separador-horizontal">
                        <div class="col s12">
                            <span class="txtdestaque"> Descrição:</span>
                        </div>
                        <div class="col s8">
                            <p>{{ descricaoProtocolo }}</p>
                        </div>
                    </div>
                    <div class="col s12 separador-horizontal">
                        <Questao v-for="(p, i) in perguntas" @editar="editarPerguntas" :index="i" :editavel="editavel"
                            :key="p.id" :pergunta="p" />
                    </div>
                    <div class="col s12 borderTop">
                        <Anexos :anexo="anexo" />
                    </div>
                    <div class="col s12 borderTop">
                        <Card v-for="c in andamentos" :key="c.id" :andamento="c" />
                    </div>
                    <div class="col s12 borderTop">
                        <Status v-if="sts" :status="statusProtocolo" />
                    </div>
                </div>

                <EditaQuestao @atualiza="atualizaResposta" :pergunta="perguntaAtual" :txResposta="respostaAtual"
                    :atualiza="atualiza" />
                <a class="modal-trigger" ref="modalPerguntasTrigger" href="#modalPerguntas"></a>
            </div>
            <div class="col s3">
                <div class="row col s12 box-shadow" style="margin-top:2%" v-show="btnShow" v-if="btnFases.length > 0">
                    <div class="col s12">
                        Ações:
                    </div>


                    <Btn v-for="b in btnFases" :key="b.t" @clicou="clickEvento" :txBtn="b.txBtn" :evento="b.evento"
                        :classe="b.classe" :txTooltip="b.txTooltip" :iconClass="b.iconClass" :icon="b.icon" />
                </div>
                <div class="col s12">


                    <TimelineVue :fases="fases" />
                </div>
            </div>

        </div>
        <ModalAndamento :statusAndamento="statusAndamento" :obsNecessaria="obsNecessaria" :titulo="titulo"
            :pergunta="pergunta" :showGsol="showGsol" :campo="campo" :txBotao="txBotao" @setStatus="atualizaFase"
            :atualizar="atualizaModal" :andamentos="fases" :GSol="GSol" :prefixos="prefixos" />
        <a class="waves-effect waves-light btn modal-trigger hide" ref="abreModalAndamento" href="#modalAndamento"></a>
    </div>
</template>

<script>
import Questao from "./questao"
import Card from "./card"
import Anexos from "./anexos"
import Status from "./status"
import pesquisa from '../services/pesquisa'
import Btn from "./Btn"
import M from "materialize-css"
import editaQuestao from "./editaQuestao.vue"
import EditaQuestao from "./editaQuestao.vue"
import TimelineVue from "./Timeline.vue"
import ModalAndamento from "./ModalAndamento.vue"
import { useRoute } from 'vue-router'
import cardFunci from "./cardFunci.vue"
export default {
    setup() {
        useRoute()
    },
    props: {
        protocolo: [],
        acessos: [],
        atualizar: Number,
        user: {},
    },
    components: {
        Questao,
        Card,
        Anexos,
        Status,
        Btn,
        editaQuestao,
        EditaQuestao,
        TimelineVue,
        ModalAndamento,
        cardFunci

    },
    data() {
        return {
            icones: [{ id: 1, tx: "fiber_new", texto: "Desenvolvimento" }, { id: 3, tx: "extension", texto: "Melhoria" }],
            anexo: [],
            statusProtocolo: { statusIcone: { tx: "timer", cd_status: 1, statusTexto: "Pendente de Validação pelo Comitê da Dependência", color: "lime accent-2 black-text" } },
            perguntas: [],
            andamentos: [],
            statusIcones: [
                { id: 1, tx: "timer", color: "grey lighten-1 white-text" },
                { id: 2, tx: "open_in_browser", color: "light-blue lighten-1 white-text" },
                { id: 3, tx: "priority_high", color: " light-blue darken-4 white-text" },
                { id: 4, tx: "check", color: " green accent-4  black-text" },
                { id: 5, tx: "check", color: "green darken-4  white-text" },
                { id: 6, tx: "clear", color: "deep-orange accent-3 white-text" },
                { id: 7, tx: "clear", color: " deep-orange accent-4 white-text" },
                { id: 8, tx: "cancel", color: "red accent-4 white-text" },
                { id: 9, tx: "question_answer", color: "deep-orange accent-3 white-text" },
                { id: 13, tx: "question_answer", color: "deep-orange accent-3 white-text" },
                { id: 14, tx: "question_answer", color: "deep-orange accent-3 white-text" }],
            sts: false,
            botoes: [
                { txBtn: "Efetuar Despacho", txTooltip: "Efetuar Despacho", icon: "check", t: 1, evento: "solicitaDespachoPrefixo", iconClass: " text-blue-grey text-darken-2", classe: "light-green lighten-4 black-text" },
                { txBtn: "Solicitar Complemento", txTooltip: "Solicitar Complemento aso demandante", icon: "question_answer", t: 2, evento: "solicitaComplemento", iconClass: "text-blue-grey text-darken-1", classe: "light-blue lighten-4 black-text" },
                { txBtn: "Despacho Diope", txTooltip: "Enviar para despacho da Diope", icon: "check", t: 5, evento: "solicitaDespachoDiope", iconClass: "text-blue-grey text-darken-2", classe: "light-green lighten-4 black-text" },
                { txBtn: "Complemento a Dependência", txTooltip: "Solicitar complemento a Dependência", icon: "question_answer", t: 4, evento: "solicitaComplementoDiope", iconClass: "text-blue-grey text-darken-2", classe: "light-blue lighten-4 black-text small-text" },
                { txBtn: "Responder Complemento", txTooltip: "Responder Complemento", icon: "textsms", t: 10, evento: "respondeComplemento", iconClass: "text-blue-grey text-darken-2", classe: "teal lighten-4 black-text" },
                { txBtn: "Responder a DIOPE", txTooltip: "Responder complemento da DIOPE", icon: "textsms", t: 9, evento: "respondeComplementoDiope", classe: "teal lighten-3 black-text" },
                { txBtn: "Rejeitar pela DIOPE", txTooltip: "Rejeitar pela DIOPE", icon: "cancel", t: 7, evento: "rejeitarDIOPE", iconClass: " text-blue-grey text-darken-2 ", classe: " red lighten-3 black-text icon-black" },
                { txBtn: "Rejeitar pelo Comitê", txTooltip: "Rejeitar pelo Comitê", icon: "cancel", t: 6, evento: "rejeitarComite", iconClass: " text-blue-grey text-darken-2", classe: " red lighten-3 black-text icon-black" },
                { txBtn: "Cancelar", txTooltip: "Cancelar", icon: "delete", t: 8, evento: "cancela", iconClass: "text-blue-grey text-darken-2", classe: "red  lighten-3 black-text" },
                { txBtn: "Insere Anotação", txTooltip: "Insere Anotação", t: 11, evento: "insereObs", iconClass: "text-blue-grey text-darken-2", classe: "red lighten-3 black-text" },
                { txBtn: "Complemento outra Dependência", txTooltip: "Solicitar complemento a outra Dependência", icon: "question_answer", t: 13, evento: "solicitaComplementoOutraDependencia", iconClass: "text-blue-grey text-darken-3", classe: "light-blue lighten-3 black-text small-text" },
                { txBtn: "Responder Complemento outra Dependência", txTooltip: "Responder complemento a outra Dependência", icon: "question_answer", t: 14, evento: "respondeComplementoOutraDependencia", iconClass: "text-blue-grey text-darken-3", classe: "light-blue lighten-3 black-text small-text" },

            ],
            respostaAtual: String,
            perguntaAtual: String,
            atualiza: 1,
            fases: [],
            textoAndamento: {},
            btnShow: false,
            btnFases: [],
            atualizaModal: 1,
            titulo: "",
            pergunta: "",
            campo: "",
            txBotao: "",
            statusAndamento: "",
            numeroProtocolo: Number,
            acessosFase: [],
            editavel: false,
            GSol: [],
            showGsol: false,
            chavesTeste: [],
            aguardando: false,
            ganhoCliente: false,
            showAvatar: false,
            prefixos: [],
            tooltipValor :"",
            cardVisivel:false,
            prefixoSubordinado:[]
        }
    },

    async mounted() {

        this.verificaUrl()



    },

    watch: {
        atualizar: async function () {
            console.log("atualizar")
            this.btnShow = false
            const icon = this.icones.find(o => o.id == this.protocolo.tipo)
            this.tipoProtocolo = icon.texto
            await this.returnStatus()
            this.returnPerguntas()
            this.returnAndamentos()
            this.returnAnexos()
            this.verificaTestes()
            await this.returnFases()
            await this.retornaBtnFases()
            this.btnShow = true
            await this.atualizaGsol()
            await this.getPrefixos()
            // return "dashboard"
        }

    }
    ,
    computed: {
        icone: function () {
            const icon = this.icones.find(o => o.id == this.protocolo.tipo)
            const i = icon ? icon.tx : "dashboard"
            return i
        },
        ganho: function () {
            this.calculaValores()
            return this.protocolo.ganho == "+" ? "Ganho" : "Economia"
        },

        nomeProduto: function () {
            return this.protocolo.nome
        },
        nrProtocolo: function () {
            return this.protocolo.id
        },
        nomeProjeto: function () {
            return this.protocolo.descricao
        },
        status: function () {
            return this.protocolo.tx_status
        },
        prefixoProjeto: function () {
            return this.protocolo.pref_slc
        },
        nomeSolicitante: function () {
            return this.protocolo.cd_funci_rsp_incl
        },
        dataProtocolo: function () {
            const d = new Date(this.protocolo.ts_status)
            return d.toLocaleDateString("pt-BR") + "-" + d.toLocaleTimeString("pt-BR")
        },
        iconeColor: function () {
            const f = ""
            return f
        },
        iconeTx: function () {
            if (this.statusProtocolo.statusIcone) {

                const f = this.statusProtocolo.statusIcone.tx ? this.statusProtocolo.statusIcone.tx : ""
                return f
            } else {
                return ""
            }
        },


    },
    methods: {
        // befor: function (to, from, next) {
        // },
        openHuman: function () {
            console.log("click")
            this.$refs.linkHuman.click()
        },
        returnBack: async function () {
            this.faseAtual = []
            this.$emit("returnBack")
            this.$router.push({ path: `/`, replace: true })

        },
        returnPerguntas: async function () {
            const perguntas = await pesquisa.getPerguntasProtocolos(this.protocolo.id)
            this.perguntas = perguntas.data
        },
        returnAndamentos: async function () {
            const andamentos = await pesquisa.getAndamentosProtocolo(this.protocolo.id)
            this.andamentos = andamentos.data
        },
        returnAnexos: async function () {
            const anexos = await pesquisa.getAnexos(this.protocolo.id)
            // const anexos = await pesquisa.getAnexos(this.protocolo.id)
            const anx = anexos.data
            const treat = anx.replace(/<div>/g, "").replace(/<\/div>/g, "").replace(/\n/g, "").trim()
            const links = treat.split("<br />")
            this.anexo = links.filter(p => p.length > 0)
        },
        carregaAndamentos: async function () {
            const t = await pesquisa.getAndamentosProtocolo(this.protocolo.id)
            this.andamentos = t.data;
        },
        solicitaDespachoPrefixo: function () {
            this.titulo = "Despachar pelo Prefixo"
            this.pergunta = "Deseja autorizar o protocolo, para encaminhamento a DIOPE?"
            this.campo = "Observações referentes ao Despacho"
            this.txBotao = "Despachar"
            this.statusAndamento = 3
            this.atualizaModal++
            this.$refs.abreModalAndamento.click()


        },
        solicitaComplemento: function () {
            this.titulo = "Solicitar Complemento"
            this.pergunta = "Será solicitado Complemento ao funcionário que registrou o Protocolo"
            this.campo = "Descreva que tipo de complemento precisa"
            this.txBotao = "Solicitar Complemento"
            this.statusAndamento = 2
            this.atualizaModal++
            this.$refs.abreModalAndamento.click()
        },
        solicitaComplementoDiope: function () {
            this.titulo = "Solicitar Complemento"
            this.pergunta = "Será solicitado Complemento ao funcionário que registrou o Protocolo"
            this.campo = "Descreva que tipo de complemento precisa"
            this.txBotao = "Solicitar Complemento"
            this.statusAndamento = 9
            this.atualizaModal++
            this.$refs.abreModalAndamento.click()
        },
        solicitaComplementoOutraDependencia: function () {
            this.titulo = "Solicitar Complemento"
            this.pergunta = "Será solicitado Complemento ao prefixo selecionando"
            this.campo = "Descreva que tipo de complemento precisa"
            this.txBotao = "Solicitar Complemento"
            this.statusAndamento = 13
            this.atualizaModal++
            this.$refs.abreModalAndamento.click()
        },
        respondeComplementoOutraDependencia: function () {
            this.titulo = "Responder Complemento outro prefixo"
            this.pergunta = "Responda ao complemento solicitado"
            this.campo = ""
            this.txBotao = "Responder Complemento"
            this.statusAndamento = 14
            this.atualizaModal++
            this.$refs.abreModalAndamento.click()
        },
        solicitaDespachoDiope: function () {
            this.titulo = "Despachar pelo Prefixo"
            this.pergunta = "Deseja autorizar o protocolo, para encaminhamento a DIOPE?"
            this.campo = "Observações referentes ao Despacho"
            this.txBotao = "Despachar"
            this.statusAndamento = 3
            this.atualizaModal++
            this.$refs.abreModalAndamento.click()
        },
        despacharDiope: function () {
            this.titulo = "Despachar pela DIOPE"
            this.pergunta = "Deseja validar o protocolo, autorizando o  desenvolvimento?"
            this.campo = "Observações referentes ao Despacho"
            this.txBotao = "Despachar"
            this.statusAndamento = 5
            this.atualizaModal++
            this.$refs.abreModalAndamento.click()
        },
        respondeComplemento: function () {
            this.titulo = "Responder Complemento Solicitado"
            this.pergunta = "Responda ao questionamento solicitado"
            this.campo = ""
            this.txBotao = "Enviar"
            this.statusAndamento = 11
            this.atualizaModal++
            this.$refs.abreModalAndamento.click()
        },
        respondeComplementoDiope: function () {
            this.titulo = "Responder Complemento Solicitado pela Diope"
            this.pergunta = "Responda ao questionamento da DIOPE"
            this.campo = ""
            this.txBotao = "Enviar"
            this.statusAndamento = 12
            this.atualizaModal++
            this.$refs.abreModalAndamento.click()
        },
        rejeitarDiope: function () {
            this.titulo = "Rejeitar o protocolo pela DIOPE"
            this.pergunta = "Deseja marcar o protocolo como rejeitado pela Diope?"
            this.campo = "Se desejar, coloque uma justificativa"
            this.txBotao = "Rejeitar"
            this.statusAndamento = 7
            this.atualizaModal++
            this.$refs.abreModalAndamento.click()
        },
        rejeitarComite: function () {
            this.titulo = "Rejeitar o protocolo pelo Comitê"
            this.pergunta = "Deseja marcar o protocolo como rejeitado pelo Comitê da dependência?"
            this.campo = "Se desejar, coloque uma justificativa"
            this.txBotao = "Rejeitar"
            this.statusAndamento = 6
            this.atualizaModal++
            this.$refs.abreModalAndamento.click()
        },
        cancela: function () {
            this.titulo = "Cancelar o Protocolo"
            this.pergunta = "Deseja cancelar o protocolo sem avaliação da viabilidade?"
            this.campo = "Se desejar, coloque uma justificativa"
            this.txBotao = "Cancela Protocolo"
            this.statusAndamento = 8
            this.atualizaModal++
            this.$refs.abreModalAndamento.click()
        },
        returnStatus: async function () {
            const t = await pesquisa.getStatusAtual(this.$router.currentRoute.value.params.id)
            if (t.data.length == 0) {
                this.statusProtocolo = {
                    cd_prc: this.protocolo.id,
                    "tx_status": "Pendente de Despacho da Dependência",
                    cd_status: 0,
                    statusIcone: { id: 0, tx: "timer", color: "lime accent-2 black-text" }
                }
            } else {
                this.statusProtocolo = t.data[0]
                const ic = this.statusIcones.find(l => l.id == this.statusProtocolo.cd_status)
                const status = this.statusProtocolo
                status.statusIcone = ic
            }
            const edit = await pesquisa.permiteEdicao(this.protocolo.id)
            if (edit.data.msg.find(k => k.id == this.statusProtocolo.cd_status)) {
                if (this.protocolo.pref_slc == this.user.prefixo || this.chavesTeste.find(o => this.user.chave == o.chave)) {

                    this.editavel = true
                } else {
                    this.editavel = false
                }
            } else {
                this.editavel = false
            }
            if (this.statusProtocolo.cd_status == 1 || this.statusProtocolo.cd_status == 0) {
                this.showGsol = true
            } else {
                this.showGsol = false
            }
            this.sts = true
            var elems = document.querySelectorAll('.tooltipped');
            M.Tooltip.init(elems);
        },
        clickEvento: async function (a) {
            console.log(a)
            if (a == "solicitaDespachoPrefixo") {
                this.solicitaDespachoPrefixo()
            } else if (a == "solicitaComplemento") {
                this.solicitaComplemento()
            } else if (a == "solicitaComplementoDiope") {
                this.solicitaComplementoDiope()
            } else if (a == "solicitaDespachoDiope") {
                this.despacharDiope()
            } else if (a == "solicitaCancelamento") {
                this.cancela()
            } else if (a == "respondeComplemento") {
                this.respondeComplemento()
            } else if (a == "respondeComplementoDiope") {
                this.respondeComplementoDiope()
            } else if (a == "rejeitarDIOPE") {
                this.rejeitarDiope()
            } else if (a == "solicitaComplementoOutraDependencia") {
                this.solicitaComplementoOutraDependencia()
            } else if (a == "rejeitarComite") {
                this.rejeitarComite()
            }else if (a == "respondeComplementoOutraDependencia") {
                this.respondeComplementoOutraDependencia()
            } else {
                this.cancela()
            }


        },
        editarPerguntas: async function (e) {
            this.perguntaAtual = e.pergunta
            this.atualiza++
            this.$refs.modalPerguntasTrigger.click()
        },
        atualizaResposta: async function (a) {
            const { resposta, id } = a
            console.log(resposta, id)
            const retorno = await pesquisa.updateResposta(resposta, id)
            this.perguntas = []
            M.toast({ html: retorno.data.msg })
            this.returnPerguntas()
            if (retorno.status == 200) {
                this.returnPerguntas()
            }

        },
        returnFases: async function () {

            const fases = await pesquisa.getFases(this.protocolo.id)
            if (fases.length == 0) {
                fases.status = 0
            }
            this.fases = fases.data
            this.retornaBtnFases()
            this.btnShow = true

        },
        atualizaFase: async function (o) {
            this.btnShow = false
            this.aguardando = true
            const { textoObs, status, gsol, prefixo } = o
            this.numeroProtocolo = this.$router.currentRoute.value.params.id

            const retorno = await pesquisa.updateStatus(this.numeroProtocolo, status, textoObs, gsol, prefixo)
            console.log(retorno.data.msg)
            M.toast({ html: retorno.data.msg })
            this.aguardando = false
            this.verificaUrl()
        },
        retornaStatusAtual: async function () {
            const status = await pesquisa.getStatusAtual(this.$router.currentRoute.value.params.id)
            console.log(status.data)
        },
        retornaBtnFases: async function () {
            var possiveis = []
            const retorno = []
            this.btnFases = []
            const statusAtual = this.statusProtocolo.cd_status != "" ? this.statusProtocolo.cd_status : 0
            const acessoFase = await pesquisa.acessosFase(statusAtual)
            const obsNecessaria = await pesquisa.getObsNecessaria()
            this.acessosFase = acessoFase.data
            this.obsNecessaria = obsNecessaria.data
            const f = await pesquisa.get('retornaPrefixoSubordinado')
            this.prefixoSubordinado = f.data
            await new Promise((resolve) => {

                this.acessosFase.map(l => {
                    if (this.user.prefixo == this.protocolo.pref_slc || this.chavesTeste.find(f => f.chave == this.user.chave) || (this.prefixoSubordinado.find(o=> o.prf_princ == this.user.prefixo  && this.protocolo.pref_slc == o.prf_sub ))){
                        console.log("l.fase", l.fase_liberada)
                        possiveis.push(l.fase_liberada)
                    }
                })
                if (this.user.prefixo == "9600" || this.chavesTeste.find(f => f.chave == this.user.chave)) {
                    console.log("chave teste autorizada")
                    this.botoes.map(o => {
                        if (acessoFase.data.find(l => l.fase_liberada == o.t)) {

                            retorno.push(o)
                        }
                    })
                    resolve()
                } else {

                    this.botoes.map(o => {
                        const fase = acessoFase.data.find(l => l.fase_liberada == o.t)
                        if (fase && fase.restrito != 2) {
                            if (this.acessos.find(k => k.id_fase == o.t)) {
                                if (this.user.prefixo == this.protocolo.pref_slc || this.chavesTeste.find(f => f.chave == this.user.chave) || this.user.prefixo == "4011"||(this.prefixoSubordinado.find(o=> o.prf_princ == this.user.prefixo  && this.protocolo.pref_slc == o.prf_sub ))) {
                                    retorno.push(o)
                                }
                            }
                        }
                    })
                    resolve()
                }
            })
            this.btnFases = retorno
        },
        verificaTestes: async function () {
            const t = await pesquisa.getTeste()
            this.chavesTeste = t.data
        },
        verificaUrl: async function () {
            this.btnShow = false
            if (!this.$router.currentRoute.value.params.id) {
                window.location = window.location.href.split("protocolo")[0]
            }

            this.$router.push({ path: `/protocolo/${this.protocolo.id}` })
            await this.returnStatus()
            this.returnPerguntas()
            this.returnAndamentos()
            this.returnAnexos()
            this.verificaTestes()
            await this.returnFases()
            await this.retornaBtnFases()
            this.btnShow = true
            await this.atualizaGsol()
            await this.getPrefixos()
        },
        atualizaGsol: async function () {
            const gsol = await pesquisa.getGSol()
            var obj = [];
            gsol.data.map(p => {

                obj.push({ matricula: p.matricula, nome: p.nome, img: `https://humanograma.intranet.bb.com.br/avatar/${p.matricula}`, nome_uor_trabalho: p.nome_uor_trabalho })

            })

            this.GSol = obj
        },
        calculaValores: async function () {
            const p = this.protocolo
            p.FTE = 0
            if(!p.perguntas){
                const perguntas = await pesquisa.getPerguntasProtocolos(this.protocolo.id)
                p.perguntas = perguntas.data
            }
            p.valorFinanceiro = 0
            const perg56 = p.perguntas.find(o => o.id_pergunta == 56)
            const perg59 = p.perguntas.find(o => o.id_pergunta == 59)
            const perg61 = p.perguntas.find(o => o.id_pergunta == 61)
            const perg66 = p.perguntas.find(o => o.id_pergunta == 66)
            // console.log(this.linha.id, perg56, perg59)
            p.ganho = ""
            const descricao = [{t:"K",tx:"MIL"},{t:"M",tx:"MILHÃO"},{t:"B","tx":"BILHÃO"}]
            if (perg56) {
                if (perg56.resposta == "ganho") {
                    p.ganho = "+"
                } else {
                    p.ganho = "-"
                }
                const perg57 = p.perguntas.find(o => o.id_pergunta == 57)
                const perg58 = p.perguntas.find(o => o.id_pergunta == 58)
                if (perg57 && perg58.resposta == "mes") {
                    const v = perg57.resposta.replace(/\./g, "")
                    const g = this.m((parseFloat(v) * 12), 2)
                    p.valorFinanceiro =g.valor + g.sigla
                    const s = descricao.find(o=> o.t == g.sigla)
                    this.tooltipValor = s.tx
                } else if (perg57 && perg58.resposta == "dia") {
                    const v = perg57.resposta.replace(/\./g, "")

                    const g = (this.m(((parseFloat(v) * 30) * 12), 2))
                    p.valorFinanceiro =g.valor + g.sigla
                    const s = descricao.find(o=> o.t == g.sigla)
                    this.tooltipValor = s.tx

                } else if (perg57 && perg58.resposta == "ano") {
                    const v = perg57.resposta.replace(/\./g, "")

                    const g = this.m(parseFloat(v), 2)
                    p.valorFinanceiro =g.valor + g.sigla
                    const s = descricao.find(o=> o.t == g.sigla)
                    this.tooltipValor  = s.tx
                }
            } else if (perg59) {
                const perg60 = p.perguntas.find(o => o.id_pergunta == 60)
                if (perg60) {

                    p.FTE = ((parseInt(perg60.resposta) * parseInt(perg59.resposta)) / 360).toFixed(2)
                } else {
                    console.log(p)
                }

            } else if (perg61) {
                p.FTE = (parseInt(perg61.resposta) / 360).toFixed(2)

            } else if (perg66) {

                this.ganhoCliente = true
                this.msgGanhoCliente = perg66.resposta
            }
        },
        mostraAvatar: function () {
            this.showAvatar = true
        },
        ocultaAvatar: function () {
            this.showAvatar = false
        },
        getPrefixos: async function () {
            const prf = await pesquisa.getPrefixos()
            this.prefixos = prf.data.data


        },
        mi: function (n, d) {
            var x = ('' + n).length;
            var p = Math.pow
            d = p(10, d)
            x -= x % 3
            return Math.round(n * d / p(10, x)) / d + " kMGTPE"[x / 3]
        },
        m: function (number, decPlaces) {
            // var orig = number;
            // var dec = decPlaces;
            // 2 decimal places => 100, 3 => 1000, etc
            decPlaces = Math.pow(10, decPlaces);

            // Enumerate number abbreviations
            var abbrev = ["K", "M", "B", "T"];
          
            // Go through the array backwards, so we do the largest first
            for (var i = abbrev.length - 1; i >= 0; i--) {

                // Convert array index to "1000", "1000000", etc
                var size = Math.pow(10, (i + 1) * 3);

                // If the number is bigger or equal do the abbreviation
                if (size <= number) {
                    // Here, we multiply by decPlaces, round, and then divide by decPlaces.
                    // This gives us nice rounding to a particular decimal place.
                     number = Math.round(number * decPlaces / size) / decPlaces;

                    // Handle special case where we round up to the next abbreviation
                    if ((number == 1000) && (i < abbrev.length - 1)) {
                        number = 1;
                        i++;
                    }

                    // console.log(number);
                    // Add the letter for the abbreviation

                    return {valor:number, sigla: abbrev[i]}
                    
                    // We are done... stop
                }
            }

            
            return number;
        }

    }
}
</script>

<style>
.separador-horizontal {
    border-top: 1px solid rgb(221, 213, 213)
}

.container-inf {
    margin-top: 2%;
    padding: 2%;
    box-shadow: 4px 10px 4px rgb(0 0 0 / 10%);
    border-radius: 5px;
}

.box-shadow {
    padding: 3% !important;
    box-shadow: 2px 4px 6px 4px rgb(0 0 0 / 10%);

}

.goBack {
    width: 5%;
    border-radius: 7px
}

.goBack:hover {
    background-color: #AFAFAF;
    border: none;
    cursor: pointer;
    font-size: 10px;
}

.borderTop {
    border-top: 1px solid grey
}

.flip-card {
    background-color: transparent;
    width: 300px;

    border: 1px solid #f1f1f1;
    perspective: 1000px;
    /* Remove this if you don't want the 3D effect */
}

/* This container is needed to position the front and back side */
.flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 1s;
    transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-card-front,
.flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    /* Safari */
    backface-visibility: hidden;
}

/* Style the front side (fallback if image is missing) */
.flip-card-front {
    background-color: #bbb;
    color: black;
}

/* Style the back side */
.flip-card-back {
    color: rgb(231, 225, 225);
    transform: rotateY(180deg);
    width: 100%;
}
</style>