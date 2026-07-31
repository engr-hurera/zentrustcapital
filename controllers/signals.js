/*
  Signals controller
  ---------------------------------------------------------------------------
  NOTE: sampleSignals is PLACEHOLDER/DEMO data so the page has something to
  render. Before going live, replace this with real signals coming from
  your analysis pipeline/provider and a database, and keep showing the
  risk disclaimer — trading signals should never be presented as guaranteed
  outcomes.
  ---------------------------------------------------------------------------
*/

const sampleSignals = [
  {
    pair: 'EUR/USD', full: 'Euro / US Dollar', action: 'BUY',
    entry: 1.08472, sl: 1.08120, tp: 1.09150,
    confidence: 82, timeframe: 'H4', posted: '12 min ago', status: 'Active',
  },
  {
    pair: 'GBP/JPY', full: 'British Pound / Japanese Yen', action: 'SELL',
    entry: 190.842, sl: 191.400, tp: 189.600,
    confidence: 74, timeframe: 'H1', posted: '38 min ago', status: 'Active',
  },
  {
    pair: 'XAU/USD', full: 'Gold / US Dollar', action: 'BUY',
    entry: 2412.30, sl: 2398.00, tp: 2441.00,
    confidence: 88, timeframe: 'D1', posted: '1 hr ago', status: 'Active',
  },
  {
    pair: 'USD/JPY', full: 'US Dollar / Japanese Yen', action: 'SELL',
    entry: 149.823, sl: 150.350, tp: 148.700,
    confidence: 65, timeframe: 'H4', posted: '2 hr ago', status: 'Active',
  },
  {
    pair: 'AUD/USD', full: 'Australian Dollar / US Dollar', action: 'BUY',
    entry: 0.65213, sl: 0.64850, tp: 0.65900,
    confidence: 70, timeframe: 'H1', posted: '3 hr ago', status: 'Hit TP ✅',
  },
  {
    pair: 'USD/CAD', full: 'US Dollar / Canadian Dollar', action: 'SELL',
    entry: 1.36980, sl: 1.37400, tp: 1.36200,
    confidence: 60, timeframe: 'H4', posted: '5 hr ago', status: 'Hit SL ❌',
  },
];

exports.signalsPageController = (req, res, next) => {
  res.render('signals', {
    currentPage: 'signals',
    title: 'Live Signals | Zen Trust Capital',
    signals: sampleSignals,
    isLoggedIn: req.isLoggedIn
  });
};
