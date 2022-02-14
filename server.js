const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const connectDB = require('./database')
const schema = require('./schema/index')
const auth = require('./middleware/auth')
const cors = require('cors')
const cacheControl = require('express-cache-controller')

const app = express()

// Connect to DB
connectDB()

// Allow cross-origin requests

app.use(
  cors({
    origin: ['https://stock-track-woad.vercel.app/', 'http://localhost:3000/'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

app.use(
  cacheControl({
    noCache: true,
  })
)

// Apply auth check middleware
app.use(auth)

// Serve app using GraphQL
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }))

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
