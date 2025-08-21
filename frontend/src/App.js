import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from './pages/Accueil';
import Catalogue from './pages/Catalogue';
import RendezVous from './pages/RendezVous';
import AdminPanel from './pages/AdminPanel';
import ClientDashboard from './pages/ClientDashboard';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Accueil />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/rendezvous" element={<RendezVous />} />
        
        
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/client" element={<ClientDashboard />} />
        
        
        <Route path="*" element={<Accueil />} />
      </Routes>
    </Router>
  );
}

export default App;