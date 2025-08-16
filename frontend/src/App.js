import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from './pages/Accueil';
import Catalogue from './pages/Catalogue';
import RendezVous from './pages/RendezVous';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/rendezvous" element={<RendezVous />} />
      </Routes>
    </Router>
  );
}

export default App;
