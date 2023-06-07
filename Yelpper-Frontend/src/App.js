import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom"
import Home from './components/Home.js'
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      
      <div className="container">
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Footer />} /> */}
        </Routes>
      </div>

    </>
  );
}

export default App;
