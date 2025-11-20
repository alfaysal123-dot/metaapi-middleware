const express = require("express");
const MetaApi = require("metaapi.cloud-sdk").default;

const app = express();

// --------------------------------------------------
// REQUIRED FOR RENDER
// --------------------------------------------------
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

// --------------------------------------------------
// 🔐 Credentials
// --------------------------------------------------
const token = "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI5MWJiYTE1YTJiZGJkYTU0N2U1OGRiMjEyMGNjZjNmMSIsImFjY2Vzc1J1bGVzIjpbeyJpZCI6InRyYWRpbmctYWNjb3VudC1tYW5hZ2VtZW50LWFwaSIsIm1ldGhvZHMiOlsidHJhZGluZy1hY2NvdW50LW1hbmFnZW1lbnQtYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbImFjY291bnQ6JFVTRVJfSUQkOjg2ZTQ0NjhmLWE1N2QtNDg5ZS1hMjJhLWRiNjZjZDcwYTNjYiJdfSx7ImlkIjoibWV0YWFwaS1yZXN0LWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiYWNjb3VudDokVVNFUl9JRCQ6ODZlNDQ2OGYtYTU3ZC00ODllLWEyMmEtZGI2NmNkNzBhM2NiIl19LHsiaWQiOiJtZXRhYXBpLXJwYy1hcGkiLCJtZXRob2RzIjpbIm1ldGFhcGktYXBpOndzOnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyJhY2NvdW50OiRVU0VSX0lEJDo4NmU0NDY4Zi1hNTdkLTQ4OWUtYTIyYS1kYjY2Y2Q3MGEzY2IiXX0seyJpZCI6Im1ldGFhcGktcmVhbC10aW1lLXN0cmVhbWluZy1hcGkiLCJtZXRob2RzIjpbIm1ldGFhcGktYXBpOndzOnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyJhY2NvdW50OiRVU0VSX0lEJDo4NmU0NDY4Zi1hNTdkLTQ4OWUtYTIyYS1kYjY2Y2Q3MGEzY2IiXX0seyJpZCI6Im1ldGFzdGF0cy1hcGkiLCJtZXRob2RzIjpbIm1ldGFzdGF0cy1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciJdLCJyZXNvdXJjZXMiOlsiYWNjb3VudDokVVNFUl9JRCQ6ODZlNDQ2OGYtYTU3ZC00ODllLWEyMmEtZGI2NmNkNzBhM2NiIl19LHsiaWQiOiJyaXNrLW1hbmFnZW1lbnQtYXBpIiwibWV0aG9kcyI6WyJyaXNrLW1hbmFnZW1lbnQtYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiXSwicmVzb3VyY2VzIjpbImFjY291bnQ6JFVTRVJfSUQkOjg2ZTQ0NjhmLWE1N2QtNDg5ZS1hMjJhLWRiNjZjZDcwYTNjYiJdfV0sImlnbm9yZVJhdGVMaW1pdHMiOmZhbHNlLCJ0b2tlbklkIjoiMjAyMTAyMTMiLCJpbXBlcnNvbmF0ZWQiOmZhbHNlLCJyZWFsVXNlcklkIjoiOTFiYmExNWEyYmRiZGE1NDdlNThkYjIxMjBjY2YzZjEiLCJpYXQiOjE3NjM1MDkzMDN9.BaQ2S72kw58n4H9--eRkSDmPugxHG4HNCHnXzgVEGHkeNgQZh1psWjxbfRIrqLT0pH7yCcp4WnAfmEP7ffFn9CAgLDRTKhi1QnehZFIl1X3RoGrvpTEKEOmh2x7BCpHShDWQJJrD20quYhkLCpEuLOz9QXwUp2uT4ohVT-UDvJvbPnURR5oHkCsen_r2pRhAXzdKCkl2fqTxebwAm3fVYtV-D0oFLNRiQi4xWPxBQi37CKVrXyUzlCKg4hOT_V_uSDvIp6qhzAnBomnSb8D52hMt9Za7CoY2MWwHGsF0nHOKYFLdOVaZkctcYVx2RpLSzFsx4cRQvVY5zcpPkgmnGMgQuF9b1CsRJXHwTYP5JIoya-u_U8nnBLbDgpoWB5wd-GSbbH1cCgWCw-l3Y2oxpuokqgh8Ut4XW2ki-DT1F1_9nisQM9p_f8hj2G1ZBxREqv1wnaxMm0wzpTSP_UmtQyl3LNFA-TeNRFnzFAF6rKGC6uDUTHOthXWDDBxHkxYsmIsXBDYrHY8kae6W82eUFg_Bw_5ii-fc5xcSIY99NtD9gAp8R69CfGIBvll6x3Ke62LhZAPg2Tjbnu099qFypGn3_Prsbvc0W-36GEvwChsiTGVCNEhMD0F1cduy5gl7uZhO-2EoYt-PzMBwLg209oxWvZXPZu8F9daJGzaX2mE";
const accountId = "86e4468f-a57d-489e-a22a-db66cd70a3cb";

