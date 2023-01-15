import mongoose from "mongoose";

const Schema = mongoose.Schema

const commentSchema = new Schema ({
  content: String,
  commenter: { type: Schema.Types.ObjectId, ref: 'Profile' }
}, {
  timestamps: true
})

const gameSchema = new Schema({
  name: String,
  image: String,
  purchase: String,
  platform: String,
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
  comments: [commentSchema]
}, {
  timestamps: true
})

const Game = mongoose.model('Game', gameSchema)

export {
  Game
}