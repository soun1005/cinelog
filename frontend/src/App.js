import './css/main.css';
// import './css/normalize.css';
import Navbar from './layouts/Navbar';
import SearchResult from './pages/SearchResult';
import Main from './pages/Main';
import MovieInfoPage from './pages/MovieInfoPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MovieReviewPage from './pages/MovieReviewPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import ReviewDetail from './pages/ReviewDetail';
import ReviewedMovieList from './pages/ReviewedMovieList';
import EditReviewPage from './pages/EditReviewPage';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="wrap">
          <Navbar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/search" element={<SearchResult />} />
            <Route path="/movie/:id" element={<MovieInfoPage />} />
            <Route path="/review/:id_title" element={<MovieReviewPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/review/:id" element={<ReviewDetail />} />
            <Route path="/profile/reviews" element={<ReviewedMovieList />} />
            <Route
              path="/profile/review/edit/:id"
              element={<EditReviewPage />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};
export default App;
