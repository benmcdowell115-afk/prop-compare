export interface AccountPlan {
  size: number
  price: number
  resetPrice: number
}

export interface PropFirm {
  id: string
  name: string
  shortName: string
  website: string
  color: string
  accounts: AccountPlan[]
  profitSplit: number
  drawdownType: 'trailing' | 'eod' | 'static'
  maxDrawdown: number
  dailyLoss: number
  minTradingDays: number
  newsTrading: boolean
  instruments: string[]
  payoutSplit: string
  payoutSpeed: string
  liveAccount: boolean
  hasPricePromos: boolean
  promoNote?: string
  highlights: string[]
  lastVerified: string
  score?: number
}

const RAW_FIRMS: PropFirm[] = [
  {
    id: 'apex',
    name: 'Apex Trader Funding',
    shortName: 'Apex',
    website: 'https://apextraderfunding.com',
    color: '#3b82f6',
    accounts: [
      { size: 25000,  price: 167, resetPrice: 85  },
      { size: 50000,  price: 167, resetPrice: 85  },
      { size: 75000,  price: 188, resetPrice: 95  },
      { size: 100000, price: 207, resetPrice: 105 },
      { size: 150000, price: 297, resetPrice: 150 },
      { size: 250000, price: 517, resetPrice: 260 },
    ],
    profitSplit: 90,
    drawdownType: 'trailing',
    maxDrawdown: 6,
    dailyLoss: 0,
    minTradingDays: 7,
    newsTrading: true,
    instruments: ['ES', 'NQ', 'CL', 'GC', 'RTY', 'YM', 'ZB', '6E', '6J'],
    payoutSplit: '90% after first $25K to firm on 100K plan',
    payoutSpeed: 'On demand (after 1 day qualifying)',
    liveAccount: false,
    hasPricePromos: true,
    promoNote: 'Runs 80–90% off promos frequently — check site before paying full price',
    highlights: [
      'Most instruments of any firm',
      'Frequent massive discounts',
      'News trading allowed',
      '7-day minimum — fastest path',
    ],
    lastVerified: '2026-05-15',
  },
  {
    id: 'topstep',
    name: 'TopStep',
    shortName: 'TopStep',
    website: 'https://topstep.com',
    color: '#10b981',
    accounts: [
      { size: 50000,  price: 165, resetPrice: 100 },
      { size: 100000, price: 325, resetPrice: 165 },
      { size: 150000, price: 375, resetPrice: 190 },
    ],
    profitSplit: 90,
    drawdownType: 'trailing',
    maxDrawdown: 6,
    dailyLoss: 3,
    minTradingDays: 5,
    newsTrading: false,
    instruments: ['ES', 'NQ', 'CL', 'GC', 'RTY', 'YM', '6E'],
    payoutSplit: '90% after first $5K to firm, then 100%',
    payoutSpeed: 'Weekly (Thursday)',
    liveAccount: true,
    hasPricePromos: false,
    highlights: [
      'Most established firm in the industry',
      'First $5K profit to firm then 100% yours',
      'Weekly Thursday payouts',
      'Live funded account pathway',
    ],
    lastVerified: '2026-05-15',
  },
  {
    id: 'mff',
    name: 'My Funded Futures',
    shortName: 'MFF',
    website: 'https://myfundedfutures.com',
    color: '#8b5cf6',
    accounts: [
      { size: 50000,  price: 65,  resetPrice: 40  },
      { size: 100000, price: 115, resetPrice: 65  },
      { size: 150000, price: 140, resetPrice: 80  },
      { size: 200000, price: 190, resetPrice: 100 },
    ],
    profitSplit: 90,
    drawdownType: 'eod',
    maxDrawdown: 6,
    dailyLoss: 3,
    minTradingDays: 8,
    newsTrading: true,
    instruments: ['ES', 'NQ', 'CL', 'GC', 'RTY', 'YM', 'ZB', '6E'],
    payoutSplit: '90% profit split',
    payoutSpeed: 'Bi-weekly',
    liveAccount: true,
    hasPricePromos: false,
    highlights: [
      'Cheapest prices in the industry',
      'EOD drawdown — far more forgiving',
      'News trading allowed',
      'Live funded account pathway',
    ],
    lastVerified: '2026-05-15',
  },
  {
    id: 'tpt',
    name: 'Take Profit Trader',
    shortName: 'TPT',
    website: 'https://takeprofittrader.com',
    color: '#f59e0b',
    accounts: [
      { size: 25000,  price: 150, resetPrice: 75  },
      { size: 50000,  price: 150, resetPrice: 75  },
      { size: 100000, price: 200, resetPrice: 100 },
      { size: 150000, price: 250, resetPrice: 125 },
    ],
    profitSplit: 80,
    drawdownType: 'eod',
    maxDrawdown: 6,
    dailyLoss: 3,
    minTradingDays: 5,
    newsTrading: true,
    instruments: ['ES', 'NQ', 'CL', 'GC', 'RTY', 'YM'],
    payoutSplit: '80% (90% after 9 months of consistent funding)',
    payoutSpeed: 'Weekly',
    liveAccount: false,
    hasPricePromos: true,
    promoNote: 'Regular promo codes available',
    highlights: [
      'EOD drawdown calculation',
      'Split 25K & 50K same price',
      'Upgrades to 90% split after 9 months',
      'Weekly payouts',
    ],
    lastVerified: '2026-05-15',
  },
  {
    id: 'tradeday',
    name: 'TradeDay',
    shortName: 'TradeDay',
    website: 'https://tradeday.com',
    color: '#06b6d4',
    accounts: [
      { size: 25000,  price: 99,  resetPrice: 50  },
      { size: 50000,  price: 150, resetPrice: 75  },
      { size: 100000, price: 250, resetPrice: 125 },
      { size: 200000, price: 450, resetPrice: 225 },
    ],
    profitSplit: 80,
    drawdownType: 'eod',
    maxDrawdown: 6,
    dailyLoss: 3,
    minTradingDays: 5,
    newsTrading: true,
    instruments: ['ES', 'NQ', 'CL', 'GC', 'RTY', 'YM', '6E'],
    payoutSplit: '80% profit split',
    payoutSpeed: 'Monthly',
    liveAccount: false,
    hasPricePromos: false,
    highlights: [
      'Cheapest 25K account in the space ($99)',
      'EOD drawdown',
      'News trading allowed',
      'Straightforward simple rules',
    ],
    lastVerified: '2026-05-15',
  },
  {
    id: 'earn2trade',
    name: 'Earn2Trade',
    shortName: 'E2T',
    website: 'https://earn2trade.com',
    color: '#ec4899',
    accounts: [
      { size: 25000,  price: 150, resetPrice: 80  },
      { size: 50000,  price: 170, resetPrice: 90  },
      { size: 100000, price: 220, resetPrice: 120 },
      { size: 200000, price: 370, resetPrice: 190 },
    ],
    profitSplit: 80,
    drawdownType: 'trailing',
    maxDrawdown: 8,
    dailyLoss: 4,
    minTradingDays: 15,
    newsTrading: false,
    instruments: ['ES', 'NQ', 'CL', 'GC', 'RTY', 'YM'],
    payoutSplit: '80% profit split',
    payoutSpeed: 'On request (after milestones)',
    liveAccount: true,
    hasPricePromos: false,
    highlights: [
      'Higher max drawdown (8%) than most',
      'Live funded account pathway',
      'Well-established — since 2016',
      'Larger daily loss limit (4%)',
    ],
    lastVerified: '2026-05-15',
  },
  {
    id: 'bulenox',
    name: 'Bulenox',
    shortName: 'Bulenox',
    website: 'https://bulenox.com',
    color: '#f97316',
    accounts: [
      { size: 25000,  price: 99,  resetPrice: 49  },
      { size: 50000,  price: 149, resetPrice: 75  },
      { size: 100000, price: 199, resetPrice: 99  },
      { size: 150000, price: 249, resetPrice: 125 },
    ],
    profitSplit: 75,
    drawdownType: 'eod',
    maxDrawdown: 5,
    dailyLoss: 2.5,
    minTradingDays: 5,
    newsTrading: true,
    instruments: ['ES', 'NQ', 'CL', 'GC', 'RTY'],
    payoutSplit: '75% profit split',
    payoutSpeed: 'Bi-weekly',
    liveAccount: false,
    hasPricePromos: true,
    promoNote: 'Frequent discount codes',
    highlights: [
      'Very competitive pricing',
      'EOD drawdown',
      'News trading allowed',
      'Fast 5-day minimum',
    ],
    lastVerified: '2026-05-15',
  },
  {
    id: 'elitetrader',
    name: 'Elite Trader Funding',
    shortName: 'ETF',
    website: 'https://elitetraderfunding.com',
    color: '#a855f7',
    accounts: [
      { size: 25000,  price: 125, resetPrice: 65  },
      { size: 50000,  price: 175, resetPrice: 88  },
      { size: 100000, price: 225, resetPrice: 113 },
      { size: 200000, price: 375, resetPrice: 188 },
    ],
    profitSplit: 80,
    drawdownType: 'eod',
    maxDrawdown: 6,
    dailyLoss: 3,
    minTradingDays: 5,
    newsTrading: true,
    instruments: ['ES', 'NQ', 'CL', 'GC', 'RTY', 'YM'],
    payoutSplit: '80% profit split',
    payoutSpeed: 'Weekly',
    liveAccount: false,
    hasPricePromos: true,
    promoNote: 'Occasional discount events',
    highlights: [
      'EOD drawdown',
      'News trading allowed',
      'Weekly payouts',
      'Solid mid-tier pricing',
    ],
    lastVerified: '2026-05-15',
  },
  {
    id: 'ftpplus',
    name: 'Funded Trading Plus',
    shortName: 'FTP+',
    website: 'https://fundedtradingplus.com',
    color: '#14b8a6',
    accounts: [
      { size: 25000,  price: 119, resetPrice: 60  },
      { size: 50000,  price: 159, resetPrice: 80  },
      { size: 100000, price: 239, resetPrice: 120 },
      { size: 200000, price: 399, resetPrice: 200 },
    ],
    profitSplit: 90,
    drawdownType: 'eod',
    maxDrawdown: 6,
    dailyLoss: 3,
    minTradingDays: 5,
    newsTrading: true,
    instruments: ['ES', 'NQ', 'CL', 'GC', 'RTY'],
    payoutSplit: '90% profit split',
    payoutSpeed: 'Bi-weekly',
    liveAccount: true,
    hasPricePromos: false,
    highlights: [
      '90% split — top tier payout',
      'EOD drawdown',
      'News trading allowed',
      'Live account pathway',
    ],
    lastVerified: '2026-05-15',
  },
  {
    id: 'lucid',
    name: 'Lucid Trader',
    shortName: 'Lucid',
    website: 'https://lucidtrader.com',
    color: '#818cf8',
    accounts: [
      { size: 25000,  price: 97,  resetPrice: 49  },
      { size: 50000,  price: 147, resetPrice: 74  },
      { size: 100000, price: 197, resetPrice: 99  },
      { size: 200000, price: 347, resetPrice: 174 },
    ],
    profitSplit: 85,
    drawdownType: 'eod',
    maxDrawdown: 6,
    dailyLoss: 3,
    minTradingDays: 5,
    newsTrading: true,
    instruments: ['ES', 'NQ', 'CL', 'GC', 'RTY', 'YM'],
    payoutSplit: '85% profit split',
    payoutSpeed: 'Weekly',
    liveAccount: false,
    hasPricePromos: true,
    promoNote: 'Regular discount codes — check site before paying full price',
    highlights: [
      'EOD drawdown — trader-friendly rules',
      'News trading allowed',
      'Weekly payouts',
      'Competitive pricing across all account sizes',
    ],
    lastVerified: '2026-05-15',
  },
]

