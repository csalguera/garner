import mongoose from "mongoose";

const Schema = mongoose.Schema

const platformSchema = new Schema({
  name: { type: String, required: true },
  image: String,
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
}, {
  timestamps: true
})

const Platform = mongoose.model('Platform', platformSchema)

export {
  Platform
}