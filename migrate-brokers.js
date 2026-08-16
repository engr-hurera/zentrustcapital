require("dotenv").config();

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const Broker = require("./models/Admin/broker");

const dataFilePath = path.join(__dirname, "data", "brokers.json");

// ============================================================
// HELPER: Convert old values safely to Number
// ============================================================

function toNumber(value) {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  const stringValue = String(value).trim();

  // Values such as:
  // "N/A"
  // "NA"
  // "NaN"
  // "Not Available"
  // should not be converted to Number.

  const invalidValues = ["n/a", "na", "nan", "not available", "none", "-"];

  if (invalidValues.includes(stringValue.toLowerCase())) {
    return undefined;
  }

  // Remove common non-numeric characters.
  // Examples:
  // "$100"      → 100
  // "100 USD"   → 100
  // "4.5 / 5"   → 4.5

  const cleanedValue = stringValue.replace(/[^0-9.-]/g, "");

  if (cleanedValue === "") {
    return undefined;
  }

  const numberValue = Number(cleanedValue);

  if (Number.isNaN(numberValue)) {
    return undefined;
  }

  return numberValue;
}

// ============================================================
// HELPER: Make sure tags are always arrays
// ============================================================

function toArray(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (value === undefined || value === null || value === "") {
    return [];
  }

  // If old JSON contains something like:
  // "Forex, Regulated, Low Spread"
  //
  // convert it into:
  // ["Forex", "Regulated", "Low Spread"]

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

// ============================================================
// MIGRATION
// ============================================================

async function migrateBrokers() {
  try {
    // ---------------------------------------------------------
    // 1. Connect to MongoDB
    // ---------------------------------------------------------

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB connected");

    // ---------------------------------------------------------
    // 2. Read brokers.json
    // ---------------------------------------------------------

    const fileContent = fs.readFileSync(dataFilePath, "utf8");

    const brokers = JSON.parse(fileContent);

    console.log(`📄 Found ${brokers.length} brokers in brokers.json`);

    if (brokers.length === 0) {
      console.log("⚠️ brokers.json is empty.");

      await mongoose.connection.close();

      return;
    }

    // ---------------------------------------------------------
    // 3. Prepare broker documents
    // ---------------------------------------------------------

    const brokerDocuments = brokers.map((broker, index) => {
      console.log(`Preparing broker ${index + 1}: ${broker.brokerName}`);

      return {
        brokerDataTags: toArray(broker.brokerDataTags),

        brokerName: broker.brokerName,

        brokerPick: broker.brokerPick,

        brokerLogo: broker.brokerLogo,

        brokerHeading: broker.brokerHeading,

        DeatiledBrokerDescription: broker.DeatiledBrokerDescription,

        brokerRating: toNumber(broker.brokerRating),

        brokerTags: toArray(broker.brokerTags),

        brokerFoundYear: toNumber(broker.brokerFoundYear),

        brokerLeverage: broker.brokerLeverage,

        brokerMinDeposit: toNumber(broker.brokerMinDeposit),

        brokerMinSpread: toNumber(broker.brokerMinSpread),

        commissionLot: toNumber(broker.commissionLot),

        welcomeBonus: toNumber(broker.welcomeBonus),
      };
    });

    // ---------------------------------------------------------
    // 4. Clear existing MongoDB broker data
    // ---------------------------------------------------------

    await Broker.deleteMany({});

    console.log("🧹 Existing MongoDB broker collection cleared");

    // ---------------------------------------------------------
    // 5. Insert all brokers
    // ---------------------------------------------------------

    const insertedBrokers = await Broker.insertMany(brokerDocuments);

    console.log(`✅ Successfully migrated ${insertedBrokers.length} brokers`);

    // ---------------------------------------------------------
    // 6. Display migrated brokers
    // ---------------------------------------------------------

    insertedBrokers.forEach((broker, index) => {
      console.log(`${index + 1}. ${broker.brokerName} → ${broker._id}`);
    });

    // ---------------------------------------------------------
    // 7. Close connection
    // ---------------------------------------------------------

    await mongoose.connection.close();

    console.log("✅ Migration completed successfully");
  } catch (error) {
    console.error("❌ Migration failed:");

    console.error(error);

    try {
      await mongoose.connection.close();
    } catch (closeError) {
      console.error("Error closing MongoDB connection:", closeError);
    }

    process.exit(1);
  }
}

migrateBrokers();
