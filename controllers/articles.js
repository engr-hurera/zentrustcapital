exports.articlesPageController = (req, res,next) => {
    res.render('articles', {currentPage: 'articles', title: 'Insights' });
};