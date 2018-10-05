import {GraphQLServer} from 'graphql-yoga';

//type defintions (app schema - what ops can be performed on the api)
const typeDefs = `
    type Query {
        hello: String!
        name: String!
        location: String!
        bio: String!
    }
`

//Resolvers
const resolvers = {
    Query: {
        hello() {
            return 'This is my first query!'
        },
        name() {
            return 'Bill'
        },
        location() {
            return 'Denver'
        },
        bio() {
            return 'I love law.'
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is running.');
})