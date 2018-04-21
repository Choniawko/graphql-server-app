const express = require("express")
const expressGraphQL = require("express-graphql")
const app = express()
const PORT = 4000
const schema = require("./schema")

app.use(
    "/graphql",
    expressGraphQL({
        schema,
        graphiql: true
    })
)

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})
