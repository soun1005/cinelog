import './css/main.css';
import './css/normalize.css';
import Navbar from './layouts/Navbar';
import SearchResult from './pages/SearchResult';
import Main from './pages/Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="wrap">
          <Navbar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/search" element={<SearchResult />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};
export default App;
