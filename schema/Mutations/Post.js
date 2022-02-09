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

// Create Post
const CREATE_POST = {
  type: PostType,
  args: {
    code: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(root, args, req) {
    if (!req.auth) {
      throw new Error('Unauthenticated')
    }
    try {
      const newPost = new post({
        code: args.code,
        author: req.user.id,
      })
      const { code, author } = newPost
      console.log(author)
      if (!author || !code) {
        throw new Error(
          'Some of required requests are missing please try again'
        )
      }
      await newPost.save()
      return newPost
    } catch (err) {
      throw err
    }
  },
}

const DELETE_POST = {
  type: PostType,
  args: { id: { type: GraphQLID } },
  async resolve(root, args, req) {
    if (!req.auth) {
      throw new Error('Unauthenticated')
    }
    try {
      return await post.findByIdAndDelete(args.id)
    } catch (err) {
      throw err
    }
  },
}

module.exports = {
  CREATE_POST,
  DELETE_POST,
}
