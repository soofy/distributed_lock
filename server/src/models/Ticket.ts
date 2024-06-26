import mongoose, { Schema } from 'mongoose'

const StatusEnum = Object.freeze({
  OPEN: 'open',
  DONE: 'done'
});

const ticket = new Schema({

  title: { type: String, required: true },
  description: { type: String, required: true },
  comments: String,
  status: {
    type: String,
    enum: Object.values(StatusEnum),
    default: StatusEnum.OPEN,
    required: true
  },
  lockedBy: String,
  handledBy: String,
  locked: {
    type: Boolean,
    default: false,
    required: true
  }
}, {
  timestamps: { createdAt: true, updatedAt: false }
});




ticket.index({ title: 1 }, { unique: true });

export default mongoose.model('Ticket', ticket)