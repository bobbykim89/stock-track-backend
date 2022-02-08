const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  code: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('post', PostSchema)
