<template>
  <div class="sigamain row col s12">
    <div class="sigamain-container-flex">
      <div class="navoptions">
        <i class="material-icons color-icon-blue">menu</i> Menu >
        <div class="hide">
          <button class="navbutton">TRATAR PROTOCOLOS</button>
        </div>
        <div class="div_vertical_bar"></div>
        <div>
          <a
            href="https://redediope.intranet.bb.com.br/apps/siga/"
            target="_blank"
            class="navbutton"
            >MINHAS SOLICITAÇÕES</a
          >
        </div>
        <div class="div_vertical_bar"></div>
        <div class="hide"><button class="navbutton">DESPACHO</button></div>
        <div class="div_vertical_bar"></div>
        <div class="">
          <button
            class="navbutton"
            v-bind:class="{ select: this.filtro }"
            @click="buscaValidadas"
          >
            FINALIZADAS
          </button>
        </div>
        <div class="">
          <button
            class="navbutton"
            v-bind:class="{ select: !this.filtro }"
            @click="buscaAValidar"
          >
            PENDENTES
          </button>
        </div>
      </div>
      <hr class="separador" />
      <div class="corpogrid">
        <div class="flex-container">
          <div class="filtralista">
            <div class="titlefiltralista">
              <p class="txtdestaque2">Demandas {{ tx_tip_demandas }}</p>
            </div>
            <div class="col s5 left">
              <div class="col s12 row left">
                <div
                  class="
                    col
                    s11
                    tituloSiga
                    blue-grey
                    lighten-1
                    white-text
                    center
                  "
                >
                  <span class="">Estoque SIGA</span>
                </div>

                <div class="col s4">
                  <div class="card blue-grey lighten-1">
                    <div class="white-text center">
                      <div class="row">
                        <span class="" data-badge-caption=""
                          >Ferramentas Novas</span
                        >
                      </div>
                      <span class="" data-badge-caption="">{{
                        quantidadeDemandasNova
                      }}</span>
                    </div>
                  </div>
                </div>
                <div class="col s4">
                  <div class="card blue-grey lighten-1 center">
                    <div class="white-text">
                      <div class="row">
                        <span class="" data-badge-caption="">Manutenção</span>
                      </div>

                      <span class="" data-badge-caption="">{{
                        quantidadeDemandasMelhoria
                      }}</span>
                    </div>
                  </div>
                </div>
                <div class="col s4">
                  <div class="card blue-grey lighten-1 center">
                    <div class="white-text">
                      <div class="row">
                        <span class="" dat a-badge-caption="">Melhorias</span>
                      </div>

                      <span class="">{{ quantidadeDemandasManutencao }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col s2 right">
              <div class="input-field col s12">
                <input
                  placeholder="Pesquisar"
                  v-model="procura"
                  @keyup="procurar"
                  id="pesquisaTabela"
                  type="text"
                  class="validate"
                />
                <label for="pesquisaTabela" class="active">Pesquisar</label>
              </div>
            </div>
          </div>
          <hr class="separador" />
          <div class="col s12">
            <div class="col s12">
              <span>Resumir Ganho</span>
            </div>
            <div class="switch col s2">
              <label>
                Não
                <input v-model="ganhoGeral" type="checkbox" />
                <span class="lever"></span>
                Sim
              </label>
            </div>
          </div>
          <div class="col s12" v-show="!ganhoGeral">
            <div class="labelGanho center">Ganhos informados pelo cliente</div>
            <div class="col border-ganho"></div>
          </div>
          <div class="flex-container-row-topo">
            <div class="grid-column largura3 row-bg-gray1 bold"></div>
            <div class="grid-column largura7 row-bg-gray1 bold">
              <div
                class="centralizador-vert centralizador-hor"
                title="Filtrar Protocolo"
              >
                Protocolo
                <div class="largura12 center">
                  <i class="material-icons" title="Ordenar" @click="sort(1, 1)"
                    >keyboard_arrow_up</i
                  >
                  <i class="material-icons" title="Ordenar" @click="sort(0, 1)"
                    >keyboard_arrow_down</i
                  >
                </div>
              </div>
            </div>
            <div class="grid-column largura16 row-bg-gray1 bold">
              <div
                class="centralizador-vert centralizador-hor"
                title="Filtrar por Assunto"
              >
                Assunto

                <div class="largura12 center">
                  <i class="material-icons" title="Ordenar" @click="sort(1, 2)"
                    >keyboard_arrow_up</i
                  >
                  <i class="material-icons" title="Ordenar" @click="sort(0, 2)"
                    >keyboard_arrow_down</i
                  >
                </div>
              </div>
            </div>
            <div class="grid-column largura7 row-bg-gray1 bold">
              <div
                class="centralizador-vert centralizador-hor"
                title="Filtrar por Tipo"
              >
                Data Protocolo

                <div class="largura12 center">
                  <i class="material-icons" title="Ordenar" @click="sort(1, 3)"
                    >keyboard_arrow_up</i
                  >
                  <i class="material-icons" title="Ordenar" @click="sort(0, 3)"
                    >keyboard_arrow_down</i
                  >
                </div>
              </div>
            </div>
            <div class="grid-column largura15 row-bg-gray1 bold">
              <div
                class="centralizador-vert centralizador-hor"
                title="Filtrar por Tipo"
              >
                Status
                <div class="largura12 center">
                  <i class="material-icons" title="Ordenar" @click="sort(1, 4)"
                    >keyboard_arrow_up</i
                  >
                  <i class="material-icons" title="Ordenar" @click="sort(0, 4)"
                    >keyboard_arrow_down</i
                  >
                </div>
              </div>
            </div>
            <div
              class="grid-column largura79 row-bg-gray1 bold"
              v-show="!ganhoGeral"
            >
              <div
                class="centralizador-vert centralizador-hor"
                title="Filtrar por Tipo"
              >
                FTE

                <div class="largura12 center">
                  <i class="material-icons" title="Ordenar" @click="sort(1, 5)"
                    >keyboard_arrow_up</i
                  >
                  <i class="material-icons" title="Ordenar" @click="sort(0, 5)"
                    >keyboard_arrow_down</i
                  >
                </div>
              </div>
            </div>
            <div
              class="grid-column largura79 row-bg-gray1 bold"
              v-show="!ganhoGeral"
            >
              <div
                class="centralizador-vert centralizador-hor"
                title="Filtrar por Tipo"
              >
                Ganho

                <div class="largura12 center">
                  <i class="material-icons" title="Ordenar" @click="sort(1, 6)"
                    >keyboard_arrow_up</i
                  >
                  <i class="material-icons" title="Ordenar" @click="sort(0, 6)"
                    >keyboard_arrow_down</i
                  >
                </div>
              </div>
            </div>
            <div
              class="grid-column largura79 row-bg-gray1 bold"
              v-show="!ganhoGeral"
            >
              <div class="centralizador-vert centralizador-hor">
                Cliente

                <div class="largura12 center">
                  <i class="material-icons" title="Ordenar" @click="sort(1, 7)"
                    >keyboard_arrow_up</i
                  >
                  <i class="material-icons" title="Ordenar" @click="sort(0, 7)"
                    >keyboard_arrow_down</i
                  >
                </div>
              </div>
            </div>
            <div
              class="grid-column largura79 row-bg-gray1 bold"
              v-show="ganhoGeral"
            >
              <div class="centralizador-vert centralizador-hor">
                Ganho

                <div class="largura12 center"></div>
              </div>
            </div>
            <div class="grid-column largura7 row-bg-gray1 bold">
              <div
                class="centralizador-vert centralizador-hor"
                title="Filtrar por Prefixo"
              >
                Prefixo

                <div class="largura12 center">
                  <i class="material-icons" title="Ordenar" @click="sort(1, 8)"
                    >keyboard_arrow_up</i
                  >
                  <i class="material-icons" title="Ordenar" @click="sort(0, 8)"
                    >keyboard_arrow_down</i
                  >
                </div>
              </div>
            </div>
            <div class="grid-column largura7 row-bg-gray1 bold">
              <div
                class="centralizador-vert centralizador-hor col s12"
                title="Filtrar por Responsável"
              >
                Solicitante
                <div class="largura12 center">
                  <i class="material-icons" @click="sort(1, 9)"
                    >keyboard_arrow_up</i
                  >
                  <i class="material-icons" @click="sort(0, 9)"
                    >keyboard_arrow_down</i
                  >
                </div>
              </div>
            </div>
            <div
              class="grid-column largura7 row-bg-gray1 bold"
              v-show="ganhoGeral && filtro == 0"
            >
              <div
                class="centralizador-vert centralizador-hor row col s12"
                style="padding: 0"
                title="Filtrar por Responsável"
              >
                G.Solução Selecionado
                <div class="col s6">
                  <div class="col s5">
                    <i class="material-icons" @click="sort(1, 10)"
                      >keyboard_arrow_up</i
                    >
                  </div>
                  <div class="col s5">
                    <i class="material-icons" @click="sort(0, 10)"
                      >keyboard_arrow_down</i
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="flex-container-row-topo">
            <ColumnSearch columnName="Tipo" column="tipo"/>
            <ColumnSearch columnName="Assunto" column="descricao"/>
            <ColumnSearch columnName="Data" column="ts_status"/>
            <ColumnSearch columnName="Status" column="tx_status"/>
            <ColumnSearch columnName="Prefixo" column="pref_slc"/>
            <ColumnSearch columnName="Funci" column="cd_funci_rsp_incl"/>
          </div> -->
          <Linha
            v-for="(l, i) in retorno"
            :update="update"
            @setProtocol="setProtocol"
            :key="l.protocolo"
            @valores="setValorLinha"
            :linha="l"
            :item="i"
            :atualizar="atualizar"
            :ganhoGeral="ganhoGeral"
            :filtro="filtro"
          />
        </div>
        <!--modal iconografia -->
        <div id="modalIcone" class="divmodalIcone">
          <div class="divmodal2">
            <div class="row1-sobre">
              <i class="small material-icons color-icon-white">help</i
              >ICONOGRAFIA
              <span class="close" id="closeIcone">×</span>
            </div>
            <div class="iconografia">
              <div class="size20 row-bg-gray1">
                <i class="material-icons person-lightBlue size20"
                  >filter_list</i
                >
                Opções de filtragem
              </div>
              <div class="size20">
                <i class="material-icons person-lightBlue">fiber_new</i>
                Desenvolvimento
              </div>
              <div class="size20 row-bg-gray1">
                <i class="material-icons person-lightBlue">extension</i>
                Melhoria
              </div>
              <div class="size20">
                <i class="material-icons person-lightBlue">build</i> Manutenção
              </div>
              <div class="size20 row-bg-gray1">
                <i class="material-icons blue">info</i> Informações gerenciais
              </div>
              <div class="size20">
                <i class="material-icons red">warning</i> Protocolo priorizado
              </div>
              <div class="size20 row-bg-gray1">
                <i class="material-icons person-lightBlue"
                  >sentiment_very_satisfied</i
                >
                Protocolo dentro da meta.
              </div>
              <div class="size20">
                <i class="material-icons yellow">sentiment_neutral</i> Protocolo
                próximo ao limite da meta.
              </div>
              <div class="size20 row-bg-gray1">
                <i class="material-icons red">sentiment_very_dissatisfied</i>
                Protocolo não atingiu a meta.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import M from "materialize-css";
import "material-design-icons/iconfont/material-icons.css";
import M from "materialize-css";
import pesquisa from "../services/pesquisa";
import Linha from "./linha";
// import ColumnSearch from "./ColumnSearch";
export default {
  name: "inicial",
  props: {
    msg: String,
    selecionado: Boolean,
    user: {},
    filtro: Number,
    acessos: [],
    statusGanho: Number,
  },
  mounted() {
    M.AutoInit();
    //this.verificaFunci()
    this.$router.push({ path: "/" });
    this.ganhoGeral = this.statusGanho;
    this.getProtocolos(this.filtro);
  },
  components: {
    // Nev,
    Linha,
    // ColumnSearch
  },
  data() {
    return {
      retorno: [],
      retornoTotal: [],
      procura: "",
      protocolo: {},
      busca: { n: [2, 3], s: [1, 4, 8] },

      update: 0,
      quantidadeDemandasNova: 0,
      quantidadeDemandasMelhoria: 0,
      quantidadeDemandasManutencao: 0,
      ganho: "",
      atualizar: 0,
      ganhoGeral: true,
    };
  },
  methods: {
    setProtocol: async function (protocolo) {
      this.protocolo = this.retorno.find((o) => o.id == protocolo);
      this.$emit("seleciona", this.protocolo);
      console.log(this.$router);
      this.$router.push({
        path: `/protocolo/${this.protocolo.id}`,
        replace: true,
      });
    },
    getProtocolos: async function (a) {
      var retorno = [];
      console.log("filtros", this.filtro, a);
      if (a) {
        retorno = await pesquisa.getProtocolosValidados(this.busca.s);
      } else {
        retorno = await pesquisa.getProtocolos(this.busca.n, 0);
      }

      const gsol = await pesquisa.getGSol();
      const quantidades = await pesquisa.getQuantidade();
      const novo = quantidades.data.find((p) => p.id == "1");
      const manut = quantidades.data.find((p) => p.id == "2");
      const melhoria = quantidades.data.find((p) => p.id == "3");
      this.quantidadeDemandasManutencao = manut.quantidade;
      this.quantidadeDemandasMelhoria = melhoria.quantidade;
      this.quantidadeDemandasNova = novo.quantidade;
      this.retornoTotal = retorno.data;
      const descricao = [
        { t: "K", tx: "MIL" },
        { t: "M", tx: "MILHÃO" },
        { t: "B", tx: "BILHÃO" },
      ];

      for await (let p of this.retornoTotal) {
        if (!p.gsol) {
          p.gsol = "";
          p.avatarGsol = {
            matricula: "",
            nome: "",
            img: "",
            nome_uor_trabalho: "",
          };
        } else {
          const m = gsol.data.find((o) => o.matricula == p.gsol);
          if (m) {
            p.nomegsol = m.nome;
            p.avatarGsol = {
              matricula: m.matricula,
              nome: m.nome,
              img: `https://humanograma.intranet.bb.com.br/avatar/${m.matricula}`,
              nome_uor_trabalho: m.nome_uor_trabalho,
            };
          } else {
            p.avatarGsol = {
              matricula: "",
              nome: "",
              img: "",
              nome_uor_trabalho: "",
            };
          }
        }

        p.valorColuna = 0;
        p.FTE = 0;
        p.valorFinanceiro = 0;
        p.ganhoCliente = false;
        const perg56 = p.perguntas.find((o) => o.id_pergunta == 56);
        const perg59 = p.perguntas.find((o) => o.id_pergunta == 59);
        const perg61 = p.perguntas.find((o) => o.id_pergunta == 61);
        const perg66 = p.perguntas.find((o) => o.id_pergunta == 66);
        // console.log(this.linha.id, perg56, perg59)
        p.ganho = "";
        p.tooltipValor = "";
        if (perg56) {
          if (perg56.resposta == "ganho") {
            p.ganho = "+";
          } else {
            p.ganho = "-";
          }
          const perg57 = p.perguntas.find((o) => o.id_pergunta == 57);
          const perg58 = p.perguntas.find((o) => o.id_pergunta == 58);
          if (perg57 && perg58.resposta == "mes") {
            const v = perg57.resposta.replace(/\./g, "");
            p.valorColuna = parseFloat(v) * 12;
            const g = this.m(parseFloat(v) * 12, 2);
            const s = descricao.find((o) => o.t == g.sigla);
            if (s) {
              p.valorFinanceiro = g.valor + g.sigla;
              p.tooltipValor = s.tx || "";
            } else {
              p.valorFinanceiro = g;
              p.tooltipValor = g + " reais";
            }
          } else if (perg57 && perg58.resposta == "dia") {
            const v = perg57.resposta.replace(/\./g, "");
            p.valorColuna = parseFloat(v) * 30 * 12;
            const g = this.m(parseFloat(v) * 30 * 12, 2);
            const s = descricao.find((o) => o.t == g.sigla);
            p.valorFinanceiro = g.valor + g.sigla;
            if (s) {
              p.tooltipValor = s.tx || "";
            } else {
              p.tooltipValor = g.valor;
            }
          } else if (perg57 && perg58.resposta == "ano") {
            const v = perg57.resposta.replace(/\./g, "");
            p.valorColuna = parseFloat(v);

            const g = this.m(parseFloat(v), 2);
            p.valorFinanceiro = g.valor + g.sigla;
            const s = descricao.find((o) => o.t == g.sigla);
            if (s) {
              p.tooltipValor = s.tx || "";
            } else {
              p.tooltipValor = g.valor;
            }
          }
        } else if (perg59) {
          const perg60 = p.perguntas.find((o) => o.id_pergunta == 60);
          if (perg60) {
            p.FTE = (
              (parseInt(perg60.resposta) * parseInt(perg59.resposta)) /
              360
            ).toFixed(2);
          } else {
            console.log(p);
          }
        } else if (perg61) {
          p.FTE = (parseInt(perg61.resposta) / 360).toFixed(2);
        } else if (perg66) {
          p.ganhoCliente = true;
          p.msgGanhoCliente = perg66.resposta;
        }
      }
      this.retorno = this.retornoTotal;

      if (this.retornoTotal.length == 0) {
        M.toast({ html: "Não há protocolos para seu prefixo" });
        return false;
      } else {
        var elems = document.querySelectorAll(".tooltipped");
        M.Tooltip.init(elems);
      }

      this.$emit("filtro", a);
    },
    setValorLinha: function (e) {
      if (e.protocolo == 202209591) {
        console.log(e);
      }
      for (let p of this.retorno) {
        if (p.id == e.protocolo) {
          p.FTE = e.fte;
          p.valorFinanceiro = e.valorFinanceiro;
        }
      }
    },
    procurar: function () {
      const texto = this.procura.toUpperCase();
      const r = this.retornoTotal;
      const array = [];
      r.map((o) => {
        const keys = Object.keys(o);

        for (let k of keys) {
          const regex = new RegExp(texto, "g");
          if (o[k] && o[k].toString().toUpperCase().match(regex)) {
            array.push(o);
            return;
          }
        }
      });
      this.retorno = array;
    },
    procuraColuna: function (c) {
      console.log(c);
    },
    // GetSortOrder(prop) {
    //   return function (a, b) {
    //     if (a[prop] > b[prop]) {
    //       return 1;
    //     } else if (a[prop] < b[prop]) {
    //       return -1;
    //     }
    //     return 0;
    //   }
    // },
    GetSortAlphaAsc: function (arr, coluna) {
      // Set slice() to avoid to generate an infinite loop!
      return arr.slice().sort(function (a, b) {
        return a[coluna].localeCompare(b[coluna]);
      });
    },
    GetSortAlphaDesc: function (arr, coluna) {
      // Set slice() to avoid to generate an infinite loop!
      return arr.slice().sort(function (a, b) {
        console.log(a[coluna], b[coluna]);
        return b[coluna].localeCompare(a[coluna]);
      });
    },
    GetSortOrderAsc: function (arr, coluna) {
      // Set slice() to avoid to generate an infinite loop!
      return arr.slice().sort(function (a, b) {
        return a[coluna] - b[coluna];
      });
    },
    GetSortOrderDesc: function (arr, coluna) {
      // Set slice() to avoid to generate an infinite loop!

      return arr.slice().sort(function (a, b) {
        return b[coluna] - a[coluna];
      });
    },
    sort: function (ordem, coluna) {
      const colunas = [
        "id",
        "nome",
        "ts_status",
        "tx_status",
        "FTE",
        "valorFinanceiro",
        "ganhoCliente",
        "pref_slc",
        "NOME",
        "gsol",
      ];
      // const prtcs = this.retorno
      // var retorno = []
      // retorno = this.retorno
      // this.retorno = []
      const ncolunas = [2, 3, 4, 9, 10];
      const nomeColuna = colunas[coluna - 1];
      console.log(nomeColuna, ordem);
      this.update++;
      // return
      // this.retorno = retorno

      if (ordem == 1) {
        if (ncolunas.find((l) => l == coluna)) {
          this.retorno = this.GetSortAlphaAsc(this.retorno, nomeColuna);
        } else if (coluna == 6) {
          this.retorno = this.GetSortOrderAsc(this.retorno, "valorColuna");
        } else {
          this.retorno = this.GetSortOrderAsc(this.retorno, nomeColuna);
        }
      } else {
        if (ncolunas.find((l) => l == coluna)) {
          this.retorno = this.GetSortAlphaDesc(this.retorno, nomeColuna);
        } else if (coluna == 6) {
          this.retorno = this.GetSortOrderDesc(this.retorno, "valorColuna");
        } else {
          this.retorno = this.GetSortOrderDesc(this.retorno, nomeColuna);
        }
      }
      this.atualizar++;
    },
    buscaValidadas: function () {
      //this.busca = [1, 4]
      this.tx_tip_demandas = "Validadas";
      this.$emit("setStatusF", 1);

      this.getProtocolos(1, 0);
    },
    buscaAValidar: function () {
      //this.busca = [2, 3]
      this.tx_tip_demandas = "a Validar";
      this.$emit("filtro", 0);
      this.getProtocolos(0, 0);
    },
    m: function (number, decPlaces) {
      decPlaces = Math.pow(10, decPlaces);

      var abbrev = ["K", "M", "B", "T"];

      for (var i = abbrev.length - 1; i >= 0; i--) {
        var size = Math.pow(10, (i + 1) * 3);

        if (size <= number) {
          number = Math.round((number * decPlaces) / size) / decPlaces;

          if (number == 1000 && i < abbrev.length - 1) {
            number = 1;
            i++;
          }

          return { valor: number, sigla: abbrev[i] };

        }
      }

      return number;
    },
  },
  computed: {
    tx_tip_demandas: function () {
      return this.filtro == 0 ? "Pendentes" : "Finalizadas";
    },
  },
  watch: {
    ganhoGeral: function () {
      console.log("change", this.ganhoGeral);
      this.$emit("resumo", this.ganhoGeral);
    },
  },
};
</script>

<style >
/* gerais */
* {
  margin: 0;
  padding: 0;
  font-family: Calibri, sans-serif;
  font-size: 13px;
}

.right {
  text-align: right;
}

.sigacontainer {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

@media (min-width: 768px) {
  .sigacontainer {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
}

.sigaheader {
  grid-column: span 1;
  background-color: #fff;
  text-align: center;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

.sigamain {
  flex: 1;
  padding: 20px;
}

.sigamain-container-flex {
  flex-direction: column;
}

.navoptions {
  /* margin-left:-150px!important; */
  display: inline-flex;
  align-items: center;
  flex-direction: row;

  height: 40px;
  gap: 20px;
  padding: 10px 10px 20px 10px;
}

/* header */

/* main */
.filtralista {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  align-items: center;
  gap: 0.5vw;
}

.filtralista2 {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  align-items: center;
  gap: 0.5vw;
}

.infopanel {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  align-items: center;
  gap: 5%;
}

.separador {
  border: 1px solid #f0f0f1;
}

.titlefiltralista {
  width: auto;
}

.boxfilter {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;
}

/*txt*/

.txtdestaque {
  font-family: BancoDoBrasil Titulos Medium, Calibri, sans-serif;
  font-size: 17px;
  padding-bottom: 7px;
}

.txtdestaque2 {
  font-family: BancoDoBrasil Titulos Medium, Calibri, sans-serif;
  font-size: 25px;
}

.txtdestaque3 {
  font-family: BancoDoBrasil Textos, Calibri, sans-serif;
  font-weight: bold;
  font-size: 12px;
  padding-bottom: 7px;
}

.txtespacamento {
  font-size: 14px;
  padding-bottom: 20px;
}

.smallfont {
  font-size: 0.8rem;
}

.medfont {
  font-size: 1rem;
}

/*buttons*/

.button {
  width: 40px;
  height: 40px;
  background-color: #002d4b;
  border: none;
  cursor: pointer;
  border-radius: 50%;
}

.button-no-bg {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 7px;
  font-size: 10px;
  border-radius: 10px;
  transition-duration: 0.4s;
  color: #002d4b;
  transition: 0.5s;
}

.button-no-bg:hover {
  background-color: #afafaf;
  border: none;
  cursor: pointer;
  font-size: 10px;
}

.navbuttonsmall {
  border: none;
  letter-spacing: 1px;
  font-weight: bold;
  padding: 13px 8px;
  text-align: center;
  text-decoration: none;
  font-size: 10px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  background-color: #486be8;
  color: #fff;
  width: 112px;
  min-width: 100px;
}

.navbuttonsmall:hover {
  background-color: #002d4b;
  color: white;
}

.navbuttonsmall:active {
  background-color: gray;
  color: white;
}

.navbutton {
  border: none;
  letter-spacing: 1px;
  font-weight: bold;
  width: 150px;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  font-size: 10px;
  cursor: pointer;
  border-radius: 5px;
  background-color: #f0f0f0;
}

.navbutton:hover {
  border-bottom: solid #486be8;
}

.navbutton:active {
  background-color: #d3d3d3;
  border-bottom: none;
  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.2);
}

.navbutton2 {
  border: none;
  letter-spacing: 1px;
  font-weight: bold;
  width: 200px;
  height: 70px;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  font-size: 13px;
  cursor: pointer;
  border-radius: 5px;
  background-color: #f0f0f0;
}

.navbutton2:hover {
  border-bottom: solid #486be8;
}

.navbutton2:active {
  background-color: #d3d3d3;
  border-bottom: none;
  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.2);
}

/*cor ícone*/
.color-icon-gray {
  color: #afafaf;
}

.color-icon-person-lightBlue {
  color: #002d4b !important;
}

.color-icon-red {
  color: red;
}

/* SWITCH */

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

/* info panel */

.cardinfopanel {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  background-color: #eaeaea;
  gap: 10px;
  width: 9%;
  min-width: 115px;
  min-height: 115px;
  padding: 10px;
  margin: 0px;
  border-radius: 5px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
}

.esfera1 {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #afafaf;
  background-image: linear-gradient(to right, #87c3be, #5aaaa0);
  width: 40px;
  height: 35px;
  border-radius: 40px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
}

.esfera2 {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #afafaf;
  background-image: linear-gradient(to right, #b4afd2, #9187af);
  width: 40px;
  height: 35px;
  border-radius: 40px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
}

.esfera3 {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #afafaf;
  background-image: linear-gradient(to right, #dca09b, #b47d7d);
  width: 40px;
  height: 35px;
  border-radius: 40px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
}

/* MODAL START */

.divmodalSobre {
  display: none;
  position: fixed;
  z-index: 1;
  padding-top: 15vh;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  transition: 0.5s;
  animation: fadeInAnimation1 ease 1s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

.divmodalIcone {
  display: none;
  position: fixed;
  z-index: 1;
  padding-top: 15vh;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  transition: 0.5s;
  animation: fadeInAnimation1 ease 1s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

.divmodal2 {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 30%;
}

.row1-sobre {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  height: 10px;
  background-color: #002d4b;
  padding: 20px;
  margin-bottom: 10px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  color: white;
}

.close {
  color: white;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.header-sobre {
  font-size: 30px;
  font-family: Calibri;
  color: #002d4b;
  font-weight: bold;
}

.title-sobre {
  font-size: 20px;
  font-family: Calibri;
  color: #002d4b;
  font-weight: bold;
}

.desenvolvedor {
  font-size: 15px;
  font-family: Calibri;
  color: #002d4b;
  text-align: center;
}

.desenvolvedor a {
  color: #9187af;
  font-weight: bold;
}

.desenvolvedor a:hover {
  color: #b4afd2;
}

.desenvolvedor a:active {
  color: blue;
}

.close:hover,
.close:focus {
  color: yellow;
  text-decoration: none;
  cursor: pointer;
  border: none;
}

/* específicos da tela de detalhamento do protocolo`*/

.container-detalha-protocolo {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
}

.content-detalha-protocolo {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 90%;
  min-width: 300px;
}

.content-detalha-protocolo2 {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 10px;
  width: 100%;
  min-width: 300px;
}

.content-cardbox {
  display: flex;
  justify-content: flex-end;
  width: 20%;
  min-width: 310px;
}

.content-cardbox2 {
  display: flex;
  justify-content: flex-end;
  width: 5%;
  min-width: 100px;
}

.cardboxshadowtimeline {
  background-color: white;
  padding: 20px;
  margin: 5px;
  border-radius: 5px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.3);
}

.cardboxshadowicons {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 26%;
  left: 40px;
  background-color: white;
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  width: 79px;
  gap: 5px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.3);
}

.cardboxshadowitem {
  display: flex;
  flex-direction: column;
  /* background-color: white; */
  width: 22%;
  min-width: 200px;
  padding: 20px;
  border-radius: 5px;
  /*box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.5);*/
}

.cardboxshadowitem2 {
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 75%;
  padding: 20px;
  border-radius: 5px;
  /* box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.5);*/
}

.cardboxshadowitem3 {
  display: flex;
  flex-direction: column;
  /* background-color: white;*/
  width: 50%;
  padding: 10px;
  border-radius: 5px;
  /* box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.5);*/
}

.cardboxshadowitem4 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  padding: 10px;
  border-radius: 5px;
}

.cardboxshadowitem5 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  padding: 10px;
  border-radius: 5px;
}

.cardboxshadowitem6 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 60%;
  padding: 10px;
  border-radius: 5px;
}

.blocodetalha {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1%;
  min-width: 200px;
  padding: 2px;
}

.blocodetalha2 {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1%;
  width: 90%;
  min-width: 200px;
  padding: 2px;
}

.blocodetalha3 {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 90%;
  gap: 1%;
  min-width: 200px;
  padding: 2px;
}

.blocodetalha4 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 70%;
  gap: 1%;
  min-width: 200px;
  padding: 2px;
}

.container-obs {
  display: flex;
  gap: 20px;
}

.content-obs {
  width: 90%;
  border-radius: 5px;
  margin: 5px;
  background-color: rgba(0, 45, 75, 0.03);
  padding: 5px;
}

/* table css */
.corpogrid {
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #434343;
  margin: 0;
  padding: 00px;
  width: 100%;
  overflow-x: hidden;
}

.flex-container {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  margin: 5px;
  padding: 10px;
  width: 99%;
  height: auto;
  background-color: white;
  border-radius: 5px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.flex-container-row {
  display: flex;
  align-items: center stretch;
  justify-content: stretch;
  padding: 2px;
  flex-direction: row;
  width: 100%;
  /* border: solid blue; */
}

.flex-container-row-topo {
  display: flex;
  align-items: center stretch;
  justify-content: stretch;
  padding: 20px 2px 2px 2px;
  flex-direction: row;
  width: 100%;
  height: 100px;
}

.centralizador-hor {
  display: flex;
  justify-content: center;
  text-overflow: ellipsis;
}

.centralizador-vert {
  display: flex;
  align-items: center;
  height: 100%;
}

.flex-container-row:hover {
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.07);
}

.grid-column {
  /* border: solid red;*/
  padding: 5px;
  border-radius: 5px;
  margin-left: 2px;
}

.iconografia {
  display: flex;
  /* flex */
  flex-direction: column;
  justify-content: center;
  margin: 10px;
  padding: 20px;
  font-size: 20px;
  width: 90%;
  border-radius: 5px;
}

.size20 {
  padding: 5px;
  font-size: 20px;
}

.flexend {
  display: flex;
  width: 95%;
  justify-content: flex-end;
}

.row-bg-gray1 {
  background-color: rgba(0, 45, 75, 0.02);
}

.row-bg-gray2 {
  background-color: rgba(0, 45, 75, 0.08);
}

.row-bg-yellow {
  background-color: rgba(252, 252, 48, 0.3);
}

.row-bg-red {
  background-color: rgba(255, 0, 0, 0.3);
}

.row-bg-blue {
  background-color: #002d4b;
}

/* larguras de colunas flex*/
.largura1 {
  width: 5.9%;
}

.largura2 {
  width: 65.8%;
}

.largura3 {
  width: 1.9%;
}

.largura4 {
  width: 5.9%;
}

.largura5 {
  width: 5.9%;
}

.largura6 {
  width: 5.9%;
}

.largura7 {
  width: 9.9%;
}

.largura8 {
  width: 2.9%;
}

.largura9 {
  width: 7.9%;
}

.largura10 {
  width: 5.9%;
}

.largura11 {
  width: 5.9%;
}

.largura12 {
  width: 50%;
}

.largura13 {
  width: 1.9%;
}

.largura14 {
  width: 1.9%;
}

.largura15 {
  width: 20%;
}

.largura79 {
  width: 7.9%;
}

.largura16 {
  width: 15%;
}

.blue {
  color: #002d4b;
}

.bold {
  font-weight: bold;
}

.red {
  color: red;
}

.yellow {
  color: #97971d;
}

.gray {
  color: gray;
}

.lightblue {
  color: #039be5;
}

.white {
  color: white;
}

.green {
  color: green;
}

@media (max-width: 1290px) {
  .cardboxshadowicons {
    top: 15%;
    gap: 2px;
  }

  .filtralista2 {
    padding-left: 11%;
  }

  .sigamain {
    padding-top: 5px;
  }
}

.material-icons:hover {
  cursor: pointer;
  background-color: #888;
  border-radius: 16px;
}

@media (max-width: 768px) {
  .sigacontainer {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
}

.centralizador-vert.centralizador-hor > div {
  line-height: 50px;
}

.centralizador-vert.centralizador-hor > div > .material-icons:nth-child(1) {
  margin-bottom: 4%;
}

.centralizador-vert.centralizador-hor > div > .material-icons:nth-child(2) {
  margin-top: 25px !important;
}

span.badge {
  border-radius: 16px !important;
}

.margin-left {
  margin-left: 50px !important;
}

span.badge {
  float: left !important;
}

.card {
  border-radius: 16px;
  height: 75px;
  padding-top: -20px !important;
}

.tituloSiga {
  border-radius: 16px !important;
  margin-left: 4% !important;
}

.border-ganho {
  border-top: 1px;
  border-bottom: 0px;
  border-left: 1px;
  border-right: 1px;
  border-style: dotted;
  margin-left: 58.7% !important;
  width: 23%;
  border-color: #5aaaa0;
  transform: translate(0, 200%);
  height: 20px;
}

.labelGanho {
  margin-left: 58.7% !important;
  width: 23%;
  height: 10px !important;
  transform: translate(0, 100%);
  margin-bottom: -1%;
}

.select {
  background-color: #5aaaa0;
}
</style>
