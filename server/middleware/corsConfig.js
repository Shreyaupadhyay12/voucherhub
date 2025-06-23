const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000', // React frontend port
  methods: ['GET', 'POST'],
  credentials: true
};

module.exports = cors(corsOptions);
