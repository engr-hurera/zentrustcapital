const Broker = require("../../models/Admin/broker.js");

// ============================================================
// ADD BROKER - GET
// ============================================================

exports.getAddBrokerController = (req, res, next) => {
  try {
    res.render("admin/addEditBroker", {
      currentPage: "addEditBroker",
      title: "Add Broker",
      editing: false,
      isLoggedIn: req.session.isLoggedIn,
    });
  } catch (error) {
    next(error);
  }
};

// ============================================================
// ADD BROKER - POST
// ============================================================

exports.postAddBrokerController = async (req, res, next) => {
  try {
    const {
      brokerDataTags,
      brokerName,
      brokerPick,
      brokerLogo,
      brokerHeading,
      DeatiledBrokerDescription,
      brokerRating,
      brokerTags,
      brokerFoundYear,
      brokerLeverage,
      brokerMinDeposit,
      brokerMinSpread,
      commissionLot,
      welcomeBonus,
    } = req.body;

    await Broker.create({
      brokerDataTags,
      brokerName,
      brokerPick,
      brokerLogo,
      brokerHeading,
      DeatiledBrokerDescription,
      brokerRating,
      brokerTags,
      brokerFoundYear,
      brokerLeverage,
      brokerMinDeposit,
      brokerMinSpread,
      commissionLot,
      welcomeBonus,
    });

    res.redirect("/brokers");
  } catch (error) {
    next(error);
  }
};

// ============================================================
// DELETE BROKER
// ============================================================

exports.postDeleteBrokerController = async (req, res, next) => {
  try {
    const brokerId = req.params.h;

    const deletedBroker = await Broker.findByIdAndDelete(brokerId);

    if (!deletedBroker) {
      return res.status(404).send("Broker not found.");
    }

    res.redirect("/brokers");
  } catch (error) {
    next(error);
  }
};

// ============================================================
// EDIT BROKER - GET
// ============================================================

exports.getEditBrokerController = async (req, res, next) => {
  try {
    const brokerId = req.params.h;

    const isEditing = req.query.editing === "true";

    if (!isEditing) {
      return res.redirect("/brokers");
    }

    const broker = await Broker.findById(brokerId);

    if (!broker) {
      return res.redirect("/error404");
    }
    console.log("Fetched broker for editing:", broker);
    res.render("admin/addEditBroker", {
      editAddBroker: broker,
      title: "Edit Broker",
      currentPage: "edit-broker",
      editing: true,
      isLoggedIn: req.session.isLoggedIn,
    });
  } catch (error) {
    next(error);
  }
};

// ============================================================
// EDIT BROKER - POST
// ============================================================

exports.postEditBrokerController = async (req, res, next) => {
  try {
    const {
      brokerId,
      brokerDataTags,
      brokerName,
      brokerPick,
      brokerLogo,
      brokerHeading,
      DeatiledBrokerDescription,
      brokerRating,
      brokerTags,
      brokerFoundYear,
      brokerLeverage,
      brokerMinDeposit,
      brokerMinSpread,
      commissionLot,
      welcomeBonus,
    } = req.body;

    const updatedBroker = await Broker.findByIdAndUpdate(
      brokerId,
      {
        brokerDataTags,
        brokerName,
        brokerPick,
        brokerLogo,
        brokerHeading,
        DeatiledBrokerDescription,
        brokerRating,
        brokerTags,
        brokerFoundYear,
        brokerLeverage,
        brokerMinDeposit,
        brokerMinSpread,
        commissionLot,
        welcomeBonus,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedBroker) {
      return res.status(404).send("Broker not found.");
    }

    res.redirect("/brokers");
  } catch (error) {
    next(error);
  }
};
