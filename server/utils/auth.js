const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function (req, res, next) {
    // allows token to be sent via  req.query or headers
    console.log(req.query)

    let token = req.query?.token || "";
    console.log(token)

    // ["Bearer", "<tokenvalue>"]
    if (req.headers?.authorization) {
      console.log("auth")
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      console.log("hello")
      return req;
      // return res.status(400).json({ message: 'You have no token!' });
    }

    // verify token and get user data out of it
    try {
      console.log("try")
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      console.log(data)
      req.user = data;
    } catch {
      console.log('Invalid token');
      return res.status(400).json({ message: 'invalid token!' });
    }

    // send to next endpoint
    console.log("next")
    next();
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
