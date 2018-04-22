const graphql = require("graphql")
const axios = require("axios")

const baseUrl = endpoint => `http://localhost:3000/${endpoint}`

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList
} = graphql

const CompanyType = new GraphQLObjectType({
    name: "Company",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType),
            resolve: (parentValue, args) =>
                axios
                    .get(baseUrl(`companies/${parentValue.id}/users`))
                    .then(res => res.data)
        }
    })
})

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        company: {
            type: CompanyType,
            resolve: (parentValue, args) =>
                axios
                    .get(baseUrl(`companies/${parentValue.companyId}`))
                    .then(res => res.data)
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve: (parentValue, args) =>
                axios.get(baseUrl(`users/${args.id}`)).then(res => res.data)
        },
        company: {
            type: CompanyType,
            args: { id: { type: GraphQLString } },
            resolve: (parentValue, args) =>
                axios.get(baseUrl(`companies/${args.id}`)).then(res => res.data)
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})
