/*
|--------------------------------------------------------------------------
| Dashboard Controller
|--------------------------------------------------------------------------
| Currently renders sample data.
| Replace the sample objects with database queries when your backend is ready.
|--------------------------------------------------------------------------
*/

const sampleClientData = {
  ibName: "Ahmed Raza",
  ibId: "ZTC-IB-10432",
  referralCode: "AHMEDRAZA10",
  referralLink: "https://zentrustcapital.com/open-account?ref=AHMEDRAZA10",

  tier: {
    current: "Silver",
    next: "Gold",
    ratePerLot: 8,
    nextRatePerLot: 12,
    clientsInTier: 27,
    clientsNeededForNext: 50,
  },

  stats: {
    totalReferrals: 27,
    activeClients: 19,
    totalCommission: 4820.5,
    pendingCommission: 312.0,
    availableBalance: 940.25,
  },

  referredClients: [
    {
      name: "Bilal Ahmed",
      joined: "2026-06-02",
      status: "Active",
      lots: 42,
      commission: 336,
    },
    {
      name: "Sara Khan",
      joined: "2026-06-11",
      status: "Active",
      lots: 18,
      commission: 144,
    },
    {
      name: "Usman Tariq",
      joined: "2026-06-20",
      status: "Pending KYC",
      lots: 0,
      commission: 0,
    },
    {
      name: "Fatima Noor",
      joined: "2026-07-03",
      status: "Active",
      lots: 65,
      commission: 520,
    },
    {
      name: "Hamza Iqbal",
      joined: "2026-07-15",
      status: "Inactive",
      lots: 3,
      commission: 24,
    },
  ],

  transactions: [
    {
      date: "2026-07-25",
      type: "Commission",
      desc: "Lot commission — Fatima Noor",
      amount: 84,
    },
    {
      date: "2026-07-20",
      type: "Withdrawal",
      desc: "Payout to bank •••• 4821",
      amount: -500,
    },
    {
      date: "2026-07-14",
      type: "Commission",
      desc: "Lot commission — Bilal Ahmed",
      amount: 56,
    },
    {
      date: "2026-07-05",
      type: "Commission",
      desc: "Lot commission — Sara Khan",
      amount: 32,
    },
  ],
};

const sampleAdminData = {
  platformStats: {
    totalIBs: 214,
    totalReferredClients: 3180,
    totalCommissionPaid: 182430.75,
    pendingWithdrawals: 12,
  },

  ibPartners: [
    {
      name: "Ahmed Raza",
      id: "ZTC-IB-10432",
      tier: "Silver",
      referrals: 27,
      commission: 4820.5,
      status: "Active",
    },
    {
      name: "Zoya Malik",
      id: "ZTC-IB-10298",
      tier: "Gold",
      referrals: 61,
      commission: 11200,
      status: "Active",
    },
    {
      name: "Danish Aslam",
      id: "ZTC-IB-10511",
      tier: "Bronze",
      referrals: 8,
      commission: 640,
      status: "Under Review",
    },
    {
      name: "Mehak Farooq",
      id: "ZTC-IB-10077",
      tier: "Platinum",
      referrals: 132,
      commission: 28950,
      status: "Active",
    },
  ],

  withdrawalRequests: [
    {
      ib: "Ahmed Raza",
      id: "ZTC-IB-10432",
      amount: 500,
      method: "Bank Transfer",
      requested: "2026-07-26",
      status: "Pending",
    },
    {
      ib: "Danish Aslam",
      id: "ZTC-IB-10511",
      amount: 150,
      method: "Crypto (USDT)",
      requested: "2026-07-25",
      status: "Pending",
    },
    {
      ib: "Zoya Malik",
      id: "ZTC-IB-10298",
      amount: 1200,
      method: "Easypaisa",
      requested: "2026-07-24",
      status: "Pending",
    },
  ],
};

// =========================
// Client Dashboard
// =========================

exports.clientDashboardController = async (req, res, next) => {
  try {
    res.render("dashboard", {
      currentPage: "dashboard",
      title: "Dashboard | Zen Trust Capital",
      role: "client",
      data: sampleClientData,

      isLoggedIn: req.session.isLoggedIn,
      currentUser: req.session.user,
    });
  } catch (err) {
    next(err);
  }
};

// =========================
// Admin Dashboard
// =========================

exports.adminDashboardController = async (req, res, next) => {
  try {
    res.render("dashboard", {
      currentPage: "admin-dashboard",
      title: "Admin Dashboard | Zen Trust Capital",
      role: "admin",
      data: sampleAdminData,

      isLoggedIn: req.session.isLoggedIn,
      currentUser: req.session.user,
    });
  } catch (err) {
    next(err);
  }
};
