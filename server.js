const express = require("express")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

require("./router")(app)

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`)
})
