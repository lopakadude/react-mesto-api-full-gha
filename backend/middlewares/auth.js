const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthorizationError('Авторизация не пройдена. Неверные почта или пароль'));
  }
  const token = authorization;
  let payload;

  try {
    payload = jwt.verify(token, process.env.NODE_ENV !== 'production' ? 'super-strong-secret' : process.env.JWT_SECRET);
  } catch (err) {
    next(new AuthorizationError(token));
  }
  req.user = payload;
  return next();
};
