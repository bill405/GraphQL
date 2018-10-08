import uuidv4 from 'uuid/v4'

const Mutation = {
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
    updateUser(parent, args, {db}, info) {
        const user = db.users.find(user => user.id === args.id)

        if (!user) {
            throw new Error('User not found!')
        }

        if (typeof args.data.email === 'string') {
            const emailTaken = db.users.some(user => user.email === data.email)
        
            if(emailTaken) {
                throw new Error('Email taken already')
            }

            user.eamil = data.email
        }

        if (typeof args.data.name === 'string') {
            user.name = args.data.name
        }

        if (typeof args.data.age!== 'undefined') {
            user.age = args.data.age
        }

        return user
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
    deleteComment(parent, args, {db}, info) {
        let deletedCommentIndex = db.comments.findIndex(comment => comment.id === args.id)
        if (deletedCommentIndex === -1) {
            throw new Error('No comment exists!')
        }

        const commentToDelete = db.comments.splice(deletedCommentIndex, 1)
        console.log(commentToDelete)
        return commentToDelete[0]
    }
}

export {Mutation as default}