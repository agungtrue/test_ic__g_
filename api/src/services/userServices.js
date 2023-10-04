const redis = require('./redis')
const httpStatus = require('http-status');
const RewardServices = require('./rewardServices')

class UserServices {
    constructor (userReqTime) {
        this.userTime = userReqTime
    }

    async getRewards (userId) {
        try {
            // checking on redis, that has been in requested before
            const hasInRedis = await redis.get(`userId:${userId}`)
            if (hasInRedis) return JSON.parse(hasInRedis)

            // rewards for new user
            const rewardSrv = new RewardServices(this.userTime) // rewards init
            rewardSrv.setExpiresDays(1) // set expires days
            const rewards = rewardSrv.generateRewardsInWeek() // generate rewards in week

            // once generated, store reward into redis
            await redis.set(`userId:${userId}`, JSON.stringify(rewards));
            return rewards
        } catch (error) {
            console.error(error)
        }
    }

    async redeemRewards ({ userId, availableAt }) {
        const rewardId = availableAt
        const findUserRewards = await redis.get(`userId:${userId}`)

        // guard for availibity rewards
        if (!findUserRewards) throw new Error(`No user reward found, ${httpStatus.BAD_REQUEST}`)

        // get on redis and find the reward id
        const rewards = JSON.parse(findUserRewards)

        // check user has been redeem reward
        if (this.hasUserRedeemed(rewards, rewardId)) throw new Error(`This reward is already redeemed, ${httpStatus.BAD_REQUEST}`)

        // check expiration of rewards
        const rewardIndex = rewards.findIndex((reward) => reward.availableAt === rewardId)
        if (this.isExpiredReward(rewards[rewardIndex], rewardId)) throw new Error(`This reward is already expired, ${httpStatus.BAD_REQUEST}`)

        // do redeem reward
        rewards[rewardIndex].redeemedAt = new Date()
        
        // save reward
        await redis.set(`userId:${userId}`, JSON.stringify(rewards));

        return rewards[rewardIndex]
    }

    hasUserRedeemed (rewards, rewardId) {
        return rewards.find(reward => reward.availableAt === rewardId && reward.redeemedAt)
    }

    isExpiredReward (userReward) {
        const expiresAt  = new Date(userReward.expiresAt).valueOf()
        const now = new Date().valueOf()

        // if now greater than expiresAt, then it was expired
        return expiresAt <= now
    }
}


module.exports = UserServices
