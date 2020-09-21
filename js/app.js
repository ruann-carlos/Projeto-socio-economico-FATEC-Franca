
const url = "/dados/result.json"
var registerMyCharts = {}
fetch(url)
   .then(resp => resp.json())
   .then(dados => {
       //Colocar os indices e a função que vai cuidade de processar e gerar os graficos
       let tipos = {
           19 : isDate,
           7 : isItens("Sim", "Não"),
           30: isItens("Sim", "Não")
       }
       let perguntas = labels(dados[0])
       dados = dados.map(dado => dado = padronizacao(dado))
       let resultados = separadorDeDados(perguntas, dados)
       console.log(perguntas)
       chartController(perguntas, resultados, tipos)
   })
//Delega as funções que serao aplicadas para cada pergunta
function chartController(labels, resultados, tipos) {
   let id = 1
   for (indexRes in labels) {
       if (tipos[indexRes]) {
           console.log(tipos[indexRes])
           let labelsAndRes = tipos[indexRes](resultados[labels[indexRes]])
           chartTypeController (labelsAndRes, id,labels[indexRes]);
           id += 1
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
   return categoria(idades)
}
//Lidar com itens
function isItens(pos, neg) {
   function inner(array) {
       let labelAndItens = {}
       for (let resposta of array) {
           for (let item in resposta) {
               //Se o item ainda não foi colocado
               if (!labelAndItens[item]) {
                   labelAndItens[item] = (resposta[item] == pos)? 1 : 0
               } else {
                   labelAndItens[item] += (resposta[item] == pos)? 1: 0
               }
           }
       }
       return labelAndItens
   }
   return inner
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
               backgroundColor: "#ff2200" // cor dos dados no gráfico
           }]
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
               backgroundColor: "#0000ff"// cor dos dados no gráfico
           }]
       }
   });
   return chart
}

function chartTypeController(arr,id,label){
   let select = document.getElementById("tipos");
   
   
   select.addEventListener("change", function(){
       console.log(registerMyCharts)
       let value = select.options[select.selectedIndex].value;
       if (registerMyCharts[id]) registerMyCharts[id].destroy()
       if(value == "ba"){
            registerMyCharts[id] = (makeChartBar(arr, id, label));
       } else if (value == "pi"){
            registerMyCharts[id] = (makeChartPie(arr, id, label));
       }
   })   
}