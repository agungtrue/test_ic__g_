const express = require('express');
const router = express.Router();

// mounting controllers
const userController = require('../controllers/userController')

// user
// http://localhost:5001/api/users/5/rewards?at=2023-10-04T17:00:00.000Z
router
    .route('/users/:id/rewards')
    .get(userController.getRewards);

// http://localhost:5001/api/users/1/rewards/2023-10-04T17:00:00.000Z/redeem
router.patch('/users/:id/rewards/:availableAt/redeem', userController.redeemRewards)

module.exports = router;