const request = require("supertest")
const app = require("../src/app.js")

let rewards = null
let rewardId = '2023-10-04T17:00:00.000Z' // global variable for several query

describe("GET /api/users/:id/rewards", () => {
    it("should return all user rewards", async () => {
        return request(app)
            .get(`/api/users/1/rewards?at=${rewardId}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body.data.length).toBe(7);
                rewards = res.body.data
            })
    });
});

describe("PATCH /api/users/:id/rewards/:availableAt/redeem", () => {
    it("user should able to redeem reward", async () => {
        return request(app)
            .patch(`/api/users/1/rewards/${rewardId}/redeem`)
            .send({})
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body.data.redeemedAt).not.toBe(null) // we expect that redeemedAt now has a value
            })
    });
});

describe("PATCH /api/users/:id/rewards/:availableAt/redeem", () => {
    it("user should not able to redeem reward", async () => {
        return request(app)
            .patch(`/api/users/1/rewards/${rewardId}/redeem`)
            .send({})
            .expect('Content-Type', /json/)
            .expect(400)
            .then((res) => {
                expect(res.statusCode).toBe(400);
                expect(res.body).toHaveProperty('error')
                expect(res.body.error).toBe('This reward is already redeemed')
            })
    });
});

describe("PATCH /api/users/:id/rewards/:availableAt/redeem", () => {
    it("user should not able to redeem, reward has expired", async () => {
        rewardId = '2023-10-02T17:00:00.000Z' // its depend on todays date
        return request(app)
            .patch(`/api/users/1/rewards/${rewardId}/redeem`)
            .send({})
            .expect('Content-Type', /json/)
            .expect(400)
            .then((res) => {
                expect(res.statusCode).toBe(400);
                expect(res.body).toHaveProperty('error')
                expect(res.body.error).toBe('This reward is already expired')
            })
    });
});