const faker = require("faker")
const getRandom = (min, max) =>
    `${Math.floor(Math.random() * (max - min) + min)}`

module.exports = () => ({
    users: Array.from({ length: 50 }).map((_, i) => ({
        id: `${i + 1}`,
        name: faker.helpers.userCard().name,
        username: faker.helpers.userCard().username,
        email: faker.helpers.userCard().email,
        companyId: getRandom(51, 61)
    })),
    companies: Array.from({ length: 10 }).map((_, i) => ({
        id: `${i + 51}`,
        name: faker.company.companyName(),
        description: faker.company.catchPhraseDescriptor()
    }))
})
