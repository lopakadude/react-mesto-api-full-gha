const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new AuthorizationError('Авторизация не пройдена1. Неверный почта или пароль'));
  }
  if (!authorization.startsWith('Bearer ')) {
    next(new AuthorizationError('Авторизация не пройдена2. Неверный почта или пароль'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, process.env.NODE_ENV !== 'production' ? 'super-strong-secret' : process.env.JWT_SECRET);
  } catch (err) {
    next(new AuthorizationError('Авторизация не пройдена3. Неверный почта или пароль'));
  }
  req.user = payload;
  return next();
};
