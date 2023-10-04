class RewardServices {
    constructor(userDate) {
        this.currentDate = userDate ? new Date(userDate) : new Date()
        this.expiresDays = 1 // default are 1 days


        // local functions
        this.setMidnightTime = function(date) {
            const _date = date

            // set into midnight
            _date.setHours(0, 0, 0, 0);
            return _date
        }
    }

    generateRewardsInWeek() {
        const today = new Date(this.currentDate)
        const rows = []
        const weeks = 7
        const addDays = this.expiresDays

        // start calculating...
        for (let dayNumber = 0; dayNumber < weeks; dayNumber++) {
            // first we get 'Date' and 'Day' data from js Date,
            // then we calculate using dayNumber to get a actuall date from current week
            const _availableAt = new Date(
                today.setDate((today.getDate() - today.getDay()) + dayNumber),
            );
            const _expiresAt = new Date(
                today.setDate((today.getDate() - today.getDay()) + (dayNumber + addDays)),
            );

            // push into payload array
            rows.push({
                availableAt: this.setMidnightTime(_availableAt),
                redeemedAt: null,
                expiresAt: this.setMidnightTime(_expiresAt)
            })
        }

        return rows
    }

    setExpiresDays(days) {
        this.expiresDays = days
    }

}

module.exports = RewardServices;