const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({ headers }) {
    // allows token to be sent via req.query or headers
    let token = headers.authorization || '';

    if (token) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return null;
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      return data;
    } catch {
      console.log('Invalid token');
      return null;
    }
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};