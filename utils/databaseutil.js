const mongo = require('mongodb').MongoClient;

const MONGO_URL = "mongodb://atlas-sql-6a3a8334a3aa764bbccd075b-spv4ov.a.query.mongodb.net/sample_mflix?ssl=true&authSource=admin";

let _db;

const connectMongo = (callback) => {
    mongo.connect(MONGO_URL)
    .then(client => {
        callback(client);
        _db = client.db('zentrustcapital');
    }).catch(err => {
        console.log('Error while connecting to Mongo: ', err);
    })
}

const getDb = () => {
    if (!_db){
        throw new Error('Database not connected');
    }
    return _db;
}

exports.connectMongo = connectMongo;
exports.getDb = getDb;