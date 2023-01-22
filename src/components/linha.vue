<template>
  <div class="flex-container-row" @click="setProtocolo">
    <div :class="`grid-column largura3 ${classe}`">
      <div class="centralizador-vert centralizador-hor" :title="legenda">
        <i class="material-icons lightblue">{{ icone }}</i>
      </div>
    </div>
    <div :class="`grid-column  largura7 bold lightblue ${classe}`">
      <div
        class="centralizador-vert centralizador-hor"
        title="Número do Protocolo"
      >
        {{ protocolo }}
      </div>
    </div>
    <div :class="`grid-column  largura16 bold ${classe}`">
      <div class="centralizador-vert" title="Nome do projeto">
        {{ nomeProjeto }}
      </div>
    </div>
    <div :class="`grid-column  largura7 bold ${classe}`">
      <div class="centralizador-vert" title="Nome do projeto">
        {{ dataProtocolo }}
      </div>
    </div>
    <div :class="`grid-column  largura15 ${classe}`">
      <div class="centralizador-vert centralizador-hor" title="Status">
        {{ status }}
      </div>
    </div>
    <div :class="`grid-column  largura79 ${classe}`" v-show="!ganhoGeral">
      <div
        class="centralizador-vert centralizador-hor"
        v-bind:class="{ tooltipped: linha.FTE != '0' }"
        data-tooltip="Força de Trabalho Economizada <br> 1 FTE = 1 posto de 6 horas/dia"
      >
        {{ FTE }}
      </div>
    </div>
    <div :class="`grid-column  largura79 ${classe}`" v-show="!ganhoGeral">
      <div
        class="centralizador-vert centralizador-hor"
        v-bind:class="{ tooltipped: linha.tooltipValor != '' }"
        :data-tooltip="linha.tooltipValor"
      >
        {{ linha.ganho }}{{ valorFinanceiro }}
      </div>
    </div>
    <div :class="`grid-column  largura79 ${classe}`" v-show="!ganhoGeral">
      <div
        class="centralizador-vert centralizador-hor"
        v-bind:class="{ tooltipped: linha.ganhoCliente }"
        :data-tooltip="msgGanhoCliente"
      >
        <i class="material-icons">
          {{ ganhoCliente }}
        </i>
      </div>
    </div>
    <div :class="`grid-column  largura79 ${classe}`" v-show="ganhoGeral">
      <div
        class="centralizador-vert centralizador-hor"
        v-bind:class="{ tooltipped: linha.ganhoCliente }"
        :data-tooltip="msgGanhoCliente"
      >
        <i class="material-icons" v-show="tip == 2">
          {{ ganhoCliente }}
        </i>
        <span v-if="tip == 1">
          <div
            class="centralizador-vert centralizador-hor tooltipped"
            data-tooltip="Força de Trabalho Economizada <br> 1 FTE = 1 posto de 6 horas/dia"
          >
            {{ FTE }} FTE
          </div>
        </span>
        <span v-if="tip == 3">
          <div
            class="centralizador-vert centralizador-hor"
            v-bind:class="{ tooltipped: linha.tooltipValor != '' }"
            :data-tooltip="linha.tooltipValor"
          >
            {{ ganho }}
          </div>
        </span>
        <span v-if="tip == 0">
          <div class="centralizador-vert centralizador-hor">Não Informado</div>
        </span>
      </div>
    </div>
    <div :class="`grid-column  largura7 ${classe}`">
      <div
        class="centralizador-vert centralizador-hor"
        title="Prefixo Solicitante"
      >
        {{ prefixoProjeto }}
      </div>
    </div>
    <div :class="`grid-column  largura7 ${classe} left`">
      <div
        class="centralizador-vert tooltipped"
        :data-tooltip="chaveSolicitante"
        :title="chaveSolicitante"
      >
        {{ nomeSolicitante }}
      </div>
    </div>
    <div
      :class="`grid-column  largura7 ${classe} left`"
      v-show="ganhoGeral && filtro == 0"
    >
      <div
        class="centralizador-vert tooltipped"
        v-show="linha.gsol != ''"
        :data-tooltip="linha.gsol"
        :title="linha.gsol"
      >
        {{ linha.avatarGsol.nome }}
      </div>
    </div>
  </div>
