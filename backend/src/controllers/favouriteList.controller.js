import Favourite from '../models/favourite.model.js';
import fetchMovieInfoById from '../resolver/fetchMovieInfoById.js';
import jwt from 'jsonwebtoken';
import responseHandler from '../handlers/response.handler.js';

// create favourite list
const createFavourite = async (req, res) => {
  const { mediaId, title } = req.body;
  const userId = req.user._id;

  // add data to db
  try {
    const favourite = await Favourite.create({
      mediaId,
      userId,
      title,
    });
    // res.status(200).json(favourite);
    responseHandler.ok(res, favourite);
    console.log('posted movie as favourite');
  } catch (error) {
    responseHandler.badrequest(error, error.message);
    // res.status(400).json({ error: err.message });
  }
};

// delete a favourite list
const deleteFavourite = async (req, res) => {
  try {
    const { id: mediaId } = req.params;
    const result = await Favourite.deleteOne({ mediaId: mediaId });

    if (result.deletedCount === 0) {
      responseHandler.badrequest(error, error.message);
      // return res.status(404).json({ error: 'No favourited movie found' });
    }
    responseHandler.ok(res, {
      message: 'This movie is deleted from favourite list',
    });
    // res
    //   .status(200)
    //   .json({ message: 'This movie is deleted from favourite list' });
  } catch (error) {
    responseHandler.badrequest(error, error.message);
    // res.status(404).json({ error: 'Cannot find favourite list of this movie' });
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
      responseHandler.ok(res, { favourited: true });
      // res.status(200).json({ favourited: true });
    } else {
      responseHandler.ok(res, { favourited: false });
      // res.status(200).json({ favourited: false });
    }
  } catch (error) {
    responseHandler.badrequest(error, error.message);
    // res.status(400).json({ error: err.message });
  }
};

const loadFavouritedList = async (req, res) => {
  try {
    // grab token from request
    const token = req.headers.authorization.split('Bearer')[1].trim();
    const decodedToken = jwt.decode(token);

    const page = parseInt(req.query.page || '0');
    // 10 lists in each page
    const PAGE_SIZE = 10;

    // const sortBy = req.query.sortBy || 'date'; // Default to sorting by reviewedDate
    const sortOrder = req.query.sortOrder || 'desc'; // Default to descending order

    const sortDirection = sortOrder === 'asc' ? 1 : -1;

    const title = req.query.title || '';

    const favourited = await Favourite.find({
      userId: decodedToken,
      title: { $regex: title, $options: 'i' },
    })
      .sort({ createdAt: sortDirection })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);

    if (favourited) {
      // get all media id of favourited lists
      const movieId = favourited.map((movie) => {
        return movie.mediaId;
      });

      // Get total count of favorited items for the user
      const totalCount = await Favourite.countDocuments({
        userId: decodedToken,
        title: { $regex: title, $options: 'i' },
      });

      // by the mediaId, using resolver, load movie infos to display poster and information
      const movieDataPromises = movieId.map(
        async (movieId) => await fetchMovieInfoById(movieId)
      );

      const movieData = await Promise.all(movieDataPromises);

      return responseHandler.ok(res, {
        favouritedList: favourited,
        movieData,
        // total numbers of pages
        totalNumberOfPage: Math.ceil(totalCount / PAGE_SIZE),
        totalCount,
      });

      // return res.status(200).json({
      //   favouritedList: favourited,
      //   movieData,
      //   // total numbers of pages
      //   totalNumberOfPage: Math.ceil(totalCount / PAGE_SIZE),
      //   totalCount,
      // });
    } else {
      responseHandler.notfound(error);
      // res.status(404).json({ error: 'Favourited list not found' });
    }
  } catch (error) {
    responseHandler.badrequest(error, error.message);
    // res.status(400).json({ error: error.message });
  }
};

export default {
  createFavourite,
  checkFavouriteStatus,
  deleteFavourite,
  loadFavouritedList,
};
