import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import RevealOnScroll from './components/RevealOnScroll';
import Login from './sections/Login';
import Dashboard from './sections/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Aquí integraremos el Navbar más adelante */}
        
        <Routes>
          <Route path="/" element={
            <main>
              <Hero />
              <RevealOnScroll>
                <About />
              </RevealOnScroll>
              <RevealOnScroll>
                <Projects />
              </RevealOnScroll>
              <RevealOnScroll>
                <Contact />
              </RevealOnScroll>
            </main>
          } />
          
          <Route path="/project/:slug" element={<h1 style={{color:'white', textAlign:'center', marginTop:'5rem'}}>Detalle del Proyecto (Próximamente)</h1>} />
          
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
