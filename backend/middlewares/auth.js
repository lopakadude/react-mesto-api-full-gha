const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthorizationError('Авторизация не пройдена. Неверный почта или пароль'));
  }
  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, process.env.NODE_ENV !== 'production' ? 'super-strong-secret' : process.env.JWT_SECRET);
  } catch (err) {
    next(new AuthorizationError(payload));
  }
  req.user = payload;
  return next();
};
