const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const routes = require('./routes')
const cors = require('cors')

const app = express()

app.use(cors)
app.use(morgan('dev'))
app.use(helmet())
app.use(express.json())


app.use(routes)

const PORT = process.env.PORT || 3333

app.listen(PORT, () => {
  console.log(`SERVIDOR INICIADO NA PORTA ${PORT}`)
})