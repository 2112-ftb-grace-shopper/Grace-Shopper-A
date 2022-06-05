function requireUser(req, res, next) {
  if (!req.user) {
    next(console.error());
  }

  next();
}

module.exports = {
  requireUser
}