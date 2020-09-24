
function nda() {
    console.log("nda")
}
nda()
function preProcessingJson(dados) {
    return [labels(dados[0]), dados.map(dado => dado = padronizacao(dado))]
}
function labels(dados, inner=false, arr=null) {//função para pegar labels do json
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
 function padronizacao(dados, inner=false, obj=null) {//função do pra padronizar (o?o)
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