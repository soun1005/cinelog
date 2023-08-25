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
    console.log('posted movie as favourite');
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

    if (favourite) {
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

// load reviews and the movie info that matches the review by id
// fetch movie information and credit here when it's called
const loadFavouritedList = async (req, res) => {
  try {
    // grab token from request
    const token = req.headers.authorization.split('Bearer')[1].trim();
    const decodedToken = jwt.decode(token);
    const favourited = await Favourite.find({ userId: decodedToken });
    // console.log(review);
    if (favourited) {
      // const reviews = res.status(200).json(review);

      const movieId = favourited.map((movie) => {
        return movie.mediaId;
      });

      const movieDataPromises = movieId.map(
        async (movieId) => await fetchMovieInfoById(movieId)
      );

      const movieData = await Promise.all(movieDataPromises);

      return res.status(200).json({ favouritedList: favourited, movieData });
    } else {
      res.status(404).json({ error: 'Favourited list not found' });
    }
    // res.body = user.toObject()
    // res.status(200).json({ userName });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default {
  createFavourite,
  checkFavouriteStatus,
  deleteFavourite,
  loadFavouritedList,
};
