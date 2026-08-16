const Broker = require("../models/Admin/broker.js");

/*
|--------------------------------------------------------------------------
| Helper functions
|--------------------------------------------------------------------------
*/

const REGULATION_TAGS = [
  "FCA",
  "ASIC",
  "CySEC",
  "FSCA",
  "CFTC",
  "NFA",
  "FINMA",
];

const PLATFORM_TAGS = ["MT4/MT5", "MT4", "MT5", "cTrader"];

/*
|--------------------------------------------------------------------------
| Prepare broker data for the review page
|--------------------------------------------------------------------------
*/

function prepareBrokerReviewData(broker) {
  const brokerTags = Array.isArray(broker.brokerTags) ? broker.brokerTags : [];

  const brokerDataTags = Array.isArray(broker.brokerDataTags)
    ? broker.brokerDataTags
    : [];

  /*
  |--------------------------------------------------------------------------
  | Regulation
  |--------------------------------------------------------------------------
  */

  const regulationTags = brokerTags.filter((tag) =>
    REGULATION_TAGS.includes(tag),
  );

  const isRegulated = regulationTags.length > 0;

  /*
  |--------------------------------------------------------------------------
  | Trading platforms
  |--------------------------------------------------------------------------
  */

  const platforms = brokerTags.filter((tag) => PLATFORM_TAGS.includes(tag));

  /*
  |--------------------------------------------------------------------------
  | Founded year
  |--------------------------------------------------------------------------
  */

  let foundedYear = "";

  if (broker.brokerFoundYear) {
    const date = new Date(broker.brokerFoundYear);

    if (!Number.isNaN(date.getTime())) {
      foundedYear = date.getFullYear();
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Pros
  |--------------------------------------------------------------------------
  */

  const pros = [];

  const minDeposit = Number(broker.brokerMinDeposit) || 0;
  const minSpread = Number(broker.brokerMinSpread) || 0;
  const commission = Number(broker.commissionLot) || 0;

  if (minDeposit > 0 && minDeposit <= 10) {
    pros.push(`Ultra-low $${minDeposit} minimum deposit`);
  }

  if (minSpread === 0) {
    pros.push("Raw spreads starting from 0.0 pips");
  } else if (minSpread > 0 && minSpread < 0.5) {
    pros.push(`Competitive spreads from ${minSpread} pips`);
  }

  if (commission > 0 && commission <= 3) {
    pros.push(`Low commission of just $${commission} per lot`);
  }

  if (brokerDataTags.includes("Instant-withdrawal")) {
    pros.push("Instant same-day withdrawals");
  }

  if (brokerDataTags.includes("JazzCash-Easypaisa")) {
    pros.push("Easy local deposits via JazzCash & Easypaisa");
  }

  if (brokerDataTags.includes("Islamic-Account")) {
    pros.push("100% Shariah-compliant Islamic swap-free accounts");
  }

  if (pros.length === 0) {
    pros.push("Standard account conditions");
  }

  /*
  |--------------------------------------------------------------------------
  | Cons
  |--------------------------------------------------------------------------
  */

  const cons = [];

  if (minDeposit > 50) {
    cons.push(`Higher initial entry barrier ($${minDeposit} minimum deposit)`);
  }

  if (minSpread >= 1.5) {
    cons.push(
      `Wider benchmark spreads (${minSpread} pips on standard accounts)`,
    );
  }

  if (commission >= 7) {
    cons.push(
      `Expensive commission charges ($${commission}/lot) on raw accounts`,
    );
  }

  if (!brokerDataTags.includes("JazzCash-Easypaisa")) {
    cons.push(
      "Does not directly support Pakistani mobile wallets (JazzCash/Easypaisa)",
    );
  }

  if (cons.length === 0) {
    cons.push("No major disadvantages reported");
  }

  /*
  |--------------------------------------------------------------------------
  | Category scores
  |--------------------------------------------------------------------------
  */

  // 1. Regulation & Safety
  let safetyScore = 5.0;

  const upperBrokerTags = brokerTags.map((tag) => String(tag).toUpperCase());

  if (upperBrokerTags.includes("FCA")) {
    safetyScore += 2.0;
  }

  if (upperBrokerTags.includes("ASIC")) {
    safetyScore += 2.0;
  }

  if (upperBrokerTags.includes("CYSEC")) {
    safetyScore += 1.0;
  }

  safetyScore = Math.min(Math.max(safetyScore, 1), 10);

  // 2. Spreads & Fees
  let feesScore = 10.0;

  feesScore -= minSpread * 2.0;
  feesScore -= commission * 0.3;

  feesScore = Math.min(Math.max(feesScore, 1), 10);

  // 3. Deposit & Withdrawal
  let fundingScore = 7.0;

  if (brokerDataTags.includes("Instant-withdrawal")) {
    fundingScore += 1.5;
  }

  if (brokerDataTags.includes("JazzCash-Easypaisa")) {
    fundingScore += 1.5;
  }

  if (minDeposit <= 10) {
    fundingScore += 0.5;
  }

  fundingScore = Math.min(Math.max(fundingScore, 1), 10);

  // 4. Trading Platforms
  let platformsScore = 6.0;

  const lowerPlatforms = brokerTags.map((tag) => String(tag).toLowerCase());

  if (
    lowerPlatforms.includes("mt4/mt5") ||
    (lowerPlatforms.includes("mt4") && lowerPlatforms.includes("mt5"))
  ) {
    platformsScore += 3.0;
  } else if (lowerPlatforms.includes("mt4") || lowerPlatforms.includes("mt5")) {
    platformsScore += 1.5;
  }

  if (lowerPlatforms.includes("ctrader")) {
    platformsScore += 1.0;
  }

  platformsScore = Math.min(Math.max(platformsScore, 1), 10);

  // 5. Customer Support
  let supportScore = 7.0;

  if (brokerDataTags.includes("24By7CustomerSupport")) {
    supportScore += 2.0;
  }

  const description =
    broker.DeatiledBrokerDescription || broker.brokerHeading || "";

  if (description.toLowerCase().includes("support")) {
    supportScore += 1.0;
  }

  supportScore = Math.min(Math.max(supportScore, 1), 10);

  /*
  |--------------------------------------------------------------------------
  | Overall prepared data
  |--------------------------------------------------------------------------
  */

  return {
    broker,
    foundedYear,
    regulationTags,
    isRegulated,
    platforms,

    pros,
    cons,

    scores: {
      safety: Number(safetyScore.toFixed(1)),
      fees: Number(feesScore.toFixed(1)),
      funding: Number(fundingScore.toFixed(1)),
      platforms: Number(platformsScore.toFixed(1)),
      support: Number(supportScore.toFixed(1)),
    },
  };
}

/*
|--------------------------------------------------------------------------
| Broker review landing page
|--------------------------------------------------------------------------
*/

exports.brokerReviewPageController = (req, res, next) => {
  res.render("broker-review", {
    currentPage: "broker-review",
    title: "Brokers Review",
    isLoggedIn: req.isLoggedIn,
    broker: null,
  });
};

/*
|--------------------------------------------------------------------------
| Individual broker review page
|--------------------------------------------------------------------------
*/

exports.readMoreBrokerReviewPageController = async (req, res, next) => {
  try {
    const brokerId = req.params.j;

    /*
    |--------------------------------------------------------------------------
    | Find broker using MongoDB / Mongoose
    |--------------------------------------------------------------------------
    */

    const broker = await Broker.findById(brokerId).lean();

    /*
    |--------------------------------------------------------------------------
    | Broker doesn't exist
    |--------------------------------------------------------------------------
    */

    if (!broker) {
      return res.redirect("/error404");
    }

    /*
    |--------------------------------------------------------------------------
    | Prepare all business logic here
    |--------------------------------------------------------------------------
    */

    const reviewData = prepareBrokerReviewData(broker);

    console.log("Broker review loaded:", broker.brokerName);

    /*
    |--------------------------------------------------------------------------
    | Render page
    |--------------------------------------------------------------------------
    */

    return res.render("broker-review", {
      currentPage: "broker-review",
      title: `${broker.brokerName} Review`,
      isLoggedIn: req.isLoggedIn,

      broker: reviewData.broker,

      foundedYear: reviewData.foundedYear,

      regulationTags: reviewData.regulationTags,

      isRegulated: reviewData.isRegulated,

      platforms: reviewData.platforms,

      pros: reviewData.pros,

      cons: reviewData.cons,

      scores: reviewData.scores,
    });
  } catch (error) {
    console.error("Broker review error:", error);

    next(error);
  }
};
