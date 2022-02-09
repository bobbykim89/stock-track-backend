const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql')
const user = require('../../models/user')
const UserType = require('./userType')

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: GraphQLID },
    code: { type: GraphQLString },
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

module.exports = PostType
