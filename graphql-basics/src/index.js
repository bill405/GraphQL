import {GraphQLServer} from 'graphql-yoga';

//type defintions (app schema - what ops can be performed on the api)
const typeDefs = `
    type Query {
       title: String!
       price: Float!
       releaseYear: Int
       rating: Float
       inStock: Boolean
    }
`

//Resolvers
const resolvers = {
    Query: {
       title () {
           return 'Polo'
       },
       price () {
        return 45.2
       },
       releaseYear () {
        return 2018
       },
       rating () {
        return null
       },
       inStock () {
        return true
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