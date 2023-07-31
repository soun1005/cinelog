import './css/main.css';
import './css/normalize.css';
import Navbar from './layouts/Navbar';
import { BrowserRouter, Routes } from 'react-router-dom';
const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="wrap">
          <Navbar />
          <Routes></Routes>
        </div>
      </BrowserRouter>
    </>
  );
};
export default App;
