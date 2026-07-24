const editAddBroker = require('../models/Admin/broker.js');
exports.homePageController = (req, res,next) => {
     editAddBroker.fetchAll((brokers) => {
        res.render('index', {
            editAddBroker: brokers,
            currentPage: 'home',
            title: 'ZEN TRUST CAPITAL'
        });
        // })
        console.log('Fetched brokers:', brokers);


    });
};