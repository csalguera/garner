import mongoose from "mongoose";

const Schema = mongoose.Schema

const gameSchema = new Schema({
  name: String,
  image: String,
  purchase: String,
  platform: String,
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
  // will add comment Model
  // comments: [commentSchema]
}, {
  timestamps: true
})

const Game = mongoose.model('Game', gameSchema)

export {
  Game
}