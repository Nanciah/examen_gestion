import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image1 from '../assets/robe.png'; // Chemin corrigé
import image2 from '../assets/robe2.png';
import image3 from '../assets/a.jpeg';
import image4 from '../assets/b.jpeg';
import image5 from '../assets/c.jpeg';
import image6 from '../assets/d.jpeg';
import image7 from '../assets/e.jpeg';
import image8 from '../assets/f.jpeg';
import image9 from '../assets/g.jpeg';
import image10 from '../assets/h.jpeg';
import image11 from '../assets/i.jpeg';
import image12 from '../assets/j.jpeg';
import image13 from '../assets/k.jpeg';
import image14 from '../assets/l.jpeg';
import image15 from '../assets/m.jpeg';
import image16 from '../assets/n.jpeg';


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
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', // Ajusté pour plus de flexibilité
    gap: '20px',
    margin: '30px 0'
  },
  image: {
    width: '100%',
    height: 'auto',
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
   { src: image2, alt: "Modèle 2" },
   { src: image3, alt: "Modèle 3" },
     { src: image4, alt: "Modèle 4" },
     { src: image5, alt: "Modèle 5" },
     { src: image6, alt: "Modèle 6" },
     { src: image7, alt: "Modèle 7" },
     { src: image8, alt: "Modèle 8" },
     { src: image9, alt: "Modèle 9" },
     { src: image10, alt: "Modèle 10" },
     { src: image11, alt: "Modèle 11" },
     { src: image12, alt: "Modèle 12" },
     { src: image13, alt: "Modèle 13" },
     { src: image14, alt: "Modèle 14" },
     { src: image15, alt: "Modèle 15" },
     { src: image16, alt: "Modèle 16" },
  ];
     


  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Notre catalogue</h1>
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