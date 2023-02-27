import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'task most have a title'],
      trim: true,
      maxlength: [100, 'task character most be lower than 100'],
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },

  { versionKey: '__ver', timestamps: true },
)

export default mongoose.model('Task', taskSchema)
