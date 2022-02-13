const { GraphQLList } = require('graphql')
const todo = require('../../models/todo')
const TodoType = require('../Types/todoTypes')

const GET_USER_TODOS = {
  type: new GraphQLList(TodoType),
  async resolve(root, args, req) {
    if (!req.auth) {
      throw new Error('Unauthenticated')
    }
    try {
      if (!req.user.id) {
        throw new Error('Unauthenticated')
      }
      const myTodos = await todo
        .find({ author: req.user.id })
        .sort({ date: -1 })
      return myTodos
    } catch (err) {
      throw err
    }
  },
}

module.exports = { GET_USER_TODOS }
