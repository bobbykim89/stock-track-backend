const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = require('graphql')
const user = require('../../models/user')
const UserType = require('./userType')

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: GraphQLID },
    code: { type: GraphQLString },
    author: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return user.find({ userId: parent.id })
      },
    },
  }),
})

module.exports = PostType
