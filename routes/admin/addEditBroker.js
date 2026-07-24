const path = require('path');
const rootdir = require('../../utils/pathutils');
const addEditbroker = require(path.join(rootdir, 'controllers', '/admin', 'addEditbroker.js'));
const express = require('express');

const addEditbrokerRouter = express.Router();
addEditbrokerRouter.get('/admin/add-broker', addEditbroker.getAddBrokerController);
addEditbrokerRouter.post('/admin/add-broker', addEditbroker.postAddBrokerController);
addEditbrokerRouter.get('/admin/edit-broker/:h', addEditbroker.getEditBrokerController);
addEditbrokerRouter.post('/admin/edit-broker', addEditbroker.postEditBrokerController);
addEditbrokerRouter.post('/admin/delete-broker/:h', addEditbroker.postDeleteBrokerController);

module.exports = addEditbrokerRouter;