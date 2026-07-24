exports.educationPageController = (req, res,next) => {
    res.render('education', {currentPage: 'education', title: 'Education' });
};