
const url = "/dados/result.json"
fetch(url)
    .then(resp => resp.json())
    .then(dados => {
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