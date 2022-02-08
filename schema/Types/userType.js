const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql')
const user = require('../../models/user')

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    token: { type: GraphQLString },
  }),
})

module.exports = UserType
