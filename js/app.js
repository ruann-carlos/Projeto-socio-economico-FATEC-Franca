


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
<<<<<<< HEAD
        let datas = dados.map(pessoa => pessoa[8]);
        let datasString = getStringAno(datas);
        idades = datasString.map(dataString => getIdadeByString(dataString))
        console.log(idades);
    })
function getStringAno(arr){
    const arrayAnos= [];
    for(obj of arr){
        for(ano in obj){
            arrayAnos.push(obj[ano]);
        }
    }
    return arrayAnos;
}
function getIdadeByString(nascString) {
    let nascArray = nascString.split("-")
    let [ano, mes] = [Number(nascArray[0]), Number(nascArray[1])]
    let idade = 2020 - ano
    if (mes < 9) {
        return idade - 1
    } else return idade
}
=======
        let datas = dados.map(pessoa => pessoa[8])
        
        let dataString = extrairDados2(datas)
        console.log(dataString)
    })
>>>>>>> 5145c9169a4ce38d24a5a112ce8d35bbec4401a1