// --------------------------------------------------
// MetaApi SDK
// --------------------------------------------------
const api = new MetaApi(token);

// --------------------------------------------------
// CONNECT FUNCTION
// --------------------------------------------------
async function getConnection() {
  console.log("🔌 Connecting to MetaApi ...");
  const account = await api.metatraderAccountApi.getAccount(accountId);
  await account.reload();
  const conn = account.getRPCConnection();
  await conn.connect();
  await conn.waitSynchronized();
  console.log("✅ Connected & Synchronized");
  return conn;
}

// --------------------------------------------------
// 🧠 SMART PIP VALUE CALCULATOR - يدعم كل الأزواج
// --------------------------------------------------
function getPipValue(symbol) {
  const sym = symbol.toUpperCase();
  
  // 🥇 Gold & Silver (المعادن)
  if (sym.includes('XAU')) {
    return { pip: 0.10, decimals: 2, name: 'Gold' };
  }
  if (sym.includes('XAG')) {
    return { pip: 0.01, decimals: 3, name: 'Silver' };
  }
  
  // 🛢️ Oil (النفط)
  if (sym.includes('OIL') || sym.includes('WTI') || sym.includes('BRENT')) {
    return { pip: 0.01, decimals: 2, name: 'Oil' };
  }
  
  // 💎 Indices (المؤشرات)
  if (sym.includes('US30') || sym.includes('DOW')) {
    return { pip: 1.0, decimals: 0, name: 'US30' };
  }
  if (sym.includes('NAS100') || sym.includes('NDX')) {
    return { pip: 1.0, decimals: 0, name: 'NAS100' };
  }
  if (sym.includes('SPX') || sym.includes('US500')) {
    return { pip: 0.1, decimals: 1, name: 'S&P500' };
  }
  if (sym.includes('GER') || sym.includes('DAX')) {
    return { pip: 1.0, decimals: 0, name: 'DAX' };
  }
  
  // ₿ Crypto (العملات الرقمية)
  if (sym.includes('BTC')) {
    return { pip: 1.0, decimals: 2, name: 'Bitcoin' };
  }
  if (sym.includes('ETH')) {
    return { pip: 0.1, decimals: 2, name: 'Ethereum' };
  }
  
  // 🇯🇵 JPY Pairs (أزواج الين)
  if (sym.includes('JPY')) {
    return { pip: 0.01, decimals: 3, name: 'JPY Pair' };
  }
  
  // 💱 Regular Forex (العملات العادية)
  // EUR/USD, GBP/USD, AUD/USD, etc.
  return { pip: 0.0001, decimals: 5, name: 'Forex' };
}

// --------------------------------------------------
// 📊 CALCULATE PRICE FROM PIPS
// --------------------------------------------------
function calculatePriceFromPips(currentPrice, pips, direction, symbol) {
  const config = getPipValue(symbol);
  const priceChange = pips * config.pip;
  
  console.log(`📐 Symbol: ${symbol} (${config.name})`);
  console.log(`   Pip Value: ${config.pip}`);
  console.log(`   Pips: ${pips}`);
  console.log(`   Price Change: ${priceChange}`);
  
  let finalPrice;
  if (direction === 'subtract') {
    finalPrice = currentPrice - priceChange;
  } else {
    finalPrice = currentPrice + priceChange;
  }
  
  return Number(finalPrice.toFixed(config.decimals));
}

// --------------------------------------------------
// ROOT
// --------------------------------------------------
app.get("/", (req, res) => {
  res.json({ 
    status: "✅ Universal MetaAPI Trading Server",
    version: "3.0 - All Symbols Supported",
    supported: {
      forex: "EUR/USD, GBP/USD, USD/JPY, etc.",
      metals: "XAU/USD (Gold), XAG/USD (Silver)",
      indices: "US30, NAS100, SPX500, DAX",
      oil: "WTI, Brent",
      crypto: "BTC/USD, ETH/USD"
    },
    endpoints: {
      "GET /account": "Get account info",
      "POST /price": "Get symbol price",
      "POST /order": "Open trade - supports (sl/tp) OR (slPips/tpPips)",
      "GET /positions": "Get open positions",
      "POST /close": "Close position"
    }
  });
});

// --------------------------------------------------
// ACCOUNT INFO
// --------------------------------------------------
app.get("/account", async (req, res) => {
  try {
    const conn = await getConnection();
    const info = await conn.getAccountInformation();
    res.json(info);
  } catch (error) {
    console.log("❌ /account error:", error);
    res.status(500).json({ error: error.toString() });
  }
});

// --------------------------------------------------
// GET POSITIONS
// --------------------------------------------------
app.get("/positions", async (req, res) => {
  try {
    const conn = await getConnection();
    const positions = await conn.getPositions();
    res.json({ 
      count: positions.length,
      positions: positions 
    });
  } catch (error) {
    console.log("❌ /positions error:", error);
    res.status(500).json({ error: error.toString() });
  }
});

