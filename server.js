const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')

const app = express()

// Allow cross-origin requests
app.use(cors())

// Connect to DB
