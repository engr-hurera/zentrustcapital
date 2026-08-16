require("dotenv").config();

const mongoose = require("mongoose");
const Broker = require("./models/Admin/broker");

async function testBrokerModel() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB connected");

    // Create a temporary broker
    const broker = await Broker.create({
      brokerDataTags: ["test", "temporary"],
      brokerName: "Test Broker",
      brokerPick: "Test",
      brokerLogo: "/images/test-broker.png",
      brokerHeading: "Temporary Test Broker",
      DeatiledBrokerDescription: "This broker is only for testing.",
      brokerRating: 4.5,
      brokerTags: ["Test"],
      brokerFoundYear: 2020,
      brokerLeverage: "1:500",
      brokerMinDeposit: 100,
      brokerMinSpread: 0.8,
      commissionLot: 8,
      welcomeBonus: 50,
    });

    console.log("✅ Broker created successfully");
    console.log("Broker ID:", broker._id);

    // Find the broker we just created
    const foundBroker = await Broker.findById(broker._id);

    console.log("✅ Broker found:");
    console.log(foundBroker);

    // Delete the temporary broker
    await Broker.findByIdAndDelete(broker._id);

    console.log("✅ Temporary broker deleted");

    // Close connection
    await mongoose.connection.close();

    console.log("✅ Test completed successfully");
  } catch (error) {
    console.error("❌ Test failed:");
    console.error(error);

    await mongoose.connection.close();
    process.exit(1);
  }
}

testBrokerModel();
