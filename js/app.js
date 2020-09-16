window.onload = () => {
  function ajax(config) {
    const xhr = new XMLHttpRequest()
    xhr.open(config.metodo , config.url, true)

    xhr.onload = e => {
        if (xhr.status === 200) {
            config.sucesso(xhr.response)
        } else if (xhr.status >= 400) {
            config.erro({
                codigo: xhr.status,
                text: xhr.statusText
            })
        }
    }
    xhr.send() 
}

ajax ({
    url: "dados/result.json",
    metodo: "get",
    sucesso(response) {
        const result = JSON.parse(response)
        console.log(result)
    },
    erro(e) {
        const msg = document.createTextNode(`${e.codigo}: ${e.text}`)
    }
})
}