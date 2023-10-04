const httpStatus = require('http-status');
const redis = require('../services/redis');
const UserServices = require('../services/userServices')

exports.getRewards = async (req, res, next) => {
    try {
        const { id: userId } = req.params
        const { at: userReqTime } = req.query
        const user = new UserServices(userReqTime) // users init, make a user request as constructor
        const rewards = await user.getRewards(userId)
        const response  = { data: rewards }

        res.status(httpStatus.OK).json(response)
    } catch (e) {
        console.error(e);
        const err = res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message });
        next(err)
    }
}

exports.redeemRewards = async (req, res, next) => {
    try {
        const { id: userId, availableAt  } = req.params
        const user = new UserServices()

        // all validation of rewards on redeemRewards method
        const userRedeem = await user.redeemRewards({ userId, availableAt })

        res.json({ data: userRedeem })
    } catch (e) {
        console.error(e);
        const err = e?.message?.split(', ')
        if (err.length > 1) {
            next(res.status(Number(err[1])).json({ error: err[0] }))
        } 
        next(e)
    }
}