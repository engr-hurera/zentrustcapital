exports.marketsPageController = (req, res,next) => {
    res.render('markets', {currentPage: 'markets', title: 'Markets' });
};