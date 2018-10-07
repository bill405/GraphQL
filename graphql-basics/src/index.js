import {GraphQLServer} from 'graphql-yoga'
import uuidv4 from 'uuid/v4'

import db from './db'

const resolvers = {
    Query: {
        users(parent, args, { db }, info) {
            if(!args.query) {
                return db.users
            }
            return db.users.filter(user => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        posts(parent, args, { db }, info) {
            if(!args.query) {
                return db.posts
            }

            return db.posts.filter(post => {
                
                if (post.body.toLowerCase().includes(args.query.toLowerCase())) {
                    return true
                } else if (post.title.toLowerCase().includes(args.query.toLowerCase())) {
                    return true
                }
            })
        },
        comments(parent, args, { db }, info) {
            return db.comments
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
        createUser(parent, args, { db }, info) {
            const emailTaken = db.users.some(user => user.email === args.data.email)
            
            if (emailTaken) {
                throw new Error('Email was taken!')
            }

            const user = {
                id: uuidv4(),
                ...args.data
            }

            db.users.push(user)
            return user
        },
        deleteUser(parent, args, { db }, info) {
            const userIndex = db.users.findIndex(user => user.id === args.id)
            
            if(userIndex === -1) {
                throw new Error('No user!')
            }

            const arr = [];
            for (let postId of db.users[userIndex].posts) {
                 const postIndex = db.posts.findIndex(postToDelete => postToDelete.id === postId)        
                 for (let commentId of db.posts[postIndex].comments) {
                     const commentIndex = db.comments.findIndex(commentToDelete => commentToDelete.id === commentId)
                     db.comments.splice(commentIndex, 1)
                 }
                 db.posts.splice(postIndex, 1)
            }
            const deletedUser = db.users.splice(userIndex, 1)

            return deletedUser[0];
        },
        createPost(parent, args, {db}, info) {
            const userExists = db.users.find(user => args.data.author === user.id)
            if(!userExists) {
                throw new Error('No user was found!')
            }
            const post = {
                id: uuidv4(),
                ...args.data
            }

            db.posts.push(post)
            return post
        },
        deletePost(parent, args, {db}, info) {
            const postIndex = db.posts.findIndex(post => post.id === args.id)
            if(postIndex === -1) {
                throw new Error('Post not found!')
            }
            
            db.comments = db.comments.filter(comment => comment.postAssoc !== args.id)
            const deletedPost = db.posts.splice(postIndex, 1)
            return deletedPost[0]
        },

        createComment(parent, args, {db}, info) {
            const authorValid = db.users.some(user => user.id === args.data.author) 
            const postValid =  db.posts.find(post => post.id === args.data.postAssoc && post.published)

            if(!authorValid || !postValid) {
                throw new Error('Invalid post, author , or not published!')
            }

            const comment = {
                id: uuidv4(),
                ...args.data
            }

            db.comments.push(comment)
            return comment
        },
        deleteComment(parent, args, ctx, info) {
            let deletedCommentIndex = db.comments.findIndex(comment => comment.id === args.id)
            if (deletedCommentIndex === -1) {
                throw new Error('No comment exists!')
            }

            const commentToDelete = db.comments.splice(deletedCommentIndex, 1)
            console.log(commentToDelete)
            return commentToDelete[0]
        }
    },
    Post: {
        author(parent, args, {db}, info) {
            return db.users.find(user => {
                return user.id === parent.author
            })
        },
        comments(parent, args, ctx, info) {
            return db.comments.filter(comment => {
                return parent.id === comment.postAssoc
            })
        }
    },
    User: {
        posts(parent, args, {db}, info) {
            return db.posts.filter(post => {
                return post.author === parent.id
            })
        },
        comments(parent, args, {db}, info) {
            return db.comments.filter(comment => {
                return parent.id === comment.author
            })
        }
    },
    Comment: {
        author(parent, args, {db}, info) {
            return db.users.find(user => {
                return parent.author === user.id
            })
        },
        postAssoc(parent, args, {db}, info) {
            return db.posts.find(post => {
                return parent.postAssoc === post.id
            })
        }
    }
}

const server = new GraphQLServer({
    typeDefs: './graphql-basics/src/schema.graphql',
    resolvers,
    context: {
        db
    }
})

server.start(() => {
    console.log('The server is running.');
})