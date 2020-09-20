
const url = "/dados/result.json"
 fetch(url)
    .then(resp => resp.json())
    .then(dados => {
        //Colocar os indices e a função que vai cuidade de processar e gerar os graficos
        let tipos = {
            32: isDate,
        }
        dados = dados.map(dado => dado = padronizacao(dado))
        let perguntas = labels(dados[0])
        let resultados = separadorDeDados(perguntas, dados)
        delegador(perguntas, resultados, tipos)
    })
//Delega as funções que serao aplicadas para cada pergunta
function delegador(labels, resultados, tipos) {
    for (indexRes in labels) {
        if (tipos[indexRes]) {
            console.log(tipos[indexRes])
            tipos[indexRes](resultados[labels[indexRes]])
        }
    }
}
//junta todas as perguntas por perguntas, para que depois possa ser delegado uma função para para arrays de respostas
function separadorDeDados(indices, dados) {
    let obj = {}
    for (respostas of dados) {
        for (pergunta of indices) {
            if (!obj[pergunta]) {
                obj[pergunta] = [respostas[pergunta]]
            } else {
                obj[pergunta].push(respostas[pergunta])
            }
        }
    }
    return obj
}
function getIdadeByString(nascString) {// função para pegar datas  da pergunta de nascimento do json 
    let nascArray = nascString.split("-")
    let [ano, mes] = [Number(nascArray[0]), Number(nascArray[1])]
    let idade = 2020 - ano
    if (mes < 9) {
        return idade - 1
    } else return idade
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
// Lidar com datas
function isDate(array) {
    let idades = array.map(dateString => getIdadeByString(dateString))
    makeChart(categoria(idades))
}

function categoria (arr){//função para classificação da idade em categorias 
    const categorias = {
        "15 a 20": 0,
        "21 a 25": 0,
        "26 a 30": 0,
        "31 a 35": 0,
        "36 a 40": 0,
        "40+":0
    }
    for(let i of arr){
        if(i >15 && i <= 20){
            categorias["15 a 20"]++;
        }else if(i < 26){
            categorias["21 a 25"]++;
        }else if(i <=30){
            categorias["26 a 30"]++;
        }else if(i < 36){
            categorias["31 a 35"]++;
        }else if(i <= 40){
            categorias["36 a 40"]++;
        }else if(i > 40){
            categorias["40+"]++
        }
    }
    return categorias;
}

function makeChart(arr){ //função que pega os dados de vetores e objetos para a criação do gráfico
    let res = Object.values(arr);
    let chart =  new Chart(primeiroGrafico, {
        type:'bar',

        data: {
            labels: ['15-20', '20-25', '25-30', '30-35', '35-40', '40+'],
            datasets:[{
                label: ['idade'],
                data: res,
                backgroundColor: "#ff2200"
            }]
        }
    });
}
