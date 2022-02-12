const { GraphQLObjectType, GraphQLSchema } = require('graphql')

// Import Queries
const { GET_CURRENT_USER } = require('./Queries/User')
const { GET_ALL_POSTS, GET_USER_POSTS } = require('./Queries/Post')
const { GET_USER_TODOS } = require('./Queries/Todo')

// Import Mutations
const { SIGNUP_USER, LOGIN_USER } = require('./Mutations/User')
const { CREATE_POST, DELETE_POST } = require('./Mutations/Post')
const {
  CREATE_TODO,
  EDIT_TODO,
  TOGGLE_COMPLETE,
  DELETE_TODO,
} = require('./Mutations/Todo')

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    GET_CURRENT_USER,
    GET_ALL_POSTS,
    GET_USER_POSTS,
    GET_USER_TODOS,
  },
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    SIGNUP_USER,
    LOGIN_USER,
    CREATE_POST,
    DELETE_POST,
    CREATE_TODO,
    EDIT_TODO,
    DELETE_TODO,
    TOGGLE_COMPLETE,
  },
})

// Export Schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
})
