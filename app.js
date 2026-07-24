const express = require('express');
const app = express();
const path = require('path');
const rootdir = require('./utils/pathutils.js');
// const homePageRouter = path.join(rootdir, 'routes', 'home.js');
const homePageRouter = require('./routes/home.js');
const brokerPageRouter = require('./routes/brokers.js');
const ibProramPageRouter = require('./routes/ib-program.js');
const marketsPageRouter = require('./routes/markets.js');
const educationPageRouter = require('./routes/education.js');
const articlesPageRouter = require('./routes/articles.js');
const faqPageRouter = require('./routes/faq.js');
const loginPageRouter = require('./routes/login.js');
const openAccountPageRouter = require('./routes/open-account.js');
const privacyPageRouter = require('./routes/privacy.js');
const termsPageRouter = require('./routes/terms.js');
const cookiesPageRouter = require('./routes/cookies.js');
const contactPageRouter = require('./routes/contact.js');
const compareBrokersPageRouter = require('./routes/compare-brokers.js');
const brokerReviewRouter = require('./routes/broker-review.js');
const aboutReviewRouter = require('./routes/about.js');
const addEditBroker = require('./routes/admin/addEditBroker.js');


const { connectMongo } = require('./utils/databaseutil.js');

app.use(express.static(path.join(rootdir, 'Public')));
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

const viewsPath = path.join(rootdir, 'views');
app.set('view engine', 'ejs');
app.set('views',viewsPath);


app.use(homePageRouter);
app.use(brokerPageRouter);
app.use(ibProramPageRouter);
app.use(marketsPageRouter);
app.use(educationPageRouter);
app.use(articlesPageRouter);
app.use(faqPageRouter);
app.use(loginPageRouter);
app.use(openAccountPageRouter);
app.use(privacyPageRouter);
app.use(termsPageRouter);
app.use(cookiesPageRouter);
app.use(contactPageRouter);
app.use(compareBrokersPageRouter);
app.use(brokerReviewRouter);
app.use(aboutReviewRouter);
app.use(addEditBroker);

// app.get('/',(req, res, next) => {
//     res.render('index');
// });

const pageNotFoundRouter = require('./controllers/error404.js');
app.use(pageNotFoundRouter.pageNotFoundController);


const port = process.env.PORT || 3000;
// connectMongo(client=>{
//     console.log('Connected to MongoDB', client);
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
// });
