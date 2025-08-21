import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  page: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #ff7eb9 0%, #ff65a3 50%, #ff2d95 100%)',
  },
  container: {
    maxWidth: '600px',
    padding: '40px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(255, 45, 149, 0.5)',
    fontFamily: "'Poppins', sans-serif",
    textAlign: 'center',
    color: '#d81e69',
    animation: 'pulse 3s ease-in-out infinite',
  },
  title: {
    fontSize: '3rem',
    fontWeight: '900',
    marginBottom: '20px',
    letterSpacing: '2px',
  },
  paragraph: {
    fontSize: '1.3rem',
    lineHeight: '1.5',
    marginBottom: '30px',
  },
  button: {
    padding: '14px 28px',
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#fff',
    backgroundColor: '#d81e69',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    margin: '0 15px',
    boxShadow: '0 6px 15px rgba(216, 30, 105, 0.6)',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#b01552',
  },
  adminButton: {
    padding: '14px 28px',
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#fff',
    backgroundColor: '#6a0dad',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    margin: '0 15px',
    boxShadow: '0 6px 15px rgba(106, 13, 173, 0.6)',
    transition: 'background-color 0.3s ease',
  },
  adminButtonHover: {
    backgroundColor: '#4b0082',
  },
  clientButton: {
    padding: '14px 28px',
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#fff',
    backgroundColor: '#1e90ff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    margin: '0 15px',
    boxShadow: '0 6px 15px rgba(30, 144, 255, 0.6)',
    transition: 'background-color 0.3s ease',
  },
  clientButtonHover: {
    backgroundColor: '#0066cc',
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  secondaryButtonsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',
    paddingTop: '30px',
    borderTop: '1px dashed rgba(216, 30, 105, 0.3)',
  }
};

const Accueil = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState({ 
    catalogue: false, 
    rendezvous: false,
    admin: false,
    client: false
  });

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
      <div style={styles.page}>
        <div style={styles.container}>
          <h1 style={styles.title}>Bienvenue à l'atelier de couture</h1>
          <p style={styles.paragraph}>Nous créons des vêtements sur mesure avec élégance.</p>

          <div style={styles.buttonsWrapper}>
            <button
              style={{
                ...styles.button,
                ...(hovered.catalogue ? styles.buttonHover : {})
              }}
              onMouseEnter={() => setHovered(h => ({ ...h, catalogue: true }))}
              onMouseLeave={() => setHovered(h => ({ ...h, catalogue: false }))}
              onClick={() => navigate('/catalogue')}
            >
              Voir le Catalogue
            </button>

            <button
              style={{
                ...styles.button,
                ...(hovered.rendezvous ? styles.buttonHover : {})
              }}
              onMouseEnter={() => setHovered(h => ({ ...h, rendezvous: true }))}
              onMouseLeave={() => setHovered(h => ({ ...h, rendezvous: false }))}
              onClick={() => navigate('/rendezvous')}
            >
              Prendre Rendez-vous
            </button>
          </div>

          {/* Nouvelle section pour les espaces Admin/Client */}
          <div style={styles.secondaryButtonsWrapper}>
            <button
              style={{
                ...styles.adminButton,
                ...(hovered.admin ? styles.adminButtonHover : {})
              }}
              onMouseEnter={() => setHovered(h => ({ ...h, admin: true }))}
              onMouseLeave={() => setHovered(h => ({ ...h, admin: false }))}
              onClick={() => navigate('/admin')}
            >
              Espace Admin
            </button>

            <button
              style={{
                ...styles.clientButton,
                ...(hovered.client ? styles.clientButtonHover : {})
              }}
              onMouseEnter={() => setHovered(h => ({ ...h, client: true }))}
              onMouseLeave={() => setHovered(h => ({ ...h, client: false }))}
              onClick={() => navigate('/client')}
            >
              Espace Client
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accueil;