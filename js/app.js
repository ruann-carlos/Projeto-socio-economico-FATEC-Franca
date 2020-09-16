
const url = "/dados/result.json"
fetch(url)
    .then(resp => resp.json())
    .then(dados => {
        console.log(dados)
        console.log(dados[0])
    })