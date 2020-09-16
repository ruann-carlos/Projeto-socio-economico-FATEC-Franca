const bodyparser = require("body-parser")

const express = require("express")
const app = express()

app.use(express.static("."))
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())

app.get("/teste", (req, res) => res.send("OK"))
app.listen(8080, () => console.log("Executando..."))
