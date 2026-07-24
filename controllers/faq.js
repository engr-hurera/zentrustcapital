exports.faqPageController = (req, res,next) => {
    res.render('faq', {currentPage: 'faq', title: 'Faq' });
};