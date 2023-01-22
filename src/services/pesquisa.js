import axios from 'axios'
import https from "https"
const url = process.env.NODE_ENV == "development" ? "https://localhost.bb.com.br:7000/" : "https://gs4935.intranet.bb.com.br/validaSiga/api/"
export default {


    getProtocolos: async function (status, protocolo) {
        
        let Getobjeto = {
            method: 'get',
            url: url+"protocolos?status="+status+"&protocolo="+protocolo,
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }), validateStatus: function (status) {
                if (status < 501) {
                    return true
                } // Resolve only if the status code is less than 500
            }
        }
        return await axios(Getobjeto)

    },
    getQuantidade: async function () {
        
        let Getobjeto = {
            method: 'get',
            url: url+"countProtocolos",
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }), validateStatus: function (status) {
                if (status < 501) {
                    return true
                } // Resolve only if the status code is less than 500
            }
        }
        return await axios(Getobjeto)

    },
    searchProtocolo: async function (protocolo) {
        
        let Getobjeto = {
            method: 'post',
            url: url+"searchProtocolo",
            data: {protocolo},
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }), validateStatus: function (status) {
                if (status < 501) {
                    return true
                } // Resolve only if the status code is less than 500
            }
        }
        return await axios(Getobjeto)

    },
    getProtocolosValidados: async function (status, protocolo=0) {
        
        let Getobjeto = {
            method: 'get',
            url: url+"protocolosValidados?status="+status+"&protocolo="+protocolo,
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }), validateStatus: function (status) {
                if (status < 501) {
                    return true
                } // Resolve only if the status code is less than 500
            }
        }
        return await axios(Getobjeto)

    },
    getPerguntasProtocolos: async function (protocolo) {
        
        let Getobjeto = {
            method: 'post',
            url: url+"perguntasProtocolo",
            data:{protocolo},
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }), validateStatus: function (status) {
                if (status < 501) {
                    return true
                } // Resolve only if the status code is less than 500
            }
        }
        return await axios(Getobjeto)

    },
    getAndamentosProtocolo: async function (protocolo) {

        let Getobjeto = {
            method: 'post',
            url: url + "andamentosProtocolo",
            data:{protocolo},
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }), validateStatus: function (status) {
                if (status < 501) {
                    return true
                } // Resolve only if the status code is less than 500
            }
        }
        return await axios(Getobjeto)

    },   
    getAnexos: async function (protocolo) {

        let Getobjeto = {
            method: 'post',
            data:{protocolo},
            url: url + "anexos",
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }), validateStatus: function (status) {
                if (status < 501) {
                    return true
                } // Resolve only if the status code is less than 500
            }
        }
        return await axios(Getobjeto)

    }, 
    getStatus: async function (protocolo) {

        let Getobjeto = {
            method: 'post',
            data:{protocolo},
            url: url + "getStatus",
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }), validateStatus: function (status) {
                if (status < 501) {
                    return true
                } // Resolve only if the status code is less than 500
            }
        }
        return await axios(Getobjeto)

    }, 
    getFases: async function (protocolo) {

        let Getobjeto = {
            method: 'post',
            data:{protocolo},
            url: url + "getFases",
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }), validateStatus: function (status) {
                if (status < 501) {
                    return true
                } // Resolve only if the status code is less than 500
            }
        }
        return await axios(Getobjeto)

    }, 
    getFunci: async function () {
        const urls = "https://gs4935.intranet.bb.com.br/api/login/"

        let Getobjeto = {
            method: 'get',
            url: urls,
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }), validateStatus: function (status) {
                if (status < 501) {
                    return true
                } // Resolve only if the status code is less than 500
            }
        }
        return await axios(Getobjeto)
    },
     acesso: async function () {

        let Getobjeto = {
            method: 'get',
            url: url + "verificaAcesso",
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }), validateStatus: function (status) {
                if (status < 501) {
                    return true
                } // Resolve only if the status code is less than 500
            }
        }
        return await axios(Getobjeto)
    },
    updateResposta: async function (resposta,id) {

       let Getobjeto = {
           method: 'post',
           url: url + "updateResposta",
           data:{resposta,id},
           strictSSL: false,
           withCredentials: true,
           json: true,
           httpsAgent: new https.Agent({
               rejectUnauthorized: false
           }), validateStatus: function (status) {
               if (status <= 403) {
                   return true
               } // Resolve only if the status code is less than 500
           }
       }
       return await axios(Getobjeto)
   }
   ,
   updateStatus: async function (protocolo,status,obs, gsol, prefixoSolicitado) {

       let Getobjeto = {
           method: 'post',
           url: url + "updateStatus",
           data:{protocolo,status,obs, gsol, prefixoSolicitado},
           strictSSL: false,
           withCredentials: true,
           json: true,
           httpsAgent: new https.Agent({
               rejectUnauthorized: false
           }), validateStatus: function (status) {
               if (status <= 403) {
                   return true
               } // Resolve only if the status code is less than 500
           }
       }
       return await axios(Getobjeto)
   },
   acessosComissao: async function () {

    let Getobjeto = {
        method: 'get',
        url: url + "acessosComissao",
        strictSSL: false,
        withCredentials: true,
        json: true,
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        }), validateStatus: function (status) {
            if (status < 501) {
                return true
            } // Resolve only if the status code is less than 500
        }
    }
    return await axios(Getobjeto)
},acessosFase: async function (status) {

    let Getobjeto = {
        method: 'post',
        url: url + "getAcessoFases",
        data:{status},
        strictSSL: false,
        withCredentials: true,
        json: true,
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        }), validateStatus: function (status) {
            if (status < 501) {
                return true
            } // Resolve only if the status code is less than 500
        }
    }
    return await axios(Getobjeto)
},getObsNecessaria: async function () {

    let Getobjeto = {
        method: 'get',
        url: url + "getObsNecessaria",
        strictSSL: false,
        withCredentials: true,
        json: true,
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        }), validateStatus: function (status) {
            if (status < 501) {
                return true
            } // Resolve only if the status code is less than 500
        }
    }
    return await axios(Getobjeto)
},getGSol: async function () {

    let Getobjeto = {
        method: 'get',
        url: url + "gerSolucao",
        strictSSL: false,
        withCredentials: true,
        json: true,
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        }), validateStatus: function (status) {
            if (status < 501) {
                return true
            } // Resolve only if the status code is less than 500
        }
    }
    return await axios(Getobjeto)
},getTeste: async function () {

    let Getobjeto = {
        method: 'get',
        url: url + "chavesteste",
        strictSSL: false,
        withCredentials: true,
        json: true,
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        }), validateStatus: function (status) {
            if (status < 501) {
                return true
            } // Resolve only if the status code is less than 500
        }
    }
    return await axios(Getobjeto)
},


