exports.isAuthenticated = (req, res, next) => {
  if (req.session && req.session.isLoggedIn) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  res.redirect("/login");
};

exports.isGuest = (req, res, next) => {
  if (req.session && req.session.isLoggedIn) {
    return res.redirect("/");
  }
  next();
};

exports.isRole = (...roles) => {
  return (req, res, next) => {
    if (!req.session?.isLoggedIn) {
      return res.redirect("/login");
    }
    const userRole = req.session.user?.role;
    if (roles.flat().includes(userRole)) {
      return next();
    }
    res.status(403).send("Forbidden – insufficient permissions");
  };
};
