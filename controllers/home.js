const editAddBroker = require('../models/Admin/broker.js');
exports.homePageController = (req, res,next) => {
    console.log('session value', req.session)
     editAddBroker.fetchAll((brokers) => {
        res.render('index', {
            editAddBroker: brokers,
            currentPage: 'home',
            title: 'ZEN TRUST CAPITAL',
            isLoggedIn: req.isLoggedIn
        });
        // })
        console.log('Fetched brokers:', brokers);


    });
};