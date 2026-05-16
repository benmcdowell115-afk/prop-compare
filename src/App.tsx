import { useState, useMemo } from 'react'
import { FIRMS, TOP3, ACCOUNT_SIZES, formatPrice, formatSize, type PropFirm } from './data'

function ScoreBadge({ score, size = 'md' }: { score: number; size?: 'sm' | 'md' | 'lg' }) {
  const color = score >= 80 ? '#34d399' : score >= 65 ? '#f59e0b' : '#f87171'
  const sz = size === 'lg' ? 'text-[28px]' : size === 'md' ? 'text-[18px]' : 'text-[13px]'
  return (
    <span className={`font-black ${sz}`} style={{ color, textShadow: `0 0 20px ${color}55` }}>
      {score}
    </span>
  )
}

function Tag({ yes, label }: { yes: boolean; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold"
      style={{ background: yes ? 'rgba(52,211,153,0.12)' : 'rgba(248,113,113,0.1)', color: yes ? '#34d399' : '#f87171', border: `1px solid ${yes ? 'rgba(52,211,153,0.25)' : 'rgba(248,113,113,0.2)'}` }}>
      {yes ? '✓' : '✗'} {label}
    </span>
  )
}

function DrawdownBadge({ type }: { type: PropFirm['drawdownType'] }) {
  const map = { eod: { label: 'EOD', color: '#34d399' }, static: { label: 'Static', color: '#f59e0b' }, trailing: { label: 'Trailing', color: '#f87171' } }
  const { label, color } = map[type]
  return (
    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide"
      style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>
      {label}
    </span>
  )
}

function Podium({ selectedSize }: { selectedSize: number }) {
  const medals = [
    { rank: 1, cls: 'gold-text',   bg: 'rgba(255,215,0,0.08)',   border: 'rgba(255,215,0,0.25)',   shadow: 'rgba(255,215,0,0.12)',   crown: '👑', mdOrder: 2, delay: '0s'    },
    { rank: 2, cls: 'silver-text', bg: 'rgba(192,192,192,0.06)', border: 'rgba(192,192,192,0.18)', shadow: 'rgba(192,192,192,0.08)', crown: '🥈', mdOrder: 1, delay: '0.4s' },
    { rank: 3, cls: 'bronze-text', bg: 'rgba(205,127,50,0.07)',  border: 'rgba(205,127,50,0.2)',   shadow: 'rgba(205,127,50,0.08)', crown: '🥉', mdOrder: 3, delay: '0.8s' },
  ]
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
      {medals.map(({ rank, cls, bg, border, shadow, crown, mdOrder, delay }) => {
        const firm = TOP3[rank - 1]
        const plan = firm.accounts.find(a => a.size === selectedSize) ?? firm.accounts[Math.floor(firm.accounts.length / 2)]
        return (
          <div key={firm.id} className={`relative rounded-2xl p-6 text-center flex flex-col items-center`}
            style={{ background: bg, border: `1px solid ${border}`, boxShadow: `0 0 50px ${shadow}`, order: mdOrder, animation: `float 5s ease-in-out ${delay} infinite` }}>
            <div className="absolute top-0 inset-x-0 h-[1px] rounded-t-2xl"
              style={{ background: `linear-gradient(90deg,transparent,${border},transparent)` }} />
            <div className="text-[28px] mb-2">{crown}</div>
            <p className={`text-[10px] font-black tracking-[0.25em] uppercase mb-3 ${cls}`}>#{rank} Ranked</p>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 font-black text-[16px]"
              style={{ background: `${firm.color}20`, border: `2px solid ${firm.color}45`, color: firm.color }}>
              {firm.shortName[0]}
            </div>
            <p className="text-[16px] font-black text-white mb-1">{firm.name}</p>
            <div className="flex items-center gap-2 mb-5">
              <ScoreBadge score={firm.score!} size="lg" />
              <span className="text-[11px] text-slate-600 font-semibold">/ 100</span>
            </div>
            <div className="w-full space-y-2 text-left text-[12px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Price ({formatSize(plan.size)})</span>
                <span className="text-white font-bold">{formatPrice(plan.price)}/mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Profit Split</span>
                <span className="text-white font-bold">{firm.profitSplit}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Drawdown</span>
                <DrawdownBadge type={firm.drawdownType} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">News Trading</span>
                <Tag yes={firm.newsTrading} label={firm.newsTrading ? 'Allowed' : 'Blocked'} />
              </div>
            </div>
            {firm.hasPricePromos && (
              <div className="mt-3 w-full px-3 py-2 rounded-lg text-[10px] font-semibold text-amber-300 text-center"
                style={{ background: 'rgba(245,158,11,0.09)', border: '1px solid rgba(245,158,11,0.2)' }}>
                🔥 {firm.promoNote}
              </div>
            )}
            <a href={firm.website} target="_blank" rel="noopener noreferrer"
              className="mt-4 w-full py-2.5 rounded-xl text-[12px] font-bold text-center transition-all hover:opacity-80"
              style={{ background: `${firm.color}20`, border: `1px solid ${firm.color}35`, color: firm.color }}>
              Visit {firm.shortName} →
            </a>
          </div>
        )
      })}
    </div>
  )
}

