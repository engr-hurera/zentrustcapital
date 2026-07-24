exports.openAccountPageController = (req, res,next) => {
    res.render('open-account', {currentPage: 'openAccount', title: 'Open Account' });
};