const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
require('dotenv/config');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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
