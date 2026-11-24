// EDIT ME: everything on the Our Fund page (stats, lists, donut chart, holdings) is drawn from this object.
window.FUND = {
  number: "Fund 1",
  name: "Locust Partners Equity Fund",
  aum: "$75K",
  strategy: "Long Only Equity",
  managers: ["Rasmus Suonio", "Ethan Wind", "David Brătucu"],
  // Outer ring. pct values should add up to 100.
  sectors: [
    { name: "Technology", pct: 45, color: "#0a2166" },
    { name: "Retail", pct: 45, color: "#4fa9ea" },
    { name: "Health Care", pct: 10, color: "#8f3a2a" }
  ],
  // Inner ring. "sector" must match a sector name above.
  positions: [
    { ticker: "MSFT", name: "Microsoft", sector: "Technology", pct: 11 },
    { ticker: "GOOGL", name: "Alphabet", sector: "Technology", pct: 10 },
    { ticker: "AMZN", name: "Amazon", sector: "Technology", pct: 8 },
    { ticker: "TTWO", name: "Take-Two Interactive", sector: "Technology", pct: 8 },
    { ticker: "RPI", name: "Raspberry Pi Holdings", sector: "Technology", pct: 5 },
    { ticker: "AAPL", name: "Apple", sector: "Technology", pct: 3 },
    { ticker: "KO", name: "Coca-Cola", sector: "Retail", pct: 15 },
    { ticker: "WMT", name: "Walmart", sector: "Retail", pct: 12 },
    { ticker: "COST", name: "Costco", sector: "Retail", pct: 10 },
    { ticker: "MCD", name: "McDonald's", sector: "Retail", pct: 8 },
    { ticker: "UNH", name: "UnitedHealth Group", sector: "Health Care", pct: 6 },
    { ticker: "JNJ", name: "Johnson & Johnson", sector: "Health Care", pct: 4 }
  ]
};
