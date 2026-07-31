exports.pageNotFoundController = (req, res,next) => {
    res.status(404).render('error404', {currentPage: 'pagenotfound', title: 'Page Not Found' , isLoggedIn: req.isLoggedIn});
};