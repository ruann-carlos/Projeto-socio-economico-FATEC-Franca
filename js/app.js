
const url = "/dados/result.json"
fetch(url)
    .then(resp => resp.json())
    .then(dados => {
        labels = labels(dados[0])
        dados = dados.map(dado => padronizacao(dado))
        console.log(labels)
        console.log(dados)
        console.log(labels[19])
        let datas = dados.map(dado => dado[labels[19]])
        idades = dataString.map(dataString => getIdadeByString(dataString))
        console.log(idades);
    })

function getIdadeByString(nascString) {
    let nascArray = nascString.split("-")
    let [ano, mes] = [Number(nascArray[0]), Number(nascArray[1])]
    let idade = 2020 - ano
    if (mes < 9) {
        return idade - 1
    } else return idade
}
function extrairDados(vetor) {
    let finalObj = {}
    for (obj of vetor) {
        for (prop in obj) {
            if (!finalObj[prop]) {
                finalObj[prop] = [obj[prop]]
            } else {
                finalObj[prop].push(obj[prop])
            }
        }
    }
    return finalObj
}

function labels(dados, inner=false, arr=null) {
    let perguntas = arr || Array()
    for (i in dados) {
        if (typeof dados[i] == "object") {
            if (!inner) {
                labels(dados[i], inner=true, perguntas)
                inner = false
            } else {
                perguntas.push(i.replace("\t", "").trim())
            }
        } else {
            perguntas.push(i.replace("\t", "").trim())
        }

    }
    
    return perguntas
}
function padronizacao(dados, inner=false, obj=null) {
    let perguntas = obj || Object()
    for (i in dados) {
        if (typeof dados[i] == "object") {
            if (!inner) {
                padronizacao(dados[i], inner=true, perguntas)
                inner = false
            } else {
                perguntas[i.replace("\t", "").trim()] = dados[i]
            }
        } else {
            perguntas[i.replace("\t", "").trim()] = dados[i]
        }

    }
    
    return perguntas
}