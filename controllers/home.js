const Broker = require("../models/Admin/broker.js");

// ============================================================
// ALL BROKERS
// ============================================================

exports.homePageController = async (req, res, next) => {
  try {
    const brokers = await Broker.find().sort({ createdAt: -1 });

    console.log("brokers", brokers);
    res.render("index", {
      editAddBroker: brokers,
      currentPage: "home",
      title: "ZEN TRUST CAPITAL",
      isLoggedIn: req.isLoggedIn,
    });
  } catch (error) {
    next(error);
  }
};