</template>

<script>
import M from "materialize-css";
export default {
  props: {
    linha: {},
    item: Number,
    user: {},
    update: Number,
    atualizar: Number,
    ganhoGeral: Boolean,
    filtro: Number,
  },
  data() {
    return {
      grey: true,
      yellow: false,
      icones: [
        { id: 1, tx: "fiber_new" },
        { id: 3, tx: "extension" },
      ],
      perguntas: [],
    };
  },
  mounted() {
    // this.calculaColuna()
    var elems = document.querySelectorAll(".tooltipped");
    M.Tooltip.init(elems);
  },
  methods: {
    setProtocolo: function () {
      const f = document.getElementsByClassName("material-tooltip");
      f.forEach((element) => {
        element.style.visibility = "hidden";
      });
      console.log("click", this.protocolo);
      this.$emit("setProtocol", this.protocolo);
    },
  },
  computed: {
    icone: function () {
      const icon = this.icones.find((o) => o.id == this.linha.tipo);
      if (icon) {
        return icon.tx;
      } else {
        return "dashboard";
      }
    },
    legenda: function () {
      return this.linha.tx_tipo;
    },
    protocolo: function () {
      return this.linha.id;
    },
    nomeProjeto: function () {
      return this.linha.nome;
    },
    status: function () {
      return this.linha.tx_status;
    },
    prefixoProjeto: function () {
      return this.linha.pref_slc;
    },
    nomeSolicitante: function () {
      return this.linha.NOME;
    },
    chaveSolicitante: function () {
      return this.linha.cd_funci_rsp_incl;
    },
    classe: function () {
      var g = this.item % 2 > 0 ? "row-bg-gray2" : "row-bg-yellow";
      return g;
    },
    dataProtocolo: function () {
      const d = new Date(this.linha.ts_status);
      return (
        d.toLocaleDateString("pt-BR") + "-" + d.toLocaleTimeString("pt-BR")
      );
    },
    valorFinanceiro: function () {
      return this.linha.valorFinanceiro; //.toLocaleString('pt-BR', { style: 'currency', currency: "BRL" })
    },
    FTE: function () {
      return this.linha.FTE == "0.00" ? "0" : this.linha.FTE;
    },
    ganhoCliente: function () {
      if (this.linha.ganhoCliente) {
        return `group_add`;
      } else {
        return "";
      }
    },
    msgGanhoCliente: function () {
      return this.linha.msgGanhoCliente;
    },
    ganho: function () {
      if (this.linha.FTE != "0.00") {
        return `${this.FTE} FTE`;
      } else if (this.linha.ganhoCliente != "") {
        return `group_add`;
      } else if (this.linha.valorFinanceiro != "") {
        return this.linha.ganho + this.valorFinanceiro;
      } else {
        return "";
      }
    },
    tip: function () {
      if (this.linha.FTE != "0") {
        return 1;
      } else if (this.linha.ganhoCliente != "") {
        return 2;
      } else if (this.linha.valorFinanceiro != "") {
        return 3;
      } else {
        return 0;
      }
    },
  },
  watch: {
    update: function () {
      console.log("UPDATE");
    },
    atualizar: function () {
      var elems = document.querySelectorAll(".tooltipped");
      M.Tooltip.init(elems);
    },
  },
};
</script>

<style>
.row-bg-yellow {
  background-color: rgba(252, 252, 48, 0.3);
}

.row-bg-gray2 {
  background-color: rgba(0, 45, 75, 0);
}

.flex-container-row:hover {
  cursor: pointer;
}
</style>