import {GraphQLServer} from 'graphql-yoga';

//type defintions (app schema - what ops can be performed on the api)
const typeDefs = `
    type Query {
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type  Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`


//Resolvers
const resolvers = {
    Query: {
       me() {
           return {
               id: '123yyy',
               name: 'Mike',
               email: 'mike@mike.com',
           }
       },
       post() {
           return {
               id: '1231dfg',
               title: 'Most Excellent Blog Post',
               body: 'Body of my excellent blog post',
               published: true
           }
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