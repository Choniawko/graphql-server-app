const graphql = require("graphql")
const axios = require("axios")

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql

const UserType = new GraphQLObjectType({
    name: "User",
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString }
    }
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve: (parentValue, args) =>
                axios
                    .get(`http://localhost:3000/users/${args.id}`)
                    .then(res => res.data)
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})
