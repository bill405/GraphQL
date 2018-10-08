const Comment = {
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

export {Comment as default}