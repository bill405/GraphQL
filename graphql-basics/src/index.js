import {GraphQLServer} from 'graphql-yoga';
import uuidv4 from 'uuid/v4';

import {users, posts, comments} from './../seed/seed-data';

const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
        me: User!
        post: Post!
    }

    type Mutation {
        createUser(name: String!, email: String!, age: Int): User!
        createPost(title: String!, body: String!, author: ID!, published: Boolean!): Post!
        createComment(text: String!, author: ID!, postAssoc: String!): Comment!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments:[Comment!]
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }
   
    type Comment {
        id: ID!
        text: String!
        author: User!
        postAssoc: Post!
    }
`

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
        comments(parent, args, ctx, info) {
            return comments
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
    },
    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some(user => user.email === args.email)
            
            if (emailTaken) {
                throw new Error('Email was taken!')
            }

            const user = {
                id: uuidv4(),
                name: args.name,
                email: args.email,
                age: args.age
            }

            users.push(user)
            return user
        },
        createPost(parent, args, ctx, info) {
            const userExists = users.find(user => args.author === user.id)
            if(!userExists) {
                throw new Error('No user was found!')
            }

            const post = {
                id: uuidv4(),
                author: args.author,
                title: args.title,
                body: args.body,
                published: args.published
            }

            posts.push(post)
            return post
        },
        createComment(parent, args, ctx, info) {
            const authorValid = users.some(user => user.id === args.author) 
            const postValid =  posts.find(post => post.id === args.postAssoc && post.published === true)

            if(!authorValid || !postValid) {
                throw new Error('Invalid post, author , or not published!')
            }

            const comment = {
                id: uuidv4(),
                author: args.author,
                postAssoc: args.postAssoc,
                text: args.text
            }

            comments.push(comment)
            return comment
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find(user => {
                return user.id === parent.author
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter(comment => {
                return parent.id === comment.postAssoc
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter(post => {
                return post.author === parent.id
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter(comment => {
                return parent.id === comment.author
            })
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find(user => {
                return parent.author === user.id
            })
        },
        postAssoc(parent, args, ctx, info) {
            return posts.find(post => {
                return parent.postAssoc === post.id
            })
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