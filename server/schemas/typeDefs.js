const {gql} = require('apollo-server-express')

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    books: [savedBooks]
}

type Book {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
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
    saveBook()
    deleteBook
}
`

module.exports = typeDefs