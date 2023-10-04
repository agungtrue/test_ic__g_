const express = require('express');
const app = express();
const router = express.Router();
// const validateJWT = require('../middleware/validateJwt');
const httpStatus = require('http-status');

// Import routes
const userRoutes = require('./userRoutes');

router.get('/', (req, res) => {
    return res.status(200).json({ status: 'OK', message: 'welcome to API server'})
});

// mounting all routes
router.use('/api', userRoutes);

// any request handler
app.all('*', (req, res, next) => {
    return res.status(404).json({ status: httpStatus.NOT_FOUND, message: 'cannot find any resources' });
})

module.exports = router;