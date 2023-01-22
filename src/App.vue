<template>
  <title>Valida Siga</title>
  <Nev :chaveFunci="chaveFunci" :nomeFunci="nomeFunci" @setProtocolo="verificaUrl" />

  <Loading v-show="loading" />
  <!-- <inicial :acessos="acessosComissao" @select="setProtocolo" v-if="show && !loading" />
  <Detalhe :atualizar="atualizar" :acessos="acessosComissao" v-if="!show" @returnBack="changeTab" :protocolo="protocoloSelecionado" />
     -->
  <div v-show="acessoNegado">{{ mensagemAcesso }}</div>
  <router-view v-if="mostra" @seleciona="setProtocolo" @setStatus="setStatusSearch" @resumo="setGanho" :filtro="filtro"
    @filtro="setFiltro" :statusGanho="ganho" :protocolo="protocoloSelecionado" :acessos="acessosComissao"
    :user="user" :atualizar="atualizar"/>
</template>
<script>
import M from 'materialize-css'
import Pesquisa from "./services/pesquisa.js";
import Nev from './components/nev'
// import Detalhe from './components/detalhe'
import Loading from './components/loading'
// import inicial from "./components/inicial.vue";
import pesquisa from './services/pesquisa.js';
export default ({
  setup() {

  },
  components: {
    // LogoConecta,
    // inicial,
    Nev,
    Loading,
    // Detalhe
  },
  async created() {
    // M.AutoInit()
    this.acesso()
    this.verificaUrl()

  },
  data() {
    return {
      acessos: [],
      // show: true,
      mensagemAcesso: "",
      acessoNegado: false,
      protocoloSelecionado: {
        // nrProtocolo: 134656,
        // nomeProduto: "teste",
        // icone: "fiber_new",
        // dataProtocolo: "01/01/2002",
        // loading: true
      },
      loading: true,
      acessosComissao: [],
      atualizar: 1,
      mostra: false,
      user: {},
      chaveFunci: "",
      nomeFunci: "",
      filtro: 0,
      ganho: true


    }
  },
  methods: {
    acesso: async function () {
      const acessos = await Pesquisa.acesso()
      const acessosComissao = await Pesquisa.acessosComissao()
      this.acessosComissao = acessosComissao.data
      this.acessos = acessos.data
      if (this.acessos.action == "reload") {
        M.toast({ html: 'Houve um erro ao validar seu acesso, a página será recarregada', classes: 'yellow rounded red-text' });
        setTimeout(() => {
          window.location.reload()
        }, 2000);
      } else if (this.acessos.action == "load") {
        console.log("achou")
        this.user = this.acessos.user
        this.nomeFunci = this.user.nome
        this.chaveFunci = this.user.chave
        // this.show = true
        this.loading = false

      } else if (this.acessos.action == "redirect") {
        this.acessoNegado = true
        this.mensagemAcesso = this.acessos.erro
        const host = this.acessos.host
        setTimeout(() => {
          window.location = "https://login.intranet.bb.com.br/sso/XUI/#login/&goto=" + host
        }, 6000);
        M.toast({ html: this.acessos.erro, classes: 'yellow rounded red-text' });
      }

    },
    changeTab: async function () {
      // this.show = !this.show
    },
    setProtocolo(protocolo) {
      console.log(typeof (protocolo))
      console.log(protocolo)
      if (protocolo) {

        this.atualizar++
        this.protocoloSelecionado = protocolo
        this.show = !this.show
      }
    },
    verificaUrl: async function (a = 0) {
      var protocolo = 0
      this.protocoloSelecionado = {}
      if(a !=0){
        protocolo = a.id
      this.protocoloSelecionado = a

      }else{
        const url = window.location.href
         protocolo = url.split("protocolo/")

      }
      if (protocolo[1]) {
        console.log("localizado protocolo", protocolo[1])
        var protocolos = await pesquisa.getProtocolos("2,3", protocolo[1])
        if(protocolos.data.length == 0){

          protocolos = await pesquisa.getProtocolosValidados("1,3,8", protocolo[1])
        }
        if(protocolos.data.length ==0){

            M.toast({ html: "Protocolo não encontrado, por favor verifique o número digitado" })
            this.loading = false;
            this.protocoloSelecionado = {}
            setTimeout(() => {
              
              window.location.href = "../"
            }, 1500);
          this.show == true
        }else{

          for (let f of protocolos.data) {
            if (f.id.toString() === protocolo[1]) {
              await this.acesso(0)
              this.protocoloSelecionado = f
              // this.show = false
              this.mostra = true
              return false
            }
          }
        }
       
        if (this.show == true) {
          M.toast({ html: "Protocolo não encontrado, por favor verifique o número digitado" })
          this.loading = false;
        }
      } else {
        await this.acesso(1)
        this.mostra = true
      }
      this.atualizar++
    },
    setFiltro: function (a) {
      this.filtro = a
    }, setStatusSearch: function (a) {
      this.filtro = a
    },
    setGanho: function (a) {
      console.log(a)
      this.ganho = a
    }
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

header {
  height: 7% !important;
}

body {
  font-family: Calibri, 'Roboto', sans-serif;
  color: #002D4B;
  background-color: #EAEAEA;
  background-repeat: no-repeat;
  background-position: right bottom;
  background-image: url("https://cenop1908.intranet.bb.com.br/imagens_relatorios/testeiras/temp/layoutsiga/layoutsigavalidacao/assets/img/background.png");
  background-attachment: fixed;
  background-size: 30%;
}
</style>