// --------------------------------------------------
// PRICE
// --------------------------------------------------
app.post("/price", async (req, res) => {
  console.log("📩 Incoming Body (PRICE):", req.body);
  try {
    const symbol = req.body.symbol || "EURUSD";
    const conn = await getConnection();
    const price = await conn.getSymbolPrice(symbol);
    
    // Add pip info
    const config = getPipValue(symbol);
    res.json({
      ...price,
      pipValue: config.pip,
      type: config.name
    });
  } catch (error) {
    console.log("❌ /price error:", error);
    res.status(500).json({ error: error.toString() });
  }
});

// --------------------------------------------------
// ⭐ UNIVERSAL ORDER ENDPOINT - يدعم كل الأزواج
// --------------------------------------------------
app.post("/order", async (req, res) => {
  console.log("📩 Incoming Order:", JSON.stringify(req.body, null, 2));

  try {
    const { symbol, side, lot, sl, tp, slPips, tpPips, comment } = req.body;

    // Validation
    if (!symbol || !side || !lot) {
      return res.status(400).json({ 
        error: "Required fields: symbol, side, lot",
        example: {
          symbol: "EURUSD",
          side: "BUY",
          lot: 0.01,
          slPips: 20,
          tpPips: 40
        }
      });
    }

    const conn = await getConnection();
    const volume = Number(lot);

    // Get current price
    const priceData = await conn.getSymbolPrice(symbol);
    const currentPrice = side.toUpperCase() === "BUY" ? priceData.ask : priceData.bid;
    
    console.log(`💰 Current Price for ${symbol}: ${currentPrice}`);

    // Get symbol configuration
    const config = getPipValue(symbol);
    console.log(`🎯 Detected: ${config.name} (pip = ${config.pip})`);

    // Calculate SL/TP
    let stopLoss = null;
    let takeProfit = null;

    // Priority 1: Direct prices (إذا أرسلت سعر مباشر)
    if (sl !== undefined && sl !== null) {
      stopLoss = Number(sl);
      console.log(`🛑 SL from direct price: ${stopLoss}`);
    }
    if (tp !== undefined && tp !== null) {
      takeProfit = Number(tp);
      console.log(`🎯 TP from direct price: ${takeProfit}`);
    }

    // Priority 2: Calculate from pips (إذا أرسلت بالبيبس)
    if (slPips !== undefined && slPips !== null) {
      const direction = side.toUpperCase() === "BUY" ? 'subtract' : 'add';
      stopLoss = calculatePriceFromPips(currentPrice, Number(slPips), direction, symbol);
      console.log(`🛑 SL calculated from ${slPips} pips: ${stopLoss}`);
    }
    
    if (tpPips !== undefined && tpPips !== null) {
      const direction = side.toUpperCase() === "BUY" ? 'add' : 'subtract';
      takeProfit = calculatePriceFromPips(currentPrice, Number(tpPips), direction, symbol);
      console.log(`🎯 TP calculated from ${tpPips} pips: ${takeProfit}`);
    }

    console.log(`📊 Final SL: ${stopLoss}, TP: ${takeProfit}`);

    // Execute order
    let result;
    const orderOptions = { comment: comment || "n8n-auto" };

    console.log(`🚀 Executing ${side.toUpperCase()} order...`);

    if (side.toUpperCase() === "BUY") {
      result = await conn.createMarketBuyOrder(
        symbol, 
        volume, 
        stopLoss,
        takeProfit,
        orderOptions
      );
    } else {
      result = await conn.createMarketSellOrder(
        symbol, 
        volume, 
        stopLoss,
        takeProfit,
        orderOptions
      );
    }

    console.log("✅ Order Executed Successfully!");

    // Success response
    res.json({
      success: true,
      message: `${config.name} order executed with SL/TP`,
      order: {
        orderId: result.orderId,
        positionId: result.positionId,
        symbol: symbol,
        symbolType: config.name,
        side: side.toUpperCase(),
        volume: volume,
        openPrice: currentPrice,
        stopLoss: stopLoss,
        takeProfit: takeProfit,
        pipValue: config.pip,
        comment: comment || "n8n-auto"
      },
      raw: result
    });

  } catch (err) {
    console.log("❌ Order Error:", err.toString());
    res.status(500).json({ 
      success: false,
      error: err.message || err.toString(),
      details: err
    });
  }
});

// --------------------------------------------------
// CLOSE POSITION
// --------------------------------------------------
app.post("/close", async (req, res) => {
  console.log("📩 Close Request:", req.body);

  try {
    const { positionId } = req.body;

    if (!positionId) {
      return res.status(400).json({ 
        error: "positionId is required" 
      });
    }

    const conn = await getConnection();
    const result = await conn.closePosition(positionId);

    console.log("✅ Position Closed");

    res.json({
      success: true,
      message: "Position closed successfully",
      result: result
    });

  } catch (err) {
    console.log("❌ Close Error:", err);
    res.status(500).json({ 
      success: false,
      error: err.toString() 
    });
  }
});

// --------------------------------------------------
// START SERVER
// --------------------------------------------------
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Universal Trading Server v3.0 running on port ${PORT}`);
  console.log(`📡 Supports: Forex, Metals, Indices, Oil, Crypto`);
  console.log(`🎯 Smart pip calculation for all symbols`);
});
