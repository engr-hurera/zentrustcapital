exports.openAccountPageController = (req, res,next) => {
    res.render('auth/open-account', {currentPage: 'openAccount', title: 'Open Account' , isLoggedIn: req.isLoggedIn});
};