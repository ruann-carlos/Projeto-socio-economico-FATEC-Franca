
function extrairDados(vetor) {
    let finalArray = []
    for (obj of vetor) {
        for (prop in obj) {
            finalArray.push(obj[prop])
        }
    }
    return finalArray
}
const url = "/dados/result.json"
fetch(url)
    .then(resp => resp.json())
    .then(dados => {
        let datas = dados.map(pessoa => pessoa[8])

        let dataString = extrairDados(datas)
        console.log(dataString)
    })