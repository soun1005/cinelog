import mongoose from 'mongoose';

export default mongoose.model(
  'Movie',
  mongoose.Schema({
    reviewTitle: {
      type: String,
      required: true,
    },
    reviewDate: {
      type: String,
      required: true,
    },
    reviewComment: {
      type: String,
      required: true,
    },
    ratings: {
      type: Number,
      required: true,
    },
    mediaId: {
      type: String,
      required: true,
    },
    mediaTitle: {
      type: String,
      required: true,
    },
    mediaPoster: {
      type: String,
      required: true,
    },
  }),
  { timestamps: true }
);
