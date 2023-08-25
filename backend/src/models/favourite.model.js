import mongoose from 'mongoose';

export default mongoose.model(
  'Favourite',
  mongoose.Schema({
    mediaId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  }),
  { timestamps: true }
);
