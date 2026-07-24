exports.cookiesPageController = (req, res,next) => {
    res.render('cookies', {currentPage: 'cookies', title: 'Cookies' });
};