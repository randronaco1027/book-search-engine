const {gql} = require('apollo-server-express')

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    books: [Book]
}

type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

input savedBook {
    description: String
    title: String
    bookId: String
    image: String
    link: String
    authors: [String]
}

type Query {
    me: User
    users: [User]
    user(username: String!): User
    savedBooks(username: String): [Book]
    book(bookId: ID!): Book
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: savedBook): User
    removeBook(bookId: String!): User
}

type Auth {
    token: ID!
    user: User
}
`

module.exports = typeDefs