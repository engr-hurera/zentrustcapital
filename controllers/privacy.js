exports.privacyPageController = (req, res,next) => {
    res.render('privacy', {currentPage: 'privacy', title: 'Privacy Policy Zen Capital' });
};