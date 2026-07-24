exports.aboutPageController = (req, res,next) => {
    res.render('about', {currentPage: 'about', title: 'About Us' });
};