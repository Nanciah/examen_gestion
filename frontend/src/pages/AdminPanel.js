import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Fonction de login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (email === 'nanciah05@gmail.com' && password === 'admin2005') {
        setIsAuthenticated(true);
        localStorage.setItem('adminToken', 'loggedIn');
        fetchRequests();
      } else {
        alert('Identifiants incorrects');
      }
    } catch (error) {
      console.error('Erreur de connexion :', error);
      alert('Erreur lors de la connexion.');
    }
  };

  // Récupérer les rendez-vous
  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/admin/rendezvous');
      setRequests(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des rendez-vous :', error);
      alert('Erreur lors du chargement des rendez-vous.');
    } finally {
      setIsLoading(false);
    }
  };

  // Gérer la décision
  const handleDecision = async (status) => {
    setIsLoading(true);
    try {
      const url = `http://localhost:5000/api/admin/rendezvous/${selectedRequest.id}`;
      const payload = { status, comment };
      console.log('Envoi de la requête PUT :', { url, payload });
      const response = await axios.put(url, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Rendez-vous mis à jour avec succès :', response.data);
      fetchRequests();
      setSelectedRequest(null);
      setComment('');
      alert('Réponse envoyée avec succès !');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du rendez-vous :', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      if (error.response?.status === 404) {
        alert('Erreur : Le rendez-vous ou la route n\'existe pas.');
      } else if (error.response?.status === 400) {
        alert('Erreur : Statut invalide ou manquant.');
      } else {
        alert('Erreur serveur lors de la mise à jour du rendez-vous.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Déconnexion
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  // Vérifier l'authentification au chargement
  useEffect(() => {
    if (localStorage.getItem('adminToken')) {
      setIsAuthenticated(true);
      fetchRequests();
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div style={styles.loginContainer}>
        <h2 style={styles.loginTitle}>Connexion Administrateur</h2>
        <form onSubmit={handleLogin} style={styles.loginForm}>
          <input
            type="email"
            placeholder="Email admin"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.loginButton} disabled={isLoading}>
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Espace Administrateur</h1>
        <button style={styles.logoutButton} onClick={handleLogout}>
          Déconnexion
        </button>
      </div>

      {isLoading && <div style={styles.loader}>Chargement...</div>}

      <div style={styles.requestList}>
        {requests.length === 0 ? (
          <p style={styles.noRequests}>Aucun rendez-vous à afficher</p>
        ) : (
          requests.map((request) => (
            <div
              key={request.id}
              style={styles.requestCard}
              onClick={() => setSelectedRequest(request)}
            >
              <h3 style={styles.cardTitle}>
                {request.nom} {request.prenom}
              </h3>
              <p>
                <strong>Date :</strong>{' '}
                {new Date(request.date).toLocaleDateString()} à {request.heure}
              </p>
              <p>
                <strong>Service :</strong> {request.prestation}
              </p>
              <p>
                <strong>Contact :</strong> {request.email || 'N/A'} |{' '}
                {request.contacts || 'N/A'}
              </p>
              <p>
                <strong>Statut :</strong>{' '}
                <span style={getStatusStyle(request.status)}>
                  {request.status === 'approved'
                    ? 'Accepté'
                    : request.status === 'rejected'
                    ? 'Refusé'
                    : 'En attente'}
                </span>
              </p>
              {request.comment && (
                <p>
                  <strong>Commentaire :</strong> {request.comment}
                </p>
              )}
            </div>
          ))
        )}
      </div>

      {selectedRequest && (
        <div style={styles.decisionModal}>
          <h3 style={styles.modalTitle}>
            Gérer la demande #{selectedRequest.id}
          </h3>
          <p>
            <strong>Client :</strong> {selectedRequest.nom}{' '}
            {selectedRequest.prenom}
          </p>
          <p>
            <strong>Service :</strong> {selectedRequest.prestation}
          </p>
          <p>
            <strong>Date :</strong>{' '}
            {new Date(selectedRequest.date).toLocaleDateString()} à{' '}
            {selectedRequest.heure}
          </p>

          <textarea
            style={styles.textarea}
            placeholder="Commentaire (optionnel)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <div style={styles.buttonGroup}>
            <button
              style={styles.approveButton}
              onClick={() => handleDecision('approved')}
              disabled={isLoading}
            >
              {isLoading ? 'En cours...' : 'Accepter'}
            </button>
            <button
              style={styles.rejectButton}
              onClick={() => handleDecision('rejected')}
              disabled={isLoading}
            >
              {isLoading ? 'En cours...' : 'Refuser'}
            </button>
            <button
              style={styles.cancelButton}
              onClick={() => {
                setSelectedRequest(null);
                setComment('');
              }}
              disabled={isLoading}
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const styles = {
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #B0E0E6 0%, #FFE4E1 100%)',
    fontFamily: "'Poppins', sans-serif",
    padding: '20px',
  },
  loginTitle: {
    color: '#1E90FF',
    fontSize: '2rem',
    fontWeight: '600',
    marginBottom: '20px',
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '320px',
    backgroundColor: '#FFFFFF',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #FFE4E1',
    fontSize: '1rem',
    backgroundColor: '#F5F5F5',
    transition: 'border-color 0.3s ease',
    ':focus': {
      borderColor: '#FF69B4',
      outline: 'none',
    },
  },
  loginButton: {
    padding: '12px',
    backgroundColor: '#FF69B4',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    ':hover': {
      backgroundColor: '#1E90FF',
      transform: 'scale(1.05)',
    },
    ':disabled': {
      backgroundColor: '#B0E0E6',
      cursor: 'not-allowed',
    },
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: '#F5F5F5',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  title: {
    color: '#1E90FF',
    fontSize: '2.5rem',
    fontWeight: '700',
  },
  logoutButton: {
    padding: '10px 20px',
    backgroundColor: '#FF69B4',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    ':hover': {
      backgroundColor: '#1E90FF',
      transform: 'scale(1.05)',
    },
  },
  loader: {
    textAlign: 'center',
    color: '#1E90FF',
    fontSize: '1.2rem',
    margin: '20px 0',
    fontWeight: '600',
  },
  requestList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '20px',
  },
  requestCard: {
    border: '1px solid #B0E0E6',
    borderRadius: '12px',
    padding: '20px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 6px 20px rgba(30, 144, 255, 0.2)',
    },
  },
  cardTitle: {
    color: '#333333',
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '10px',
  },
  noRequests: {
    color: '#333333',
    fontSize: '1.2rem',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#FFE4E1',
    borderRadius: '8px',
  },
  decisionModal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFFFFF',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.15)',
    zIndex: 1000,
    width: '420px',
    maxWidth: '90%',
    border: '1px solid #B0E0E6',
  },
  modalTitle: {
    color: '#1E90FF',
    fontSize: '1.8rem',
    fontWeight: '600',
    marginBottom: '15px',
  },
  textarea: {
    width: '100%',
    minHeight: '120px',
    margin: '15px 0',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #FFE4E1',
    fontSize: '1rem',
    backgroundColor: '#F5F5F5',
    transition: 'border-color 0.3s ease',
    ':focus': {
      borderColor: '#FF69B4',
      outline: 'none',
    },
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    
  },
  approveButton: {
    padding: '12px',
    backgroundColor: '#1E90FF',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    flex: 1,
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    ':hover': {
      backgroundColor: '#FF69B4',
      transform: 'scale(1.05)',
    },
    ':disabled': {
      backgroundColor: '#B0E0E6',
      cursor: 'not-allowed',
    },
  },
  rejectButton: {
    padding: '12px',
    backgroundColor: '#FF69B4',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    flex: 1,
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    ':hover': {
      backgroundColor: '#1E90FF',
      transform: 'scale(1.05)',
    },
    ':disabled': {
      backgroundColor: '#B0E0E6',
      cursor: 'not-allowed',
    },
  },
  cancelButton: {
    padding: '12px',
    backgroundColor: '#B0E0E6',
    color: '#333333',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    flex: 1,
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    ':hover': {
      backgroundColor: '#FFE4E1',
      transform: 'scale(1.05)',
    },
    ':disabled': {
      backgroundColor: '#F5F5F5',
      cursor: 'not-allowed',
    },
  },
};

const getStatusStyle = (status) => {
  switch (status) {
    case 'approved':
      return {
        color: '#1E90FF',
        fontWeight: '600',
        marginLeft: '10px',
      };
    case 'rejected':
      return {
        color: '#FF69B4',
        fontWeight: '600',
        marginLeft: '10px',
      };
    default:
      return {
        color: '#333333',
        fontWeight: '600',
        marginLeft: '10px',
      };
  }
};

export default AdminPanel;