getStatusAtual: async function (protocolo) {

    let Getobjeto = {
        method: 'post',
        url: url + "getStatusAtual",
        data:{protocolo},
        strictSSL: false,
        withCredentials: true,
        json: true,
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        }), validateStatus: function (status) {
            if (status < 501) {
                return true
            } // Resolve only if the status code is less than 500
        }
    }
    return await axios(Getobjeto)
},
permiteEdicao: async function (protocolo) {

    let Getobjeto = {
        method: 'post',
        url: url + "permiteEdicao",
        data:{protocolo},
        strictSSL: false,
        withCredentials: true,
        json: true,
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        }), validateStatus: function (status) {
            if (status < 501) {
                return true
            } // Resolve only if the status code is less than 500
        }
    }
    return await axios(Getobjeto)
},
getPrefixos: async function () {

    let Getobjeto = {
        method: 'get',
        url: url + "prefixos",
        strictSSL: false,
        withCredentials: true,
        json: true,
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        }), validateStatus: function (status) {
            if (status < 501) {
                return true
            } // Resolve only if the status code is less than 500
        }
    }
    return await axios(Getobjeto)
},
get: async function (uri) {

    let Getobjeto = {
        method: 'get',
        url: url+uri,
        strictSSL: false,
        withCredentials: true,
        json: true,
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        }), validateStatus: function (status) {
            if (status < 501) {
                return true
            } // Resolve only if the status code is less than 500
        }
    }
    return await axios(Getobjeto)
},
post: async function (uri, param) {

    let Getobjeto = {
        method: 'post',
        url: url+uri,
        data:param,
        strictSSL: false,
        withCredentials: true,
        json: true,
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        }), validateStatus: function (status) {
            if (status < 501) {
                return true
            } // Resolve only if the status code is less than 500
        }
    }
    return await axios(Getobjeto)
},

}