import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // pour navigation
import axios from 'axios';

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#6e2c41', // background rose foncé
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 20px',
    flexDirection: 'column',
  },
  form: {
    maxWidth: '420px',
    width: '100%',
    padding: '30px 35px',
    backgroundColor: '#fde9f1', // fond rose très clair
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(139, 58, 91, 0.3)', // ombre rose foncé légère
    fontFamily: "'Inter', sans-serif",
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
    color: '#5e2a40', // texte rose foncé
  },
  input: {
    padding: '14px 16px',
    fontSize: '1rem',
    borderRadius: '12px',
    border: '2px solid #d8a3b1', // rose doux
    outline: 'none',
    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
    color: '#5e2a40',
    backgroundColor: '#fff0f5', // fond rose très pâle
  },
  inputFocus: {
    borderColor: '#b13656', // rose foncé vif au focus
    boxShadow: '0 0 8px #b13656aa',
  },
  button: {
    padding: '16px',
    fontSize: '1.15rem',
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#b13656', // bouton rose foncé
    border: 'none',
    borderRadius: '14px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    boxShadow: '0 4px 14px #b13656cc',
  },
  buttonHover: {
    backgroundColor: '#8b3a5b', // rose plus foncé au hover
    boxShadow: '0 6px 20px #8b3a5bcc',
  },
  navButtonsWrapper: {
    marginTop: '30px',
    display: 'flex',
    gap: '20px',
  },
  navButton: {
    padding: '12px 28px',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#b13656',
    backgroundColor: '#fde9f1',
    border: '2px solid #b13656',
    borderRadius: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(177, 54, 86, 0.4)',
  },
  navButtonHover: {
    backgroundColor: '#b13656',
    color: '#fff',
    boxShadow: '0 6px 18px rgba(139, 58, 91, 0.7)',
  },
};

const RendezVous = () => {
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    date: '',
    heure: '',
    prestation: '',
  });

  const [focusIndex, setFocusIndex] = useState(null);
  const [hoverButton, setHoverButton] = useState(false);
  const [hoverNav, setHoverNav] = useState({ accueil: false, catalogue: false });

  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/rendezvous', form);
      alert('Rendez-vous pris avec succès !');
    } catch (error) {
      alert('Erreur lors de la prise de rendez-vous.');
    }
  };

  const inputs = [
    { name: 'nom', placeholder: 'Nom', type: 'text' },
    { name: 'prenom', placeholder: 'Prénom', type: 'text' },
    { name: 'date', placeholder: '', type: 'date' },
    { name: 'heure', placeholder: '', type: 'time' },
    { name: 'prestation', placeholder: 'Prestation', type: 'text' },
  ];

  return (
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.form}>
        {inputs.map((input, idx) => (
          <input
            key={input.name}
            name={input.name}
            type={input.type}
            placeholder={input.placeholder}
            onChange={handleChange}
            value={form[input.name]}
            onFocus={() => setFocusIndex(idx)}
            onBlur={() => setFocusIndex(null)}
            style={{
              ...styles.input,
              ...(focusIndex === idx ? styles.inputFocus : {}),
            }}
            required
          />
        ))}
        <button
          type="submit"
          style={{
            ...styles.button,
            ...(hoverButton ? styles.buttonHover : {}),
          }}
          onMouseEnter={() => setHoverButton(true)}
          onMouseLeave={() => setHoverButton(false)}
        >
          Prendre rendez-vous
        </button>
      </form>

      <div style={styles.navButtonsWrapper}>
        <button
          style={{
            ...styles.navButton,
            ...(hoverNav.accueil ? styles.navButtonHover : {}),
          }}
          onMouseEnter={() => setHoverNav((h) => ({ ...h, accueil: true }))}
          onMouseLeave={() => setHoverNav((h) => ({ ...h, accueil: false }))}
          onClick={() => navigate('/')}
        >
          Accueil
        </button>

        <button
          style={{
            ...styles.navButton,
            ...(hoverNav.catalogue ? styles.navButtonHover : {}),
          }}
          onMouseEnter={() => setHoverNav((h) => ({ ...h, catalogue: true }))}
          onMouseLeave={() => setHoverNav((h) => ({ ...h, catalogue: false }))}
          onClick={() => navigate('/catalogue')}
        >
          Catalogue
        </button>
      </div>
    </div>
  );
};

export default RendezVous;
