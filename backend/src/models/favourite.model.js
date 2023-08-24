import mongoose from 'mongoose';

export default mongoose.model(
  'Rating',
  mongoose.Schema({
    mediaId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    ratings: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  }),
  { timestamps: true }
);
