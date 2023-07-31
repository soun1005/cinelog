import mongoose from 'mongoose';

export default mongoose.model(
  'Rating',
  mongoose.Schema({
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
    mediaRatings: {
      type: Number,
      required: true,
    },
  }),
  { timestamps: true }
);
