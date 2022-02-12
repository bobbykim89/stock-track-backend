const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
} = require('graphql')
const user = require('../../models/user')
const UserType = require('../Types/userType')

const TodoType = new GraphQLObjectType({
  name: 'Todo',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    complete: { type: GraphQLBoolean },
    type: { type: GraphQLString },
    author: {
      type: UserType,
      resolve(root, args) {
        const getUser = user.findById(root.author)
        return getUser
      },
    },
    date: { type: GraphQLString },
  }),
})

module.exports = TodoType
