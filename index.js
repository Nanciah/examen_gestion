const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rendezvous_db',
};

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
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Serveur lancé sur http://localhost:${PORT}`));
