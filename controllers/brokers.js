const Broker = require("../models/Admin/broker.js");

// ============================================================
// ALL BROKERS
// ============================================================

exports.brokerPageController = async (req, res, next) => {
  try {
    const brokers = await Broker.find().sort({ createdAt: -1 });

    res.render("brokers", {
      editAddBroker: brokers,
      currentPage: "brokers",
      title: "Top Brokers",
      isLoggedIn: req.isLoggedIn,
    });
  } catch (error) {
    next(error);
  }
};

// ============================================================
// REGULATED / TAGGED BROKERS
// ============================================================

exports.regulatedBrokerPageController = async (req, res, next) => {
  try {
    const requiredTags = req.params.j
      .split("-")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const brokers = await Broker.find({
      brokerTags: {
        $in: requiredTags,
      },
    }).sort({ createdAt: -1 });

    res.render("brokers", {
      editAddBroker: brokers,
      currentPage: "regulatedBrokers",
      title: "Regulated Brokers " + requiredTags.join(", "),
      isLoggedIn: req.isLoggedIn,
    });
  } catch (error) {
    next(error);
  }
};
