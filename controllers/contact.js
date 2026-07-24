exports.contactPageController = (req, res,next) => {
    res.render('contact', {currentPage: 'contact', title: 'Contact Us' });
};