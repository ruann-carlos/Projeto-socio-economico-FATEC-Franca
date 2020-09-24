function limpar(linha) {
    let linhas = linha.split('","')
    return linhas.reduce((arr, linha) => {
        if (linha.startsWith('"\r')) {
            linha = linha.replace('"\r', "")
        }
        if (linha.startsWith('"')) {
            linha = linha.slice(1)
        }
        if (linha.includes('\t')) {
            linha = linha.replace("\t", "")
        }
        if (linha.endsWith('"\r')) {
            linha = linha.replace('"\r', "")
        }
        arr.push(linha)
        return arr
    }, [])
}
function perguntasRepostas(perguntas, arrayRespostas) {
    let respostasFinais = []
    for (let respostas of arrayRespostas) {
        let resp = {}
        for (let index in perguntas) {
            let pergunta = perguntas[index]
            let resposta = respostas[index]
            let optionOn = pergunta.search(/\[.*\]$/)
            if (optionOn > 0) {
                let option = pergunta.slice(optionOn + 1, pergunta.length - 1)
                pergunta = pergunta.slice(0, optionOn - 1)
                if (!resp[pergunta]) {
                    resp[pergunta] = {}
                    resp[pergunta][option] = resposta
                } else {
                    resp[pergunta][option] = resposta
                }
            } else {
                resp[pergunta] = resposta
            }
        }
        respostasFinais.push(resp)
    }
    return respostasFinais
}
function retirarOptions(perguntasArrays) {
    let finalArray = []
    for (let pergunta of perguntasArrays) {
        let optionOn = pergunta.search(/\[.*\]$/)
        if (optionOn > 0) {
            pergunta = pergunta.slice(0, optionOn - 1)
            if (finalArray[finalArray.length - 1] != pergunta) {
                finalArray.push(pergunta)
            }
        } else {
            finalArray.push(pergunta)
        }
    }
    return finalArray
}