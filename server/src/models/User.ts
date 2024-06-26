import mongoose, { Schema } from 'mongoose'
//import mongooseFuzzySearching from 'mongoose-fuzzy-searching'

const StatusEnum = Object.freeze({
  OPEN: 'open',
  DONE: 'done'
});


const user = new Schema({
  email: { type: String, required: true },
  fullName: { type: String, required: true },
  lockedBy: String,
  handledBy: String,
  status: {
    type: String,
    enum: Object.values(StatusEnum),
    default: StatusEnum.OPEN,
    required: true
  },
  locked: {
    type: Boolean,
    default: false,
    required: true
  }

})

user.index({ email: 1 }, { unique: true });

export default mongoose.model('User', user)