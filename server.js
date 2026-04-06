require('dotenv').config()
const express = require('express')
const cors = require('cors')
const db = require('./database')

const app = express()

const port = process.env.PORT || 2000

//Middlewares
app.use(express.json())
app.use(cors())

//Routes
app.use('/', require('./routes'))

//Function that connects to the database and starts the server
async function startServer() {
  try {
    await db.connect()
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`)
    })
  } catch (err) {
    console.error(err)
  }
}

startServer().catch(console.error)
