const users = [{
        id: '23',
        name: 'Bill',
        email: 'bill@example.com',
        age: 40,
        posts: ['100', '102'],
        comments: ['200', '202']
    },
    {
        id: '25',
        name: 'Sarah',
        email: 'sarah@example.com',
        age: 20,
        posts: ['101'],
        comments: []
    },
    {
        id: '24',
        name: 'Mike',
        email: 'mike@example.com',
        posts: ['103'],
        comments: ['201', '203']
    }
];

const posts = [{
        id: '100',
        title: 'My excellent post',
        body: 'My excellent body',
        published: true,
        author: '23',
        comments: ['200']
    },
    {
        id: '101',
        title: 'Good greek body',
        body: 'Greek recipe body',
        published: true,
        author: '25',
        comments: []
    },
    {
        id: '102',
        title: 'Money making ideas',
        body: 'body make body',
        published: false,
        author: '23',
        comments: ['201', '202']
    },
    {
        id: '103',
        title: 'Through the river',
        body: 'Body of the river post',
        published: true,
        author: '24',
        comments: ['203']
    }
]


const comments = [{
        id: '200',
        text: 'My excellent comment',
        author: '23',
        postAssoc: '101'
    },
    {
        id: '201',
        text: 'my comment about eggs',
        author: '23',
        postAssoc: '102'
    },
    {
        id: '202',
        text: 'Money comment',
        author: '24',
        postAssoc: '102'
    },
    {
        id: '203',
        text: 'The best google ever',
        author: '24',
        postAssoc: '103'
    }
]

const db =  {
    users,
    posts,
    comments
}

export {db as default}