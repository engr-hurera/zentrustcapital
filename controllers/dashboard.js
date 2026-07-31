/*
  Dashboard controller
  ---------------------------------------------------------------------------
  NOTE: All numbers/rows below are PLACEHOLDER SAMPLE DATA so the page has
  something real to render while the UI is being built. Before this goes
  live you'll want to:
    1. Add real authentication/session middleware (req.user) and redirect
       unauthenticated visitors to /login.
    2. Replace the sampleClientData / sampleAdminData objects with real
       queries (referrals, commission ledger, withdrawal requests, etc.)
       from your database.
    3. Make sure only users with an admin role can hit the /dashboard/admin
       route (route-level auth check), since it can approve withdrawals.
  ---------------------------------------------------------------------------
*/

const sampleClientData = {
  ibName: 'Ahmed Raza',
  ibId: 'ZTC-IB-10432',
  referralCode: 'AHMEDRAZA10',
  referralLink: 'https://zentrustcapital.com/open-account?ref=AHMEDRAZA10',
  tier: {
    current: 'Silver',
    next: 'Gold',
    ratePerLot: 8,
    nextRatePerLot: 12,
    clientsInTier: 27,
    clientsNeededForNext: 50,
  },
  stats: {
    totalReferrals: 27,
    activeClients: 19,
    totalCommission: 4820.50,
    pendingCommission: 312.00,
    availableBalance: 940.25,
  },
  referredClients: [
    { name: 'Bilal Ahmed', joined: '2026-06-02', status: 'Active', lots: 42, commission: 336.00 },
    { name: 'Sara Khan', joined: '2026-06-11', status: 'Active', lots: 18, commission: 144.00 },
    { name: 'Usman Tariq', joined: '2026-06-20', status: 'Pending KYC', lots: 0, commission: 0 },
    { name: 'Fatima Noor', joined: '2026-07-03', status: 'Active', lots: 65, commission: 520.00 },
    { name: 'Hamza Iqbal', joined: '2026-07-15', status: 'Inactive', lots: 3, commission: 24.00 },
  ],
  transactions: [
    { date: '2026-07-25', type: 'Commission', desc: 'Lot commission — Fatima Noor', amount: 84.00 },
    { date: '2026-07-20', type: 'Withdrawal', desc: 'Payout to bank •••• 4821', amount: -500.00 },
    { date: '2026-07-14', type: 'Commission', desc: 'Lot commission — Bilal Ahmed', amount: 56.00 },
    { date: '2026-07-05', type: 'Commission', desc: 'Lot commission — Sara Khan', amount: 32.00 },
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
    { name: 'Ahmed Raza', id: 'ZTC-IB-10432', tier: 'Silver', referrals: 27, commission: 4820.50, status: 'Active' },
    { name: 'Zoya Malik', id: 'ZTC-IB-10298', tier: 'Gold', referrals: 61, commission: 11200.00, status: 'Active' },
    { name: 'Danish Aslam', id: 'ZTC-IB-10511', tier: 'Bronze', referrals: 8, commission: 640.00, status: 'Under Review' },
    { name: 'Mehak Farooq', id: 'ZTC-IB-10077', tier: 'Platinum', referrals: 132, commission: 28950.00, status: 'Active' },
  ],
  withdrawalRequests: [
    { ib: 'Ahmed Raza', id: 'ZTC-IB-10432', amount: 500.00, method: 'Bank Transfer', requested: '2026-07-26', status: 'Pending' },
    { ib: 'Danish Aslam', id: 'ZTC-IB-10511', amount: 150.00, method: 'Crypto (USDT)', requested: '2026-07-25', status: 'Pending' },
    { ib: 'Zoya Malik', id: 'ZTC-IB-10298', amount: 1200.00, method: 'Easypaisa', requested: '2026-07-24', status: 'Pending' },
  ],
};

exports.clientDashboardController = (req, res, next) => {
  res.render('dashboard', {
    currentPage: 'dashboard',
    title: 'Dashboard | Zen Trust Capital',
    role: 'client',
    data: sampleClientData, isLoggedIn: req.isLoggedIn
  });
};

exports.adminDashboardController = (req, res, next) => {
  res.render('dashboard', {
    currentPage: 'admin-dashboard',
    title: 'Admin Dashboard | Zen Trust Capital',
    role: 'admin',
    data: sampleAdminData, isLoggedIn: req.isLoggedIn
  });
};
