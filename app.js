const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

// 1. Load the environment variables right at the top
require("dotenv").config();

// 2. Read the connection string using process.env
const DB_PATH = process.env.MONGO_URI;

const app = express();

const path = require("path");
const rootdir = require("./utils/pathutils.js");

// 1. Router Imports
const homePageRouter = require("./routes/home.js");
const brokerPageRouter = require("./routes/brokers.js");
const ibProramPageRouter = require("./routes/ib-program.js");
const marketsPageRouter = require("./routes/markets.js");
const educationPageRouter = require("./routes/education.js");
const articlesPageRouter = require("./routes/articles.js");
const faqPageRouter = require("./routes/faq.js");
const authRouterPageRouter = require("./routes/authRouter.js");
const openAccountPageRouter = require("./routes/open-account.js");
const privacyPageRouter = require("./routes/privacy.js");
const termsPageRouter = require("./routes/terms.js");
const cookiesPageRouter = require("./routes/cookies.js");
const contactPageRouter = require("./routes/contact.js");
const compareBrokersPageRouter = require("./routes/compare-brokers.js");
const brokerReviewRouter = require("./routes/broker-review.js");
const aboutReviewRouter = require("./routes/about.js");
const addEditBroker = require("./routes/admin/addEditBroker.js");
const dashboardPageRouter = require("./routes/dashboard.js");
const signalsPageRouter = require("./routes/signals.js");

const { connectMongo } = require("./utils/databaseutil.js");

// 2. Global Configurations & Middleware
app.use(express.static(path.join(rootdir, "Public")));
app.use(express.urlencoded({ extended: true }));

const viewsPath = path.join(rootdir, "views");
app.set("view engine", "ejs");
app.set("views", viewsPath);

const store = new MongoDBStore({
  uri: DB_PATH,
  collection: "sessions",
});
app.use(
  session({
    secret: "zenTrust Capital",
    resave: false,
    saveUninitialized: true,
    // store: store,  // both way works now the sessions will be save on mongodb server instead of device server
    store,
  }),
);
app.use((req, res, next) => {
  // req.isLoggedIn = req.get('Cookie') ? req.get('Cookie').split('=')[1] === 'true' : false;
  req.isLoggedIn = req.session.isLoggedIn;
  next();
});
// 3. Authentication Guard Middleware
const checkAuth = (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
};

// 4. Public Routes (Accessible by anyone)
app.use("/", homePageRouter);
app.use(authRouterPageRouter);
app.use(brokerPageRouter);
app.use(ibProramPageRouter);
app.use(marketsPageRouter);
app.use(educationPageRouter);
app.use(articlesPageRouter);
app.use(faqPageRouter);
app.use(openAccountPageRouter);
app.use(privacyPageRouter);
app.use(termsPageRouter);
app.use(cookiesPageRouter);
app.use(contactPageRouter);
app.use(compareBrokersPageRouter);
app.use(brokerReviewRouter);
app.use(aboutReviewRouter);
app.use(signalsPageRouter);
// 5. Protected Routes (Requires login)
// Any route defined inside these routers now automatically checks for login first
app.use(checkAuth);
app.use(addEditBroker);
app.use(dashboardPageRouter);

// 6. 404 Error Handling (Must be at the very bottom)
const pageNotFoundRouter = require("./controllers/error404.js");
app.use(pageNotFoundRouter.pageNotFoundController);

// 7. Server Initialization
const port = process.env.PORT || 3000;

// Execute your connection utility function here
connectMongo()
  .then(() => {
    console.log("✅ Database connected successfully");
    app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error(
      "❌ Failed to start server because database connection failed:",
      err,
    );
  });
