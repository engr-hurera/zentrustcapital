const editAddBroker = require('../models/Admin/broker.js');
// let brokers = [];

exports.brokerPageController = (req, res, next) => {
    // editAddBroker.fetchAll(brokers => {
    editAddBroker.fetchAll((brokers) => {
        res.render('brokers', {
            editAddBroker: brokers,
            currentPage: 'brokers',
            title: 'Top Brokers'
        });
        // })
        console.log('Fetched brokers:', brokers);


    });
};


exports.regulatedBrokerPageController = (req, res, next) => {

    console.log('Fetched brokers:');

    // editAddBroker.fetchAll(brokers => {
    let requiredTags = req.params.j.split('-');
    console.log(requiredTags);
    editAddBroker.findByBrokerTags(requiredTags, fetchedBroker => {
        console.log('Fetched brokers:', fetchedBroker);
        res.render('brokers', {
            editAddBroker: fetchedBroker,
            currentPage: 'regulatedBrokers',
            title: 'Regulated Brokers ' + requiredTags
        });
    })
    // })


};
