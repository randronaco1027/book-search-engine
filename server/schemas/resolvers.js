const { User, Book } = require('../models')
const { AuthenticationError } = require('apollo-server-express')
const { signToken } = require('../utils/auth')
const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({})
                    .select('-__v -password')
                    .populate('savedBooks')
                return userData
            }
            throw new AuthenticationError('Not logged in')
        },
        books: async (parent, { username }) => {
            const params = username ? { username } : {}
            return Book.find(params).sort({ createdAt: -1 })
        },
        book: async (parent, { bookId }) => {
            return Book.findOne({ bookId });
        },
        // get all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('savedBooks')
        },
        // get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('savedBooks')
        },
    }
}