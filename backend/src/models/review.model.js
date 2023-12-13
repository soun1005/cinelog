import mongoose, { Schema } from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    reviewTitle: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    comment: {
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
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const reviewModel = mongoose.model('Review', reviewSchema);
export default reviewModel;
