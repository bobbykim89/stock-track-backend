const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const connectDB = require('./database')
const schema = require('./schema/index')
const auth = require('./middleware/auth')
const bodyParser = require('body-parser')

const app = express()

// Connect to DB
connectDB()

// Allow cross-origin requests & body parser
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.setHeader(('Access-Control-Allow-Headers', 'Content-Type, Authorization'))
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

// Apply auth check middleware
app.use(auth)

// Serve app using GraphQL
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }))

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
