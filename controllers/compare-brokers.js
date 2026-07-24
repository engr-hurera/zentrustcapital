const editAddBroker = require('../models/Admin/broker.js');
exports.compareBrokersPageController = (req, res, next) => {

    editAddBroker.fetchAll((brokers) => {
        res.render('compare-brokers', {
            editAddBroker: brokers,
            currentPage: 'compare-brokers',
            title: 'Compare Brokers'
        });
        // })
        console.log('Fetched brokers:', brokers);


    });
};
exports.dataTagsCompareBrokersPageController = (req, res, next) => {
    console.log('this is dataTag',req.params.h);
    let title = req.params.h.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    // editAddBroker.fetchAll(brokers => {
    editAddBroker.findByBrokerDataTags([req.params.h], fetchedBroker => {
        console.log('Fetched brokers:', fetchedBroker);
        res.render('compare-brokers', {
            editAddBroker: fetchedBroker,
            currentPage: req.params.h,
            title: 'Brokers with '+ title
        });
    })
    // })


};

exports.leverageCompareBrokersPageController = (req, res, next) => {
    let urlLeverage = parseInt(req.params.a.split(':')[1], 10);
        console.log('this is leverage',typeof urlLeverage, urlLeverage);
    
    // editAddBroker.fetchAll(brokers => {
    editAddBroker.findByMaxLeverage(urlLeverage, fetchedBroker => {
        console.log('Fetched brokers:', fetchedBroker);
        res.render('compare-brokers', {
            editAddBroker: fetchedBroker,
            currentPage: req.params.a,
            title: 'Brokers Max Leverage upto '+ urlLeverage
        });
    })
    // })


};
exports.depositCompareBrokersPageController = (req, res, next) => {
    // wrote by me below code logic
    let urlDeposit = parseInt(req.params.a.slice(1));  // this one too
    
        console.log('this is min deposit',typeof urlDeposit, urlDeposit,req.params.a); // this one too
    
    // editAddBroker.fetchAll(brokers => {
    editAddBroker.findByMinDeposit(urlDeposit, fetchedBroker => {
        console.log('Fetched brokers:', fetchedBroker);
        res.render('compare-brokers', {
            editAddBroker: fetchedBroker,
            currentPage: req.params.a,
            title: urlDeposit + ' Min Deposit Brokers'
        });
    })
    // })


};

