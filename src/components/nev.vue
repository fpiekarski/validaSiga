<template>
    <div class="nav-wrapper white" style="height: 65px; padding: 10px 4px 4% 2%">
        <!-- <div class="nav-content"> -->
        <!-- <div class="header-flex"> -->
        <div class="brand-logo left" style="vertical-align: bottom; padding-left:2%">
            <img src="https://cenop1908.intranet.bb.com.br/imagens_relatorios/testeiras/temp/layoutsiga/layoutsigavalidacao/assets/img/diope.png"
                alt="Diretoria Operações" class="logo-diope" height="65">
        </div>
        <div class="left div_vertical_bar" style="vertical-align: bottom; margin-top: 1%;">
        </div>
        <div class="left col s3" style="vertical-align: bottom; padding-top:1%; padding-left: 0.5%; width: 15%;">
            <div class=" txtdestaque2 texto-diope " style="margin-left:5%;">VALIDA SIGA</div>
        </div>
        <ul class="right " style=" width: 50%;">
            <li class="row col s12">
                <div class="col s6">
                    <div class="col s2" @click="findProtocol" style="margin-top:5%;margin-right: -2%;">
                        <a class="btn-small  black-text" >
                            <i class="medium material-icons color-icon-blue">search</i>
                        </a>
                    </div>
                    <div class="col s10 input-field busca" style="padding-left:0%">
                        <input type="search" @keyup="verificaSearch" maxlength="9" v-model="prtcBusca" class="header-search left-align"
                            placeholder="Digite o nº SIGA que procura">
                        <ul id="dropdownSearch" class='dropdown-content'>
                            <li><a href="#!"><i class="material-icons">view_module</i>four</a></li>
                        </ul>
                    </div>
                </div>
                <div class="div_vertical_bar col"></div>
                <div class="col s4" style="margin-left:-6%; padding-top:1%">
                    <div class=" col s5  black-text font-BB left" style="vertical-align: middle; text-transform: uppercase; text-align: center;">
                    {{nomeFunci }}
                    </div>
                    <div class=" col s3" style="margin-top: -3%;margin-left: 7%;">
                        <img class="rounded" :src="`https://humanograma.intranet.bb.com.br/avatar/${chaveFunci}`"
                            height="50" alt="">
                    </div>
                </div>
                <div class="div_vertical_bar col "></div>
                <div class="col s1  " style="margin-top:2%;margin-left: -4.3%;">
                    <a class="btn-small modal-trigger" href="#modalSobre" id="botaoSobre">
                        <i class=" material-icons small texto-diope">info</i>
                    </a>
                </div>
                <div class="col s1  " style="margin-top:2%;margin-left: -1.8%;" v-if="!true">
                    <a class="btn-small modal-trigger" href="#modalSettings" >
                        <i class=" material-icons small texto-diope">settings</i>
                    </a>
                </div>
            </li>
        </ul>
        <a class='dropdown-trigger ' ref='searchBtnDrop' data-target='dropdownSearch'></a>



    </div>
</template>
<script>
import M from "materialize-css";
import pesquisa from "../services/pesquisa";
export default {

    name: "nev",
    props: {
   
        chaveFunci: String,
        nomeFunci: String
    },
    data() {
        return {
            prtcBusca:"",
        }
    },
    mounted() {
        M.AutoInit()
    }, methods: {
        findProtocol: async function () {
            console.log("clck")

            const prtc = this.prtcBusca
            console.log(prtc)
            if(prtc.match(/(\d{9})/g)){

                const pr = await pesquisa.searchProtocolo(prtc)
                if(pr.data.status == 200){
                    console.log(pr.data.dados[0])
                    if(pr.data.dados.length > 0){
                        this.$router.push({ path: `/protocolo/${pr.data.dados[0].id}`, replace: true, params:{protocolo:pr.data.dados[0]} })
                        // window.location.href = "https://redediope.intranet.bb.com.br/validasiga/protocolo/" + pr.data.dados[0].id
                        this.$emit('setProtocolo', pr.data.dados[0])
                    }else{
                        M.toast({html:"protocolo não encontrado", class:"rounded red-text"})
                    }

                }else{
                M.toast({html:pr.data.msg})
                }
            }else{
                M.toast({html:"protocolo inválido", class:"rounded red-text"})
            }
        },
            verificaSearch: function(t){
                const k = t.keyCode
            console.log(k)
            if(k == 13){
               this.findProtocol()
            }
            },
        },
    watch:{
        prtcBusca: function(t){
          console.log(t)
        }
    }
}

</script>

<style scoped>
.texto-diope {
    color: #002D4B
}

.rounded {
    border-radius: 50%;
    height: 50px;
}

.font-BB {
    font-family: BancoDoBrasil Titulos Medium, Calibri, sans-serif;
}

.btn-small {
    background-color: rgb(255, 255, 255);
    border-radius: 6px;
    border: none;
    box-shadow: none;
}

.btn-small:hover {
    background-color: rgb(209, 209, 209);
    border-radius: 6px
}

.border-left {
    border-left: 1px solid rgb(209, 209, 209);
    ;
}

.div_vertical_bar {
    border-left: 2px solid;
    height: 35px;
    border-color: rgba(0, 45, 75, 0.2);
    margin-top: 1.5%
}

.busca {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.header-search::placeholder {
    text-align: left;
    padding-left: 1% !important;
    padding-top: 3% !important;

}

.nav-wrapper .input-field input[type=search] {
    height: inherit;
    padding-left: 1rem;
    padding-top: 1%;
    width: calc(100% - 4rem);
    border: 0;
    box-shadow: none;
}

.header-search::-ms-input-placeholder {
    text-align: left
}

/* 
.header-flex {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 10px;
    justify-content: space-between;
}

header {
    max-height: 7% !important;
}

.logo-title-container {
    display: flex;
    align-items: center;
    gap: 15px;
}

.logo-diope {
    width: 120px;
    margin-left: 10px;
}



.div_vertical_bar2 {
    border-left: 2px solid;
    height: 50px;
    border-color: rgba(0, 45, 75, 0.2);

}

.search-container {
    display: flex;
    align-items: center;
    gap: 15px;
}

.header-search {
    width: 250px;
    height: 30px;
}


.user-profile-container {
    width: 50px;
    height: 50px;
    border-radius: 100px;
    background-image: url("https://cenop1908.intranet.bb.com.br/imagens_relatorios/testeiras/temp/layoutsiga/layoutsigavalidacao/assets/img/blank-profile-pic.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 60px;
}

.user-profile {
    width: 50px;
    border-radius: 100px;
}

.user-name {
    font-size: 15px;
    padding-right: 10px;
} */
</style>