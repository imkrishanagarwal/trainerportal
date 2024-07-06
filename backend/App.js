const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { createLogger, transports, format } = require('winston');

const app = express();

// MySQL Connection (use environment variables or a configuration file)
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Krish@n100%',
  database: 'trainersdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Configure a simple logger
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [new transports.Console()],
});

app.use(cors());
app.use(express.json());

// Global error-handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled Error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});


// Middleware to log API requests and database connections
app.use((req, res, next) => {
  // Log API request
  logger.info(`API Request: ${req.method} ${req.url}`);

  // Log database connection
  db.getConnection((connectionError, connection) => {
    if (connectionError) {
      logger.error('Database Connection Error:', connectionError);
    } else {
      logger.info('Database Connection Established');

      // Release the connection back to the pool when done
      connection.release();
    }

    // Continue with the next middleware or route
    next();
  });
});

//handle update

app.put('/trainers/:id', (req, res) => {
  const trainerId = req.params.id;
  const updatedTrainerData = req.body;
  console.log("i am update");
console.log(updatedTrainerData);
  const fieldsToUpdate = {
    commercialsPerHour: updatedTrainerData.commercialsPerHour,
    commercialsPerDay: updatedTrainerData.commercialsPerDay,
    location: updatedTrainerData.location,
    linkToPDF: updatedTrainerData.linkToPdf,
    skills: updatedTrainerData.skills,
    ratings: updatedTrainerData.ratings,
    email: updatedTrainerData.email,
    alternateEmail: updatedTrainerData.alternateEmail,
    phoneNumber: updatedTrainerData.phoneNumber,
    alternateNumber: updatedTrainerData.alternateNumber,
    experience: updatedTrainerData.experience,
    notes: updatedTrainerData.notes,
    // Add other fields you want to update, excluding the 10th one
  };

  // Log the request
  logger.info(`Update Trainer Request: ID - ${trainerId}, Data - ${JSON.stringify(fieldsToUpdate)}`);

  // Now, update the trainer data in the 'trainers' table
db.query('UPDATE trainers SET ? WHERE id = ?', [fieldsToUpdate, trainerId], (updateError, updateResult) => {
  if (updateError) {
    logger.error('Error updating trainer:', updateError);
    res.status(500).json({ message: 'Failed to update trainer', error: updateError.message });
  } else {
    // Trainer updated successfully
    logger.info('Trainer updated:', updateResult);
    res.status(200).json({ message: 'Trainer updated successfully' });
  }
});
});


// Handle login requests
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Log the login attempt
  logger.info(`Login Attempt: User - ${username}, Password - ${password}`);

  // Query the MySQL database to check if the user exists and the credentials are correct
  db.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (err, results) => {
      if (err) {
        logger.error('Database Error:', err);
        res.status(500).json({ message: 'Database error' });
      } else if (results.length === 1) {
        // User exists and credentials are correct
        const user = results[0];
        const token = jwt.sign({ userId: user.id }, 'ka1810', {
          expiresIn: '1h', // Adjust the token expiration as needed
        });
        logger.info(`Login Successful: User - ${username}`);
        res.json({ token });
      } else {
        logger.info(`Login Failed: User - ${username}, Invalid credentials`);
        res.status(401).json({ message: 'Invalid credentials' });
      }
    }
  );
});

// Create trainers
app.post('/createtrainer', (req, res) => {
  const trainerData = req.body;

  // Log the request
  logger.info(`Create Trainer Request: Data - ${JSON.stringify(trainerData)}`);

  // Now, insert the trainer data into the 'trainers' table
  db.query('INSERT INTO trainers SET ?', trainerData, (trainerInsertError, trainerInsertResult) => {
    if (trainerInsertError) {
      logger.error('Error creating trainer:', trainerInsertError);
      res.status(500).json({ message: 'Failed to create trainer', error: trainerInsertError });
    } else {
      // Trainer created successfully
      logger.info('Trainer created:', trainerInsertResult);
      res.status(200).json({ message: 'Trainer created successfully' });
    }
  });
});

// Create a route to fetch trainers from the database
app.get('/trainers', (req, res) => {
  const query = 'SELECT * FROM trainers'; // Replace with the actual table name if different

  // Log the request
  logger.info('Get Trainers Request');

  db.query(query, (err, results) => {
    if (err) {
      logger.error('Database Error:', err);
      res.status(500).json({ message: 'Error fetching data from the database' });
    } else {
      // Log the response
      logger.info('Trainers fetched successfully');
      res.json(results);
    }
  });
});

// Protect a route with middleware
app.get('/protected', (req, res) => {
  // Log the request
  logger.info('Protected Route Request');
  res.json({ message: 'This is a protected route' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

