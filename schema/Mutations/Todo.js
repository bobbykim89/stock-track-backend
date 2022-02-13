const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
} = require('graphql')
const todo = require('../../models/todo')
const TodoType = require('../Types/todoTypes')

const CREATE_TODO = {
  type: TodoType,
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: GraphQLString },
    type: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(root, args, req) {
    if (!req.auth) {
      throw new Error('Unauthenticated')
    }
    try {
      const newTodo = new todo({
        title: args.title,
        content: args.content,
        type: args.type,
        author: req.user.id,
      })
      const { title, author } = newTodo
      if (!author || !title) {
        throw new Error(
          'Some of required requests are missing please try again'
        )
      }
      await newTodo.save()
      return newTodo
    } catch (err) {
      throw err
    }
  },
}

const EDIT_TODO = {
  type: TodoType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    type: { type: GraphQLString },
  },
  async resolve(root, args, req) {
    if (!req.auth) {
      throw new Error('Unauthenticated')
    }
    try {
      let updatedTodo = await todo.findById(args.id)
      if (!updatedTodo) {
        throw new Error('Todo not found')
      }
      updatedTodo = await todo.findByIdAndUpdate(
        args.id,
        {
          title: args.title,
          content: args.content,
          type: args.type,
        },
        { new: true }
      )

      return updatedTodo
    } catch (err) {
      throw err
    }
  },
}

const TOGGLE_COMPLETE = {
  type: TodoType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    complete: { type: GraphQLBoolean },
  },
  async resolve(root, args, req) {
    if (!req.auth) {
      throw new Error('Unauthenticated')
    }
    try {
      let updatedTodo = await todo.findById(args.id)
      if (!updatedTodo) {
        throw new Error('Todo not found')
      }
      updatedTodo = await todo.findByIdAndUpdate(
        args.id,
        { complete: args.complete },
        { new: true }
      )

      return updatedTodo
    } catch (err) {
      throw err
    }
  },
}

const DELETE_TODO = {
  type: TodoType,
  args: { id: { type: GraphQLID } },
  async resolve(root, args, req) {
    if (!req.auth) {
      throw new Error('Unauthenticated')
    }
    try {
      return await todo.findByIdAndDelete(args.id)
    } catch (err) {
      throw err
    }
  },
}

module.exports = { CREATE_TODO, EDIT_TODO, DELETE_TODO, TOGGLE_COMPLETE }
