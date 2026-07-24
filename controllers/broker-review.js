const editAddBroker = require('../models/Admin/broker.js');

exports.brokerReviewPageController = (req, res,next) => {
    res.render('broker-review', {currentPage: 'broker-review', title: 'Brokers Review' });
};

exports.readMoreBrokerReviewPageController = (req, res, next) => {
    const brokerId = req.params.j; // Extract the broker ID from the URL parameters

    editAddBroker.findByid(brokerId, fetchedBroker => {
        console.log('Broker Found by Id', brokerId, fetchedBroker);


        if (!fetchedBroker) {
            res.redirect('/error404'); // Redirect to 404 page if home not found
        } else {
            console.log('Broker Found by Id', fetchedBroker);

            res.render('broker-review', {
                editAddBroker: fetchedBroker,
                title: fetchedBroker.brokerName,
                currentPage: fetchedBroker.brokerName
            })
        }
    })
}