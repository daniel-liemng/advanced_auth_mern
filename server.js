const express = require('express');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// .env
require('dotenv').config({ path: './config.env' });

const app = express();

connectDB();

app.use(express.json());

// Route
app.use('/api/auth', require('./routes/auth'));

// Error Handler -> last piece of middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`),
);

// Handle CRASH error
process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
