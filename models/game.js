import mongoose from "mongoose";

const Schema = mongoose.Schema

const commentSchema = new Schema ({
  content: {type: String, required: true},
  commenter: { type: Schema.Types.ObjectId, ref: 'Profile' }
}, {
  timestamps: true
})

const gameSchema = new Schema({
  name: {type: String, required: true},
  image: String,
  platforms: [{ type: Schema.Types.ObjectId, ref: 'Platform' }],
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
  comments: [commentSchema]
}, {
  timestamps: true
})

const Game = mongoose.model('Game', gameSchema)

export {
  Game
}