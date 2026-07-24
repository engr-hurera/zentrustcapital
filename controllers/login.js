exports.loginPageController = (req, res,next) => {
    res.render('login', {currentPage: 'login', title: 'Login' });
};