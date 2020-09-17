
const url = "/dados/result.json"
fetch(url)
    .then(resp => resp.json())
    .then(dados => {
        let datas = dados.map(pessoa => pessoa[8]);
        let dataString = extrairDados2(datas)
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