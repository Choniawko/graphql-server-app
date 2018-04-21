const graphql = require("graphql")

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql

const users = [
    { id: "1", firstName: "firstName #1", age: 20 },
    { id: "2", firstName: "firstName #2", age: 23 }
]

const UserType = new GraphQLObjectType({
    name: "User",
    fields: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt }
    }
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve: (parentValue, args) =>
                users.find(({ id }) => id === args.id)
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})
