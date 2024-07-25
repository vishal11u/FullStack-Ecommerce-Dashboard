const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Create an HTTP server and pass it to Socket.IO
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// Import Routes
const authRoutes = require('./routes/auth');
const dataRoutes = require('./routes/data');
const cardRoutes = require('./routes/card');
const dashboardRoutes = require('./routes/dashboard');
const notification = require('./routes/notification');
const notes = require('./routes/notes');

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('sendMessage', (message) => {
        console.log('Message received: ', message);
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Connect to MongoDB using environment variable
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/card', cardRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/notification', notification);
app.use('/api/notes', notes);

app.get('/', (req, res) => {
    res.send('Server is running');
});

// Listen on the server instance
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));