import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image1 from '../assets/a.jpg'; // Chemin corrigé

const styles = {
  container: {
    color: '#ff69b4',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#ffe6f0',
    borderRadius: '8px',
    maxWidth: '800px', // Augmenté pour la galerie
    margin: '40px auto',
    textAlign: 'center',
  },
  title: {
    borderBottom: '2px solid #ff1493',
    paddingBottom: '8px',
    marginBottom: '20px',
  },
  paragraph: {
    fontStyle: 'italic',
    marginBottom: '30px',
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '30px'
  },
  button: {
    padding: '12px 28px',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#ff1493',
    border: 'none',
    borderRadius: '14px',
    cursor: 'pointer',
    boxShadow: '0 4px 14px #ff1493cc',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#cc117a',
    boxShadow: '0 6px 18px #cc117acc',
  },
  // Nouveaux styles pour les images
  gallery: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
    margin: '30px 0'
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
  }
};

const Catalogue = () => {
  const navigate = useNavigate();
  const [hover, setHover] = useState({ accueil: false, rendezvous: false });

  // Tableau d'images - utilisez vos propres imports
  const images = [
    { src: image1, alt: "Modèle 1" },
    // Ajoutez d'autres images ici
    // { src: image2, alt: "Modèle 2" },
    // { src: image3, alt: "Modèle 3" },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Notre catalogue</h2>
      <p style={styles.paragraph}>Découvrez nos créations exclusives :</p>
      
      {/* Galerie d'images */}
      <div style={styles.gallery}>
        {images.map((img, index) => (
          <img 
            key={index}
            src={img.src}
            alt={img.alt}
            style={styles.image}
          />
        ))}
      </div>

      <div style={styles.buttonsWrapper}>
        <button
          style={{
            ...styles.button,
            ...(hover.accueil ? styles.buttonHover : {}),
          }}
          onMouseEnter={() => setHover(h => ({ ...h, accueil: true }))}
          onMouseLeave={() => setHover(h => ({ ...h, accueil: false }))}
          onClick={() => navigate('/')}
        >
          Accueil
        </button>

        <button
          style={{
            ...styles.button,
            ...(hover.rendezvous ? styles.buttonHover : {}),
          }}
          onMouseEnter={() => setHover(h => ({ ...h, rendezvous: true }))}
          onMouseLeave={() => setHover(h => ({ ...h, rendezvous: false }))}
          onClick={() => navigate('/rendezvous')}
        >
          Prise de rendez-vous
        </button>
      </div>
    </div>
  );
};

export default Catalogue;