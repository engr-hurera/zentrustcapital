const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const helmet = require("helmet");
const path = require("path");

// Load environment variables
require("dotenv").config();

const app = express();

const rootdir = require("./utils/pathutils.js");
const { connectMongo } = require("./utils/databaseutil.js");

// Middleware
const authMiddleware = require("./middleware/authMiddleware");

// Routers
const homePageRouter = require("./routes/home.js");
const brokerPageRouter = require("./routes/brokers.js");
const ibProgramPageRouter = require("./routes/ib-program.js");
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
const dashboardPageRouter = require("./routes/dashboard.js");
const signalsPageRouter = require("./routes/signals.js");
const addEditBroker = require("./routes/admin/addEditBroker.js");

// Error Controller
const pageNotFoundRouter = require("./controllers/error404.js");

const PORT = process.env.PORT || 3000;
const DB_PATH = process.env.MONGO_URI;

// Trust proxy (recommended for production)
app.set("trust proxy", 1);

// Security Headers
app.use(helmet());

// Body Parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static Files
app.use(express.static(path.join(rootdir, "Public")));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(rootdir, "views"));

// Mongo Session Store
const store = new MongoDBStore({
  uri: DB_PATH,
  collection: "sessions",
});

// Session Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "zenTrust Capital",
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    },
  }),
);

// Make session values available everywhere
app.use((req, res, next) => {
  req.isLoggedIn = !!req.session.isLoggedIn;

  res.locals.isAuthenticated = !!req.session.isLoggedIn;
  res.locals.currentUser = req.session.user || null;

  next();
});

/* ============================================================
   PUBLIC ROUTES
============================================================ */

app.use("/", homePageRouter);

app.use(authRouterPageRouter);

app.use(brokerPageRouter);

app.use(ibProgramPageRouter);

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

/* ============================================================
   PROTECTED USER ROUTES
============================================================ */

app.use(authMiddleware.isAuthenticated);

app.use(dashboardPageRouter);

/* ============================================================
   ADMIN ROUTES
============================================================ */

app.use(authMiddleware.isRole("admin"));

app.use(addEditBroker);

/* ============================================================
   404
============================================================ */

app.use(pageNotFoundRouter.pageNotFoundController);

/* ============================================================
   START SERVER
============================================================ */

connectMongo()
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database Connection Failed");
    console.error(err);
  });
