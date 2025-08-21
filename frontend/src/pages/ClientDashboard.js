import React, { useState } from 'react';
import axios from 'axios';

const ClientDashboard = () => {
  const [nom, setNom] = useState('');
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRequests = async () => {
    if (!nom) return;
    
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/client/rendezvous/${nom}`);
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
      alert('Erreur lors de la récupération des rendez-vous');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Mon Espace Beauté</h1>
        <div style={styles.flowerDecoration}>🌸</div>
      </div>
      
      <div style={styles.searchContainer}>
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Votre nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            style={styles.input}
          />
          <button 
            onClick={fetchRequests}
            style={styles.searchButton}
            disabled={isLoading}
          >
            {isLoading ? 'Recherche en cours...' : 'Voir mes rendez-vous'}
          </button>
        </div>
      </div>

      {requests.length > 0 ? (
        <div style={styles.requestList}>
          {requests.map(request => (
            <div key={request.id} style={styles.requestCard}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>Rendez-vous #{request.id}</h3>
                <span style={getStatusStyle(request.status)}>
                  {request.status === 'approved' ? '✓ Accepté' : 
                   request.status === 'rejected' ? '✗ Refusé' : '⏱ En attente'}
                </span>
              </div>
              <p style={styles.cardText}><span style={styles.label}>Nom :</span> {request.nom} {request.prenom}</p>
              <p style={styles.cardText}><span style={styles.label}>Date :</span> {new Date(request.date).toLocaleDateString('fr-FR')} à {request.heure}</p>
              <p style={styles.cardText}><span style={styles.label}>Service :</span> {request.prestation}</p>
              {request.AdminPanel && (
                <div style={styles.commentBox}>
                  <p style={styles.commentText}>💬 {request.AdminPanel}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.noResults}>
          <p style={styles.noResultsText}>
            {nom ? 'Aucun rendez-vous trouvé pour ce nom' : 'Entrez votre nom pour voir vos rendez-vous'}
          </p>
          <div style={styles.decoration}>💅</div>
        </div>
      )}
    </div>
  );
};

// Design pastel rose et bleu
const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: '#fff9fb',
    minHeight: '100vh',
  },
  header: {
    position: 'relative',
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    color: '#ff7eb9',
    fontSize: '2.5rem',
    fontWeight: '600',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
    marginBottom: '10px',
  },
  flowerDecoration: {
    position: 'absolute',
    right: '20px',
    top: '0',
    fontSize: '2rem',
    opacity: '0.7',
  },
  searchContainer: {
    backgroundColor: '#e6f2ff',
    padding: '25px',
    borderRadius: '15px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
    marginBottom: '30px',
  },
  searchBox: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
  },
  input: {
    padding: '15px',
    borderRadius: '10px',
    border: '2px solid #d8bfd8',
    flex: 1,
    fontSize: '1rem',
    backgroundColor: 'white',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
    '::placeholder': {
      color: '#c8a2c8',
    },
    ':focus': {
      outline: 'none',
      borderColor: '#ff7eb9',
    }
  },
  searchButton: {
    padding: '15px 25px',
    backgroundColor: '#ff7eb9',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    boxShadow: '0 2px 10px rgba(255, 126, 185, 0.3)',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#ff6ba1',
      transform: 'translateY(-2px)',
    },
    ':disabled': {
      backgroundColor: '#d3d3d3',
      cursor: 'not-allowed',
      transform: 'none',
    }
  },
  requestList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '25px',
  },
  requestCard: {
    backgroundColor: 'white',
    border: '1px solid #f8d7fa',
    borderRadius: '15px',
    padding: '25px',
    boxShadow: '0 5px 15px rgba(255, 126, 185, 0.1)',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 20px rgba(255, 126, 185, 0.15)',
    }
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    borderBottom: '1px dashed #f0d6f7',
    paddingBottom: '10px',
  },
  cardTitle: {
    color: '#8a2be2',
    margin: '0',
    fontSize: '1.3rem',
  },
  cardText: {
    color: '#555',
    margin: '8px 0',
    lineHeight: '1.5',
  },
  label: {
    color: '#ff7eb9',
    fontWeight: '500',
    marginRight: '5px',
  },
  commentBox: {
    backgroundColor: '#f0f8ff',
    padding: '12px',
    borderRadius: '8px',
    marginTop: '15px',
    borderLeft: '4px solid #add8e6',
  },
  commentText: {
    margin: '0',
    color: '#5a5a5a',
    fontStyle: 'italic',
  },
  noResults: {
    textAlign: 'center',
    padding: '40px',
    backgroundColor: 'rgba(255, 228, 240, 0.5)',
    borderRadius: '15px',
  },
  noResultsText: {
    color: '#c8a2c8',
    fontSize: '1.2rem',
    marginBottom: '20px',
  },
  decoration: {
    fontSize: '2rem',
    opacity: '0.6',
    marginTop: '15px',
  }
};

const getStatusStyle = (status) => {
  const baseStyle = {
    fontWeight: '600',
    padding: '5px 10px',
    borderRadius: '15px',
    fontSize: '0.9rem',
  };

  switch(status) {
    case 'approved':
      return { 
        ...baseStyle,
        color: '#2e8b57',
        backgroundColor: '#e6f7ed',
      };
    case 'rejected':
      return { 
        ...baseStyle,
        color: '#d23c3c',
        backgroundColor: '#fde8e8',
      };
    default:
      return { 
        ...baseStyle,
        color: '#d4a017',
        backgroundColor: '#fff4d4',
      };
  }
};

export default ClientDashboard;