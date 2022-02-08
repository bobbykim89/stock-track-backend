const { GraphQLObjectType, GraphQLSchema } = require('graphql')

// Import Queries
const { GET_CURRENT_USER } = require('./Queries/User')

// Import Mutations
const { SIGNUP_USER, LOGIN_USER } = require('./Mutations/User')

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: { GET_CURRENT_USER },
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    SIGNUP_USER,
    LOGIN_USER,
  },
})

// Export Schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
})
