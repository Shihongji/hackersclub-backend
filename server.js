import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json([
    {
      title: 'First message from server',
      user: 'Admin',
      content: 'Server of Hackers Club website is running successfully!',
    },
    {
      title: 'Second message from server',
      user: 'Admin',
      content: 'You can play around!',
    },
  ]);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