// ── Scoring algorithm ─────────────────────────────────────────────────────────
function scoreFirm(f: PropFirm, accountSize = 100000): number {
  let score = 0

  // Value (price vs account size) — 28pts
  const plan = f.accounts.find(a => a.size === accountSize) ?? f.accounts[Math.floor(f.accounts.length / 2)]
  const valueRatio = plan.size / plan.price
  const maxRatio = 100000 / 65 // MFF 100K = best value
  score += Math.min(28, (valueRatio / maxRatio) * 28)

  // Profit split — 25pts
  score += (f.profitSplit / 100) * 25

  // Drawdown type — 20pts
  if (f.drawdownType === 'eod')      score += 20
  if (f.drawdownType === 'static')   score += 14
  if (f.drawdownType === 'trailing') score += 8

  // News trading — 10pts
  if (f.newsTrading) score += 10

  // Live account — 7pts
  if (f.liveAccount) score += 7

  // Payout speed — 5pts
  if (f.payoutSpeed.includes('demand') || f.payoutSpeed.includes('Weekly')) score += 5
  else if (f.payoutSpeed.includes('Bi')) score += 3
  else score += 1

  // Instrument variety — 5pts
  score += Math.min(5, f.instruments.length * 0.5)

  return Math.round(score)
}

export const FIRMS: PropFirm[] = RAW_FIRMS.map(f => ({
  ...f,
  score: scoreFirm(f),
})).sort((a, b) => (b.score ?? 0) - (a.score ?? 0))

export const TOP3 = FIRMS.slice(0, 3)

export const ACCOUNT_SIZES = [25000, 50000, 75000, 100000, 150000, 200000, 250000]

export function formatPrice(n: number) {
  return `$${n.toLocaleString()}`
}

export function formatSize(n: number) {
  return n >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n}`
}
