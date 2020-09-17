


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
const url = "/dados/result.json"
fetch(url)
    .then(resp => resp.json())
    .then(dados => {
        let datas = dados.map(pessoa => pessoa[8])
        
        let dataString = extrairDados2(datas)
        console.log(dataString)
    })