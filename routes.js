// TODO, can this file be deleted?

import express from 'express';

const router = express.Router();

// Sample data
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

// Route to fetch all users
router.get('/', (req, res) => {
  res.json(users);
});

export default router;