const path = require('path');
const rootdir = require('../../utils/pathutils');
const fs = require('fs');
const dataFilePath = path.join(rootdir, 'data', 'brokers.json');

module.exports = class editAddBroker {
    constructor(brokerDataTags, brokerName,brokerPick, brokerLogo, brokerHeading, DeatiledBrokerDescription, brokerRating, brokerTags,brokerFoundYear, brokerLeverage, brokerMinDeposit, brokerMinSpread, commissionLot, welcomeBonus) {
        this.brokerDataTags = brokerDataTags;
        this.brokerName = brokerName;
        this.brokerPick = brokerPick;
        this.brokerLogo = brokerLogo;
        this.brokerHeading = brokerHeading;
        this.DeatiledBrokerDescription = DeatiledBrokerDescription;
        this.brokerRating = brokerRating;
        this.brokerTags = brokerTags;
        this.brokerFoundYear = brokerFoundYear;
        this.brokerLeverage = brokerLeverage;
        this.brokerMinDeposit = brokerMinDeposit;
        this.brokerMinSpread = brokerMinSpread;
        this.commissionLot = commissionLot;
        this.welcomeBonus = welcomeBonus;


    }

    save() {

        console.log('Save method executed');
        editAddBroker.fetchAll((brokers) => {

            if (this.id) { // edit broker cases
                brokers = brokers.map(broker =>
                    broker.id == this.id ? this : broker);
                console.log('edit broker cases', this.id)
            } else { // add broker case
                console.log('add broker cases', this.id)

                this.id = Math.random().toString();
                brokers.push(this);
            }

            fs.writeFile(dataFilePath, JSON.stringify(brokers), error => {
                if (error) {
                    console.error('Error writing Broker data to file:', error);
                } else {
                    console.log('Write File Callback executed');
                    console.log('Broker data saved successfully.');
                    // cb();
                }
            });
        })

    }

    static fetchAll(callback) {
        fs.readFile(dataFilePath, (err, fileContent) => {
            if (err) {
                console.error('Error reading broker data:', err);
                callback([]);
            } else {
                const brokers = JSON.parse(fileContent);
                callback(brokers);
                console.log('File read successfully.');

            }
        });
    }

    static findByid(brokerId, callback) {
        editAddBroker.fetchAll(brokerFetch => {
            const brokerFound = brokerFetch.find(broker => broker.id === brokerId);
            callback(brokerFound);
        })
    }
    static findByBrokerDataTags(requiredTags, callback) {
        editAddBroker.fetchAll(brokerFetch => {
            // Filters brokers that contain AT LEAST ONE tag passed in the array
            const brokerFound = brokerFetch.filter(broker =>
                requiredTags.some(tag => broker.brokerDataTags.includes(tag))
            );
            callback(brokerFound);
        });


    }
    static findByBrokerTags(requiredTags, callback) {
        editAddBroker.fetchAll(brokerFetch => {
            // Filters brokers that contain AT LEAST ONE tag passed in the array
            const brokerFound = brokerFetch.filter(broker =>
                requiredTags.some(tag => broker.brokerTags.includes(tag))
            );
            callback(brokerFound);
        });


    }
    static findByMaxLeverage(requiredLeverage, callback) {
        editAddBroker.fetchAll(brokerFetch => {
            // Filters brokers that contain AT LEAST ONE requiredLeverage passed in the array
            // wrote by me this below code
            const brokerFound = brokerFetch.filter(broker => parseInt(broker.brokerLeverage.split(':')[1], 10) <= requiredLeverage);
            callback(brokerFound);
        });


    }
    static findByMinDeposit(requiredMinDeposit, callback) {
        editAddBroker.fetchAll(brokerFetch => {
            // Filters brokers that contain AT LEAST ONE requiredMinDeposit passed in the array
            // wrote by me this below code
            const brokerFound = brokerFetch.filter(broker => parseInt(broker.brokerMinDeposit) <= requiredMinDeposit);
            callback(brokerFound);
        });


    }




    static deleteById(deleteBrokerId, callback) {
        // 1. Get the entire list of brokers
        editAddBroker.fetchAll(brokers => {
            // 2. Filter out the broker you want to remove
            const updatedBrokers = brokers.filter(broker => broker.id !== deleteBrokerId);

            // 3. Directly overwrite the file with the clean list
            fs.writeFile(dataFilePath, JSON.stringify(updatedBrokers), error => {
                if (error) {
                    console.error('Error deleting broker data:', error);
                } else {
                    console.log('Broker deleted successfully.');
                    callback(); // Execute the callback to redirect the page
                }
            });
        });
    }


}