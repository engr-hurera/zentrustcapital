const path = require('path');
const rootdir = require('../utils/pathutils');
const getArticlesrPage = require(path.join(rootdir, 'controllers', 'articles'));
const express = require('express');

const articlesPageRouter = express.Router();
articlesPageRouter.get('/articles', getArticlesrPage.articlesPageController);

module.exports = articlesPageRouter;