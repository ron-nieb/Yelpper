import './App.css';
import { Route, Routes } from "react-router-dom"
import Home from './components/Home.js'
import Navbar from './components/Navbar';
import Reviews  from './components/Reviews'

function App() {
  return (
    <>
      
      <div className="container-fluid">
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          
          
        </Routes>
      </div>

    </>
  );
}

export default App;
