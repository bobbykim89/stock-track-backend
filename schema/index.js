const { GraphQLObjectType, GraphQLSchema } = require('graphql')

// Import Queries
const { GET_CURRENT_USER } = require('./Queries/User')
const { GET_ALL_POSTS, GET_USER_POSTS } = require('./Queries/Post')

// Import Mutations
const { SIGNUP_USER, LOGIN_USER } = require('./Mutations/User')
const { CREATE_POST, DELETE_POST } = require('./Mutations/Post')

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: { GET_CURRENT_USER, GET_ALL_POSTS, GET_USER_POSTS },
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    SIGNUP_USER,
    LOGIN_USER,
    CREATE_POST,
    DELETE_POST,
  },
})

// Export Schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
})
