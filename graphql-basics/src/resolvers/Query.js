const Query = {
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
}


export {Query as default}