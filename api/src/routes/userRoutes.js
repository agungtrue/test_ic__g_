const express = require('express');
const router = express.Router();

// mounting controllers
const userController = require('../controllers/userController')

// user
router
    .route('/users/:id/rewards')
    .get(userController.getRewards);

router.patch('/users/:id/rewards/:availableAt/redeem', userController.redeemRewards)

module.exports = router;