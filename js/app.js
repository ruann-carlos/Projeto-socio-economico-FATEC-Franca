
const url = "/dados/result.json"
var registerMyCharts = {}
fetch(url)
   .then(resp => resp.json())
   .then(dados => {
       //Colocar os indices e a função que vai cuidade de processar e gerar os graficos
       let tipos = {
           19 : isDate,
           7 : isItens,
           30: isItens,
           29: isItens,
           9: isOption,
           39: isOption
       }
       let perguntas = labels(dados[0])
       dados = dados.map(dado => dado = padronizacao(dado))
       let resultados = separadorDeDados(perguntas, dados)
       console.log(perguntas)
       console.log(resultados)
       questionController(perguntas, resultados, tipos);
   })
//Delega as funções que serao aplicadas para cada pergunta
function chartController(labels, resultados, tipos,tipo) {//antigo delegador
   let id = 1 
    if (tipos[tipo]) {//se o tipo escolhido pelo usuário estiver definido dentro das funções tipo então ele entrará na condição
        let labelsAndRes = tipos[tipo](resultados[labels[tipo]]); //Pega as perguntas e respostas do indice escolhido pelo usuário
        chartTypeController (labelsAndRes, id,labels[tipo]);//chama a função de controle do tipo de gráfico
         id += 1
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
   return categoria(idades)
}
//Lidar com itens
function isItens(array) {
       let labelAndItens = {}
       for (let resposta of array) {
           for (let item in resposta) {
               //Se o item ainda não foi colocado
               if (!labelAndItens[item]) {
                   if (Number.isNaN(Number(resposta[item]))) {
                       labelAndItens[item] = (resposta[item] == "Sim")? 1 : 0
                   } else {
                        labelAndItens[item] = Number(resposta[item])
                   }
               } else {
                   if (Number.isNaN(Number(resposta[item]))) {
                    labelAndItens[item] += (resposta[item] == "Sim")? 1: 0
                   } else {
                       labelAndItens[item] += Number(resposta[item])
                   } 
               }
           }
       }
    return labelAndItens
}

function isOption(array) {
    let labelAndItens = {}
    for (respostas of array) {
        for (let resposta of respostas.split(";")) {
            if (!resposta == "") {
                if (!labelAndItens[resposta]) {
                    labelAndItens[resposta] = 1
                } else {
                    labelAndItens[resposta] += 1
                }
            } else {
                if (labelAndItens["não respondeu"]) {
                    labelAndItens["não respondeu"] += 1
                } else {
                    labelAndItens["não respondeu"] = 1
                }
                    
            }
        }
    }
    console.log(labelAndItens)
    return labelAndItens
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

function makeChartBar(arr, id, label){ //função que pega os dados de vetores e objetos para a criação do gráfico de barras
   let res = Object.values(arr);
   
   let canvas = document.createElement("canvas")//cria espaço para gráfico
   canvas.id = id
   document.getElementsByTagName("body")[0].appendChild(canvas)
   let chart = new Chart(String(id), { //cria o gŕafico em si
       type:'bar',

       data: {
           labels: [...Object.keys(arr)],
           datasets:[{
               label: [label],//pergunta que será o título do gráfico
               data: res,//dados para serem montados 
               backgroundColor: colorGenerator(Object.values(arr))// cor dos dados no gráfico
           }]
       },
       options:{
            title:{
                display: true,
                text:label
            }
       }
   });
   return chart
}

function makeChartPie(arr, id, label){ //função que pega os dados de vetores e objetos para a criação do gráfico
   let res = Object.values(arr);
   let canvas = document.createElement("canvas")
   canvas.id = id
   document.getElementsByTagName("body")[0].appendChild(canvas)
   let chart = new Chart(String(id), {
       type:'pie',

       data: {
           labels: [...Object.keys(arr)],
           datasets:[{
               label: [label],
               data: res,
               backgroundColor:colorGenerator(Object.values(arr))

                // cor dos dados no gráfico
               
           }]
       },
       options:{
            title:{
            display: true,
            text:label
            }
        }
   });
   return chart
}

function chartTypeController(arr,id,label){//Controla o tipo do gráfico, ouvindo as atualizações da escoha o usuário no html
   let select = document.getElementById("tipos");

   select.addEventListener("change", function(){//escuta mudanças
        
        let value = select.options[select.selectedIndex].value;//obtem a opção escolhida pelo usuário
        if (registerMyCharts[id]) registerMyCharts[id].destroy()//Destrói possíveis gráficos anteriores
        if(value == "ba"){
            registerMyCharts[id] = (makeChartBar(arr, id, label)); //faz gráfico de barras
        }else if (value == "pi"){
            registerMyCharts[id] = (makeChartPie(arr, id, label));//faz gráfico de pizza
       }
   })   
}

function questionController(labels, resultados, tipos){//controla a atualização da seleção da pergunta pelo usuário
    let questions = document.getElementById("resposta");//obtem o elemento do select

    questions.addEventListener("change", function(){//eventListener para escutar as atualizações
        let question = Number(questions.options[questions.selectedIndex].value);//obtém valor selecionado
        chartController(labels, resultados, tipos,question);// com o valor da opção obtida, chama a função de controle de gráficos, passando o valor da opção como um dos parâmetros
    })
}

function colorGenerator(arr){//gera cores hexadecimais aleatóriamente
    let hexadecimais = "0123456789ABCDEF";//valores hexadecimais
    let arraycolor = [];//array de cores
    for(let i= 0; i < arr.length; i++){
        let cor = '#';
        // Pega um número aleatório no array acima
        for (let j = 0; j < 6; j++ ) {
        //E concatena à variável cor
            cor += hexadecimais[Math.floor(Math.random() * 8)];
        }
        arraycolor.push(cor);
    }   
    return arraycolor;
}