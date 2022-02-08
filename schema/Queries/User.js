const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql')

const user = require('../../models/user')
const UserType = require('../Types/userType')

const GET_CURRENT_USER = {
  type: UserType,
  async resolve(root, args, req) {
    if (!req.auth) {
      throw new Error('Unauthenticated')
    }
    try {
      const currentUser = await user.findbyId(req.user.id).select('-password')
      return currentUser
    } catch (err) {
      throw err
    }
  },
}

module.exports = {
  GET_CURRENT_USER,
}
