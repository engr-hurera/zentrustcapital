const editAddBroker = require('../../models/Admin/broker.js');
exports.getAddBrokerController = (req, res, next) => {
    console.log('Rendering Add/Edit Broker page', req.body);
    res.render('admin/addEditBroker', {
        currentPage: 'addEditBroker',
        title: 'Add Broker',
        editing: false
    });
};

exports.postAddBrokerController = (req, res, next) => {
    console.log('Rendering PostAdd Broker page', req.body);
    let broker = [];
    res.render('admin/addEditBroker', {
        currentPage: 'addEditBroker',
        title: 'Add Broker',
        editing: false
    });
    broker = new editAddBroker(
        req.body.brokerDataTags,
        req.body.brokerName,
        req.body.brokerPick,
        req.body.brokerLogo,
        req.body.brokerHeading,
        req.body.DeatiledBrokerDescription,
        req.body.brokerRating,
        req.body.brokerTags,
        req.body.brokerFoundYear,
        req.body.brokerLeverage,
        req.body.brokerMinDeposit,
        req.body.brokerMinSpread,
        req.body.commissionLot,
        req.body.welcomeBonus,

    );
    broker.save();
};


exports.postDeleteBrokerController = (req, res, next) => {
    // 1. Extract the broker ID from the URL parameters
    const deleteBrokerId = req.params.h;

    // 2. Call the delete method from your Model
    editAddBroker.deleteById(deleteBrokerId, () => {
        // 3. Redirect back to the main list page after successful deletion
        res.redirect('/brokers');
    });
};


exports.getEditBrokerController = (req, res, next) => {
    const editBrokerId = req.params.h; // Extract the broker ID from the URL parameters
    const isEditing = req.query.editing === 'true'; // Check if the query parameter indicates editing mode

    if (!isEditing) {
        console.log("Not in editing mode, redirecting to /brokers");
        return res.redirect('/brokers'); // Redirect if not in editing mode
    } else {
        editAddBroker.findByid(editBrokerId, fetchedBroker => {
            if (!fetchedBroker) {
                return res.redirect('/error404'); // Redirect to 404 page if broker not found
                console.log('Editing Broker:', fetchedBroker);

            } else {
                res.render('admin/addEditBroker', {
                    editAddBroker: fetchedBroker,
                    title: 'Edit Broker',
                    currentPage: 'edit-broker',
                    editing: true
                });
            }

            console.log('Editing Broker:', fetchedBroker);
        });
    }
}

exports.postEditBrokerController = (req, res, next) => {
    console.log('Rendering PostEdit Broker page', req.body);
   
    broker = new editAddBroker(
        req.body.brokerDataTags,
        req.body.brokerName,
        req.body.brokerPick,
        req.body.brokerLogo,
        req.body.brokerHeading,
        req.body.DeatiledBrokerDescription,
        req.body.brokerRating,
        req.body.brokerTags,
        req.body.brokerFoundYear,
        req.body.brokerLeverage,
        req.body.brokerMinDeposit,
        req.body.brokerMinSpread,
        req.body.commissionLot,
        req.body.welcomeBonus,
        
        
    );
    broker.id = req.body.brokerId;
    console.log(req.body.brokerId)
    broker.save();

     res.redirect('/brokers');
};