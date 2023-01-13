import mongoose from "mongoose";

const Schema = mongoose.Schema

const gameSchem = new Schema({
  name: String,
  image: String,
  purchase: String,
  owner: {type: Schema.Types.ObjectId, ref: 'Profile'},
  // will add comment Model
  // comments: [commentSchema]
}, {
  timestamps: true
})

const Game = mongoose.model('Game', gameSchem)

export {
  Game
}