exports.ibProgramPageController = (req, res,next) => {
    res.render('ib-program', {currentPage: 'ib-program', title: 'Ib Program' });
};