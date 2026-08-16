const Broker = require("../models/Admin/broker.js");

/**
 * Render the main Compare Brokers page
 * URL example:
 * /compare-brokers
 */
exports.compareBrokersPageController = async (req, res, next) => {
  try {
    const brokers = await Broker.find({}).lean();

    res.render("compare-brokers", {
      editAddBroker: brokers,
      currentPage: "compare-brokers",
      title: "Compare Brokers",
      isLoggedIn: req.isLoggedIn,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Compare brokers by data tag
 *
 * URL example:
 * /compare-brokers/mt4
 */
exports.dataTagsCompareBrokersPageController = async (req, res, next) => {
  try {
    const { h } = req.params;

    if (!h) {
      return res.redirect("/compare-brokers");
    }

    const title = h
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const brokers = await Broker.find({
      brokerDataTags: h,
    }).lean();

    res.render("compare-brokers", {
      editAddBroker: brokers,
      currentPage: h,
      title: `Brokers with ${title}`,
      isLoggedIn: req.isLoggedIn,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Compare brokers by maximum leverage
 *
 * URL example:
 * /compare-brokers/leverage/1:500
 */
exports.leverageCompareBrokersPageController = async (req, res, next) => {
  try {
    const { a } = req.params;

    if (!a) {
      return res.redirect("/compare-brokers");
    }

    /*
     * Expected format:
     * 1:500
     *
     * We extract:
     * 500
     */
    const leverageParts = a.split(":");
    const urlLeverage = Number(leverageParts[1]);

    if (!Number.isFinite(urlLeverage)) {
      return res.redirect("/compare-brokers");
    }

    const brokers = await Broker.find({
      $expr: {
        $lte: [
          {
            $toInt: {
              $arrayElemAt: [
                {
                  $split: ["$brokerLeverage", ":"],
                },
                1,
              ],
            },
          },
          urlLeverage,
        ],
      },
    }).lean();

    res.render("compare-brokers", {
      editAddBroker: brokers,
      currentPage: a,
      title: `Brokers Max Leverage up to ${urlLeverage}`,
      isLoggedIn: req.isLoggedIn,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Compare brokers by minimum deposit
 *
 * URL example:
 * /compare-brokers/deposit/100
 */
exports.depositCompareBrokersPageController = async (req, res, next) => {
  try {
    const { a } = req.params;

    if (!a) {
      return res.redirect("/compare-brokers");
    }

    /*
     * Your old URL format was something like:
     * $100
     *
     * Remove the first character and convert to Number.
     */
    const urlDeposit = Number(a.slice(1));

    if (!Number.isFinite(urlDeposit)) {
      return res.redirect("/compare-brokers");
    }

    const brokers = await Broker.find({
      brokerMinDeposit: {
        $lte: urlDeposit,
      },
    }).lean();

    res.render("compare-brokers", {
      editAddBroker: brokers,
      currentPage: a,
      title: `${urlDeposit} Min Deposit Brokers`,
      isLoggedIn: req.isLoggedIn,
    });
  } catch (error) {
    next(error);
  }
};
