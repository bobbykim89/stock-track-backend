const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql')
const post = require('../../models/post')
const PostType = require('../Types/postType')

const GET_ALL_POSTS = {
  type: new GraphQLList(PostType),
  async resolve() {
    return await post.find({})
  },
}

const GET_USER_POSTS = {
  type: new GraphQLList(PostType),
  async resolve(root, args, req) {
    if (!req.auth) {
      throw new Error('Unauthenticated')
    }
    try {
      if (!req.user.id) {
        throw new Error('Unauthenticated')
      }
      const myPosts = await post.find({ author: req.user.id })
      return myPosts
    } catch (err) {
      throw err
    }
  },
}

module.exports = { GET_ALL_POSTS, GET_USER_POSTS }
