import {GraphQLServer} from 'graphql-yoga';

//scalar type arrays

const typeDefs = `
    type Query {
        add(numbers: [Float!]!): Float!
        greeting(name: String, position: String): String!
        grades: [Int]!
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
        add(parent, args, ctx, info) {
            if (args.numbers.length === 0) {
                return 0
            }

            return args.numbers.reduce((accumulator, currentValue) => accumulator + currentValue)
        },
        greeting(parent, args, ctx, info) {
            if (args.name) {
                return `hello, ${args.name}! You are my favorite ${args.position}.`
            } 
            return 'Hello!'
        },
        grades(parent, args, ctx, info) {
            return [99, 10, 50, 80, 93]
        },
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