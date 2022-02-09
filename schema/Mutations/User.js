const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const user = require('../../models/user')
const UserType = require('../Types/userType')

// Signup User
const SIGNUP_USER = {
  type: UserType,
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(root, args) {
    try {
      const checkEmail = await user.findOne({ email: args.email })
      if (checkEmail) {
        throw new Error(
          'Following email address is already in use, Please use different Email'
        )
      }
      const newUser = new user({
        username: args.username,
        email: args.email,
        password: args.password,
      })
      const salt = await bcrypt.genSalt(10)
      newUser.password = await bcrypt.hash(args.password, salt)
      await newUser.save()
      const payload = {
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
        },
      }
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '7d',
      })
      return {
        username: newUser.username,
        email: newUser.email,
        id: newUser.id,
        password: newUser.password,
        token: token,
      }
    } catch (err) {
      throw err
    }
  },
}

const LOGIN_USER = {
  type: UserType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(root, args) {
    try {
      const getUser = await user.findOne({ email: args.email })
      if (!getUser) {
        throw new Error(
          'Invalid user info, please check email or password again'
        )
      }
      const { username, email, password, id } = getUser
      const checkPassword = await bcrypt.compare(args.password, password)
      if (!checkPassword) {
        throw new Error(
          'Invalid user info, please check email or password again'
        )
      }

      const payload = {
        user: {
          id: id,
          username: username,
          email: email,
        },
      }
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '7d',
      })
      return {
        email: email,
        password: password,
        username: username,
        id: id,
        token: token,
      }
    } catch (err) {
      throw err
    }
  },
}

module.exports = { SIGNUP_USER, LOGIN_USER }
