import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Contact } from './pages/Contact';
import { ServiceDetail } from './pages/ServiceDetail';
import { CaseStudy } from './pages/CaseStudy';
import { CustomCursor } from './components/CustomCursor';
import { MusicPlayer } from './components/MusicPlayer';

function App() {
  return (
    <Router>
      <CustomCursor />
      <MusicPlayer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service/:slug" element={<ServiceDetail />} />
        <Route path="/case-study/:slug" element={<CaseStudy />} />
      </Routes>
    </Router>
  );
}

export default App;