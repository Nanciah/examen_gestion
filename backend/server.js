const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();

// Middleware CORS et JSON
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
}));
app.use(express.json());

// Configuration MySQL
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rendezvous_db',
};

// ✅ Route test
app.get('/', (req, res) => {
  res.send('Serveur en ligne ✔️');
});

// ✅ Route POST pour le formulaire
app.post('/api/rendezvous', async (req, res) => {
  const { nom, prenom, date, heure, prestation } = req.body;

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute(
      'INSERT INTO rendezvous (nom, prenom, date, heure, prestation) VALUES (?, ?, ?, ?, ?)',
      [nom, prenom, date, heure, prestation]
    );
    await connection.end();
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    console.error('❌ Erreur SQL :', error);
    res.status(500).json({ error: 'Erreur lors de la prise de rendez-vous.' });
  }
});

// ✅ Lancement du serveur
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur backend lancé sur http://localhost:${PORT}`);
});
