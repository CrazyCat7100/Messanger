const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Connect to MongoDB (replace 'mongodb://localhost:27017/messenger' with your MongoDB connection string)
mongoose.connect('mongodb://localhost:27017/messenger', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// User model
const User = require('./models/User');

// Passport local strategy for username and password
passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
        if (err) throw err;
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        user.comparePassword(password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect password.' });
            }
        });
    });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// Routes

// Registration
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    newUser.save((err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Registration failed');
        }
        res.status(200).send('Registration successful');
    });
});

// Login
app.post('/login',
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }),
    (req, res) => {
        res.status(200).send('Login successful');
    }
);

// Socket.IO logic
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

    socket.on('chatMessage', (data) => {
        io.emit('chatMessage', data);
    });
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
