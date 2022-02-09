const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')
const connectDB = require('./database')
const schema = require('./schema/index')
const auth = require('./middleware/auth')
const bodyParser = require('body-parser')

const app = express()

// Connect to DB
connectDB()

// Allow cross-origin requests & body parser
app.use(cors())
app.use(bodyParser.json())

// Apply auth check middleware
app.use(auth)

// Serve app using GraphQL
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }))

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
