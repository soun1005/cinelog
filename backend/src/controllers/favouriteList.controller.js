import Favourite from '../models/favourite.model.js';
import mongoose from 'mongoose';

// create favourite list
const createFavourite = async (req, res) => {
  const { mediaId } = req.body;
  const userId = req.user._id;

  // add data to db
  try {
    const favourite = await Favourite.create({
      mediaId,
      userId,
    });
    res.status(200).json(favourite);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// check if favourite already exist
const checkFavouriteStatus = async (req, res) => {
  const { mediaId } = req.body;
  const userId = req.user._id;

  // add data to db
  try {
    const favourite = await Favourite.findOne({
      mediaId,
      userId,
    });

    if (review) {
      res.status(200).json({ favourited: true });
    } else {
      res.status(200).json({ favourited: false });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// delete a favourite list
const deleteFavourite = async (req, res) => {
  //   console.log(typeof req.params.id);

  try {
    const { id: mediaId } = req.params;
    const result = await Favourite.deleteOne({ mediaId: mediaId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'No favourited movie found' });
    }

    res
      .status(200)
      .json({ message: 'This movie is deleted from favourite list' });
  } catch (error) {
    res.status(404).json({ error: 'Cannot find favourite list of this movie' });
  }
};

export default {
  createFavourite,
  checkFavouriteStatus,
  deleteFavourite,
};
