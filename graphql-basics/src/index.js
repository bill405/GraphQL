import {GraphQLServer} from 'graphql-yoga';

//seed data
const users = [{
        id: 23,
        name: 'Bill',
        email: 'bill@example.com',
        age: 40
    },
    {
        id: 25,
        name: 'Sarah',
        email: 'sarah@example.com',
        age: 20
    },
    {
        id: 3,
        name: 'Mike',
        email: 'mike@example.com',
    }
];

const posts = [{
        id: 100,
        title: 'My excellent post',
        body: 'My excellent body',
        published: false
    },
    {
        id: 101,
        title: 'Good greek body',
        body: 'Greek recipe body',
        published: true
    },
    {
        id: 102,
        title: 'Money making ideas',
        body: 'body make body',
        published: false
    },
    {
        id: 103,
        title: 'Through the river',
        body: 'Body of the river post',
        published: true
    }
]

//arrays of custom tpyes

const typeDefs = `
    type Query {
        posts(query: String): [Post!]!
        users(query: String): [User!]!
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
        users(parent, args, ctx, info) {
            if(!args.query) {
                return users
            }
            return users.filter(user => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        posts(parent, args, ctx, info) {
            if(!args.query) {
                return posts
            }

            return posts.filter(post => {
                
                if (post.body.toLowerCase().includes(args.query.toLowerCase())) {
                    return true
                } else if (post.title.toLowerCase().includes(args.query.toLowerCase())) {
                    return true
                }
            })
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