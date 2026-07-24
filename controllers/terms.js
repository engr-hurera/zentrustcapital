exports.termsPageController = (req, res,next) => {
    res.render('terms', {currentPage: 'terms', title: 'Terms and Conditions' });
};