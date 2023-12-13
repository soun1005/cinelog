import mongoose, { Schema } from 'mongoose';

const favouriteSchema = new mongoose.Schema(
  {
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

const FavouriteModel = mongoose.model('Favourite', favouriteSchema);
export default FavouriteModel;