function FirmRow({ firm, selectedSize, onSelect, isSelected }: {
  firm: PropFirm; selectedSize: number; onSelect: () => void; isSelected: boolean
}) {
  const plan = firm.accounts.find(a => a.size === selectedSize)
  return (
    <div onClick={onSelect} className="relative rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
      style={{ background: isSelected ? `${firm.color}0d` : 'rgba(7,7,14,0.98)', border: `1px solid ${isSelected ? firm.color + '35' : 'rgba(255,255,255,0.06)'}`, boxShadow: isSelected ? `0 0 25px ${firm.color}12` : 'none' }}>
      <div className="absolute top-0 inset-x-0 h-[2px] rounded-t-2xl"
        style={{ background: `linear-gradient(90deg,transparent,${firm.color}55,transparent)`, opacity: isSelected ? 1 : 0.3 }} />
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 w-14 h-14 rounded-xl flex flex-col items-center justify-center"
          style={{ background: `${firm.score! >= 80 ? '#34d399' : firm.score! >= 65 ? '#f59e0b' : '#f87171'}10`, border: `1px solid ${firm.score! >= 80 ? '#34d399' : firm.score! >= 65 ? '#f59e0b' : '#f87171'}25` }}>
          <ScoreBadge score={firm.score!} />
          <span className="text-[8px] text-slate-600 uppercase tracking-wider">score</span>
        </div>
        <div className="flex-shrink-0 min-w-[130px]">
          <p className="text-[14px] font-bold text-white">{firm.name}</p>
          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
            <DrawdownBadge type={firm.drawdownType} />
            {firm.liveAccount && <span className="px-1.5 py-0.5 rounded text-[9px] font-bold" style={{ background: 'rgba(52,211,153,0.1)', color: '#34d399', border: '1px solid rgba(52,211,153,0.2)' }}>LIVE</span>}
            {firm.hasPricePromos && <span className="px-1.5 py-0.5 rounded text-[9px] font-bold" style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)' }}>PROMOS</span>}
          </div>
        </div>
        <div className="hidden md:block flex-shrink-0 text-center min-w-[90px]">
          {plan ? <><p className="text-[17px] font-black text-white">{formatPrice(plan.price)}</p><p className="text-[10px] text-slate-600">/month</p></> : <p className="text-[12px] text-slate-600">—</p>}
        </div>
        <div className="hidden md:block flex-shrink-0 text-center min-w-[65px]">
          <p className="text-[17px] font-black" style={{ color: firm.color }}>{firm.profitSplit}%</p>
          <p className="text-[10px] text-slate-600">split</p>
        </div>
        <div className="hidden lg:flex flex-wrap gap-1.5 flex-1">
          <Tag yes={firm.newsTrading} label="News" />
          <Tag yes={firm.liveAccount} label="Live Acct" />
          <Tag yes={firm.drawdownType === 'eod'} label="EOD" />
          <Tag yes={firm.minTradingDays <= 7} label="≤7 Days" />
        </div>
        <div className="hidden md:block flex-shrink-0 text-center min-w-[60px]">
          <p className="text-[17px] font-black text-slate-300">{firm.minTradingDays}</p>
          <p className="text-[10px] text-slate-600">min days</p>
        </div>
        <div className="flex-shrink-0 ml-auto text-slate-600 text-[14px]">{isSelected ? '▲' : '▼'}</div>
      </div>

      {isSelected && (
        <div className="mt-5 pt-5 border-t border-slate-800/50 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-slate-500 mb-3">Account Plans</p>
            <div className="space-y-2">
              {firm.accounts.map(a => (
                <div key={a.size} className="flex items-center justify-between px-3 py-2 rounded-lg"
                  style={{ background: a.size === selectedSize ? `${firm.color}10` : 'rgba(255,255,255,0.03)', border: `1px solid ${a.size === selectedSize ? firm.color + '22' : 'rgba(255,255,255,0.05)'}` }}>
                  <span className="text-[13px] font-bold text-white">{formatSize(a.size)}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] text-slate-400">{formatPrice(a.price)}/mo</span>
                    <span className="text-[10px] text-slate-600">Reset: {formatPrice(a.resetPrice)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-slate-500 mb-3">Details</p>
            <div className="space-y-2.5">
              {[
                ['Max Drawdown', `${firm.maxDrawdown}%`],
                ['Daily Loss', firm.dailyLoss > 0 ? `${firm.dailyLoss}%` : 'None'],
                ['Payout Speed', firm.payoutSpeed],
                ['Payout Split', firm.payoutSplit],
                ['Instruments', firm.instruments.join(', ')],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 text-[12px]">
                  <span className="text-slate-500 flex-shrink-0">{k}</span>
                  <span className="text-slate-300 text-right">{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-1">
              {firm.highlights.map(h => (
                <p key={h} className="text-[12px] text-slate-400 flex items-start gap-2">
                  <span style={{ color: firm.color, flexShrink: 0 }}>▸</span>{h}
                </p>
              ))}
            </div>
          </div>
          {firm.hasPricePromos && firm.promoNote && (
            <div className="col-span-full px-4 py-3 rounded-xl text-[12px] text-amber-300"
              style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.18)' }}>
              🔥 <strong>Promo alert:</strong> {firm.promoNote}
            </div>
          )}
          <div className="col-span-full flex items-center justify-between flex-wrap gap-3">
            <p className="text-[10px] text-slate-700">Last verified: {firm.lastVerified} — confirm current prices on official site.</p>
            <a href={firm.website} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl font-bold text-[12px] transition-all hover:opacity-80"
              style={{ background: `${firm.color}18`, border: `1px solid ${firm.color}30`, color: firm.color }}>
              Visit {firm.name} →
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default function App() {
  const [selectedSize, setSelectedSize]    = useState(100000)
  const [sortBy, setSortBy]                = useState<'score' | 'price' | 'split' | 'days'>('score')
  const [filterNews, setFilterNews]        = useState(false)
  const [filterEOD,  setFilterEOD]         = useState(false)
  const [filterLive, setFilterLive]        = useState(false)
  const [expanded,   setExpanded]          = useState<string | null>(null)

  const sorted = useMemo(() => {
    let list = [...FIRMS]
    if (filterNews) list = list.filter(f => f.newsTrading)
    if (filterEOD)  list = list.filter(f => f.drawdownType === 'eod')
    if (filterLive) list = list.filter(f => f.liveAccount)
    list.sort((a, b) => {
      if (sortBy === 'score') return (b.score ?? 0) - (a.score ?? 0)
      if (sortBy === 'split') return b.profitSplit - a.profitSplit
      if (sortBy === 'days')  return a.minTradingDays - b.minTradingDays
      const pa = a.accounts.find(x => x.size === selectedSize)?.price ?? 9999
      const pb = b.accounts.find(x => x.size === selectedSize)?.price ?? 9999
      return pa - pb
    })
    return list
  }, [sortBy, filterNews, filterEOD, filterLive, selectedSize])

  return (
    <div className="min-h-screen bg-[#05050a] text-white overflow-x-hidden">

      {/* Nav */}
      <nav className="border-b border-slate-800/50 bg-[#05050a]/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl px-5 h-14 flex items-center justify-between" style={{ margin: '0 auto' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[13px]"
              style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)' }}>📊</div>
            <span className="text-[13px] font-black tracking-widest text-white">PROP COMPARE</span>
            <span className="hidden sm:block text-[10px] text-slate-700 font-bold tracking-[0.12em] uppercase ml-1">by Chronic Trading</span>
          </div>
          <span className="text-[11px] text-slate-600 font-semibold">{FIRMS.length} firms tracked</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-5 pt-20 pb-16 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(245,158,11,0.07), transparent 70%)' }} />
        <div className="relative" style={{ maxWidth: '680px', margin: '0 auto' }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/6 mb-6"
            style={{ boxShadow: '0 0 12px rgba(245,158,11,0.15)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" style={{ boxShadow: '0 0 6px #f59e0b' }} />
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-amber-400/80">
              Updated {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
          </div>
          <h1 className="font-black text-center mb-4" style={{ fontSize: 'clamp(36px,7vw,64px)', letterSpacing: '-2px', lineHeight: 0.9 }}>
            <span className="text-white">Find Your</span><br />
            <span style={{ background: 'linear-gradient(125deg,#fbbf24,#f59e0b 40%,#fde68a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Prop Firm.
            </span>
          </h1>
          <p className="text-slate-400 leading-relaxed text-center mb-10" style={{ fontSize: 'clamp(14px,2vw,17px)', maxWidth: '440px', margin: '0 auto 40px' }}>
            {FIRMS.length} futures prop firms scored and ranked for ICT and SMC traders. Real prices, real rules, zero fluff.
          </p>
          <div className="flex items-center justify-center gap-8 md:gap-14 flex-wrap">
            {[
              { val: `${FIRMS.length}`,                                     label: 'Firms Tracked'      },
              { val: `${FIRMS.filter(f => f.newsTrading).length}`,           label: 'Allow News Trading' },
              { val: `${FIRMS.filter(f => f.drawdownType === 'eod').length}`, label: 'EOD Drawdown'       },
              { val: `${FIRMS.filter(f => f.liveAccount).length}`,           label: 'Live Accounts'      },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="font-black text-white" style={{ fontSize: 'clamp(22px,4vw,32px)', fontFamily: "'JetBrains Mono',monospace", textShadow: '0 0 20px rgba(245,158,11,0.3)' }}>{s.val}</p>
                <p className="text-[10px] text-slate-600 uppercase tracking-[0.2em] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Podium */}
      <section className="px-5 pb-8">
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div className="text-center mb-8">
            <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-amber-500/60 mb-2">Top Ranked</p>
            <h2 className="font-black text-white text-center" style={{ fontSize: 'clamp(22px,3.5vw,34px)', letterSpacing: '-1px' }}>The Leaderboard</h2>
          </div>
          <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
            {[50000, 100000, 150000].map(s => (
              <button key={s} onClick={() => setSelectedSize(s)}
                className="px-4 py-1.5 rounded-xl text-[12px] font-bold transition-all"
                style={{ background: selectedSize === s ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.04)', border: `1px solid ${selectedSize === s ? 'rgba(245,158,11,0.4)' : 'rgba(255,255,255,0.07)'}`, color: selectedSize === s ? '#f59e0b' : '#64748b' }}>
                ${(s / 1000).toFixed(0)}K Account
              </button>
            ))}
          </div>
          <Podium selectedSize={selectedSize} />
        </div>
      </section>

      {/* Filters */}
      <section className="px-5 pb-4">
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div className="rounded-2xl p-4" style={{ background: 'rgba(7,7,14,0.98)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider whitespace-nowrap">Size</span>
                {ACCOUNT_SIZES.map(s => (
                  <button key={s} onClick={() => setSelectedSize(s)}
                    className="px-3 py-1 rounded-lg text-[11px] font-bold transition-all"
                    style={{ background: selectedSize === s ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.03)', border: `1px solid ${selectedSize === s ? 'rgba(245,158,11,0.35)' : 'rgba(255,255,255,0.06)'}`, color: selectedSize === s ? '#f59e0b' : '#64748b' }}>
                    {formatSize(s)}
                  </button>
                ))}
              </div>
              <div className="h-px md:h-7 w-full md:w-px bg-slate-800/60" />
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider whitespace-nowrap">Sort</span>
                {(['score', 'price', 'split', 'days'] as const).map(s => (
                  <button key={s} onClick={() => setSortBy(s)}
                    className="px-3 py-1 rounded-lg text-[11px] font-bold capitalize transition-all"
                    style={{ background: sortBy === s ? 'rgba(96,165,250,0.15)' : 'rgba(255,255,255,0.03)', border: `1px solid ${sortBy === s ? 'rgba(96,165,250,0.3)' : 'rgba(255,255,255,0.06)'}`, color: sortBy === s ? '#60a5fa' : '#64748b' }}>
                    {s === 'days' ? 'Min Days' : s}
                  </button>
                ))}
              </div>
              <div className="h-px md:h-7 w-full md:w-px bg-slate-800/60" />
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider whitespace-nowrap">Filter</span>
                {[
                  { label: 'News Trading', val: filterNews, set: setFilterNews },
                  { label: 'EOD Drawdown', val: filterEOD,  set: setFilterEOD  },
                  { label: 'Live Account', val: filterLive, set: setFilterLive },
                ].map(({ label, val, set }) => (
                  <button key={label} onClick={() => set(!val)}
                    className="px-3 py-1 rounded-lg text-[11px] font-bold transition-all"
                    style={{ background: val ? 'rgba(52,211,153,0.12)' : 'rgba(255,255,255,0.03)', border: `1px solid ${val ? 'rgba(52,211,153,0.28)' : 'rgba(255,255,255,0.06)'}`, color: val ? '#34d399' : '#64748b' }}>
                    {val ? '✓ ' : ''}{label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Firm list */}
      <section className="px-5 py-6">
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-[12px] text-slate-500 font-semibold">{sorted.length} firm{sorted.length !== 1 ? 's' : ''} — click to expand</p>
            <p className="text-[11px] text-slate-700">Priced at {formatSize(selectedSize)} account</p>
          </div>
          <div className="space-y-3">
            {sorted.map(firm => (
              <FirmRow key={firm.id} firm={firm} selectedSize={selectedSize}
                isSelected={expanded === firm.id}
                onSelect={() => setExpanded(expanded === firm.id ? null : firm.id)} />
            ))}
          </div>
        </div>
      </section>

      {/* Scoring breakdown */}
      <section className="px-5 py-20 border-t border-slate-800/30">
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div className="text-center mb-12">
            <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-amber-500/60 mb-2">Transparent</p>
            <h2 className="font-black text-white text-center" style={{ fontSize: 'clamp(20px,3vw,32px)', letterSpacing: '-1px' }}>How We Score</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: 'Value (Price vs Size)',  pts: 28, color: '#f59e0b', desc: 'Account size divided by monthly price. Lower cost per dollar of buying power scores highest.' },
              { label: 'Profit Split',           pts: 25, color: '#34d399', desc: '90% split = 25pts. Lower splits scale down proportionally. This directly affects your take-home.' },
              { label: 'Drawdown Type',          pts: 20, color: '#60a5fa', desc: 'EOD = 20pts (best). Static trailing = 14pts. Live trailing drawdown = 8pts (hardest to trade).' },
              { label: 'News Trading',           pts: 10, color: '#c084fc', desc: 'Firms that allow news trading during the funded phase score 10pts. Blocked = 0pts.' },
              { label: 'Live Account Pathway',   pts:  7, color: '#fb923c', desc: 'Firms that offer real live funded accounts score 7 bonus points for long-term value.' },
              { label: 'Payout Speed + Variety', pts: 10, color: '#f472b6', desc: 'Weekly/on-demand payouts score highest. Instrument count also adds up to 5 bonus points.' },
            ].map(c => (
              <div key={c.label} className="rounded-xl p-5 text-center flex flex-col items-center"
                style={{ background: 'rgba(7,7,14,0.98)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="font-black text-[28px] mb-1" style={{ color: c.color, textShadow: `0 0 20px ${c.color}40` }}>{c.pts}pts</p>
                <p className="text-[12px] font-bold text-white mb-2">{c.label}</p>
                <p className="text-[11px] text-slate-500 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-[11px] text-slate-700 mt-8 max-w-xl" style={{ margin: '32px auto 0' }}>
            Prices change frequently, especially during promotions. Always verify on the official site before purchasing. Last data review: {new Date().toLocaleDateString()}.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/30 px-5 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3" style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black tracking-widest text-slate-700 uppercase">Prop Compare</span>
            <span className="text-[10px] text-slate-800 mx-1">·</span>
            <span className="text-[10px] text-slate-800 tracking-[0.12em] uppercase">by Chronic Trading</span>
          </div>
          <p className="text-[11px] text-slate-800">Not financial advice. Verify all prices on official firm websites.</p>
        </div>
      </footer>
    </div>
  )
}
