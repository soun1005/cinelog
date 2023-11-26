import Favourite from '../models/favourite.model.js';
import fetchMovieInfoById from '../resolver/fetchMovieInfoById.js';
import jwt from 'jsonwebtoken';

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

const loadFavouritedList = async (req, res) => {
  const page = parseInt(req.query.page || '0');
  // 10 lists in each page
  const PAGE_SIZE = 10;

  try {
    // grab token from request
    const token = req.headers.authorization.split('Bearer')[1].trim();
    const decodedToken = jwt.decode(token);
    const favourited = await Favourite.find({ userId: decodedToken })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);

    if (favourited) {
      // get all media id of favourited lists
      const movieId = favourited.map((movie) => {
        return movie.mediaId;
      });

      const total = await Favourite.find({
        userId: decodedToken,
      }).countDocuments({});

      // by the mediaId, using resolver, load movie infos to display poster and information
      const movieDataPromises = movieId.map(
        async (movieId) => await fetchMovieInfoById(movieId)
      );

      const movieData = await Promise.all(movieDataPromises);

      return res.status(200).json({
        favouritedList: favourited,
        movieData,
        // total numbers of pages
        total: Math.ceil(total / PAGE_SIZE),
        dataLength: total,
      });
    } else {
      res.status(404).json({ error: 'Favourited list not found' });
    }
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
