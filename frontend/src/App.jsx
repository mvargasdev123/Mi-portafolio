import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
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
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Animación del color de fondo con el scroll
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["var(--bg-primary)", "#0f1627", "#161026"]
  );

  return (
    <Router>
      <motion.div className="app-container" style={{ backgroundColor, minHeight: '100vh', transition: 'background-color 0.3s ease' }}>
        {/* Barra de progreso de lectura superior */}
        <motion.div
          className="progress-bar"
          style={{ 
            scaleX,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'var(--accent-primary)',
            transformOrigin: '0%',
            zIndex: 9999,
            boxShadow: '0 0 10px var(--accent-primary)'
          }}
        />

        {/* Aquí integraremos el Navbar más adelante */}
        
        <Routes>
          <Route path="/" element={
            <main>
              <Hero />
              <RevealOnScroll direction="up">
                <About />
              </RevealOnScroll>
              <RevealOnScroll direction="up" delay={0.2}>
                <Projects />
              </RevealOnScroll>
              <RevealOnScroll direction="up" delay={0.2}>
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
      </motion.div>
    </Router>
  );
}

export default App;
