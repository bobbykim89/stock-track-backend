const { GraphQLObjectType, GraphQLSchema } = require('graphql')

// Import Queries

// Import Mutations

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {},
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {},
})

// Export Schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
})
