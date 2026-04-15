import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Portafolio from './pages/Portafolio';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portafolio" element={<Portafolio />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
