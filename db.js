const faker = require("faker")

module.exports = () => ({
    users: Array.from({ length: 50 }).map(() => ({
        id: faker.random.uuid(),
        ...faker.helpers.userCard()
    }))
})
