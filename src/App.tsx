import Navbar from './components/Navbar'
import Home from './pages/Home'
import './App.css'

function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <Home />
      <footer className="footer">
        <p>© 2026 JG Premium Experience. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}

export default App
