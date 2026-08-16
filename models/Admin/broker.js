const mongoose = require("mongoose");

const brokerSchema = new mongoose.Schema(
  {
    brokerDataTags: {
      type: [String],
      default: [],
    },

    brokerName: {
      type: String,
      required: true,
      trim: true,
    },

    brokerPick: {
      type: String,
      trim: true,
    },

    brokerLogo: {
      type: String,
      trim: true,
    },

    brokerHeading: {
      type: String,
      trim: true,
    },

    DeatiledBrokerDescription: {
      type: String,
      trim: true,
    },

    brokerRating: {
      type: Number,
      min: 0,
      max: 5,
    },

    brokerTags: {
      type: [String],
      default: [],
    },

    brokerFoundYear: {
      type: String,
    },

    brokerLeverage: {
      type: String,
      trim: true,
    },

    brokerLeverage: {
      type: String,
      trim: true,
    },

    brokerMinDeposit: {
      type: Number,
      min: 0,
    },

    brokerMinSpread: {
      type: Number,
      min: 0,
    },

    commissionLot: {
      type: Number,
      min: 0,
    },

    welcomeBonus: {
      type: Number,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Broker", brokerSchema);
