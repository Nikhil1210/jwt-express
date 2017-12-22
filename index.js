const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        data: 'Welcome to the express jwt API'
    });
});

app.post('/api/post', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        }
        res.json({
            data: 'post successfull!!',
            authData
        });
    });
});

app.post('/api/login', (req, res) => {
    // Mock the user
    const user = {
        id: 123,
        name: 'abc',
        email: 'abc@gmail.com'
    };
    jwt.sign({ user }, 'secretkey', { expiresIn: '30s' }, (err, token) => {
        res.json({ token });
    });
});

function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        const token = bearerHeader.split(' ')[1];
        req.token = token;
        next();
    } else {
        res.sendStatus(403);
    }
}
app.listen(2024, () => console.log('server started on port: 2024'));