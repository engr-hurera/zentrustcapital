exports.articlesPageController = (req, res,next) => {
    res.render('articles', {currentPage: 'articles', title: 'Insights', isLoggedIn: req.isLoggedIn });
};