const users = [{
        id: '23',
        name: 'Bill',
        email: 'bill@example.com',
        age: 40,
        posts: ['100', '101']
    },
    {
        id: '25',
        name: 'Sarah',
        email: 'sarah@example.com',
        age: 20,
        posts: ['102']
    },
    {
        id: '3',
        name: 'Mike',
        email: 'mike@example.com',
        posts: ['103']
    }
];

const posts = [{
        id: '100',
        title: 'My excellent post',
        body: 'My excellent body',
        published: false,
        author: '23'
    },
    {
        id: '101',
        title: 'Good greek body',
        body: 'Greek recipe body',
        published: true,
        author: '23'
    },
    {
        id: '102',
        title: 'Money making ideas',
        body: 'body make body',
        published: false,
        author: '23'
    },
    {
        id: '103',
        title: 'Through the river',
        body: 'Body of the river post',
        published: true,
        author: '25'
    }
]

export {
    users,
    posts
}