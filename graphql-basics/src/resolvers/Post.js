const Post  =  {
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
}

export {Post as default}