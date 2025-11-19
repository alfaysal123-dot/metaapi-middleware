const express = require("express");
const MetaApi = require("metaapi.cloud-sdk").default;

const app = express();

// --------------------------------------------------
// REQUIRED FOR RENDER (Fix JSON & limits errors)
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
// HELPER: Calculate SL/TP from pips
// --------------------------------------------------
function calculatePrice(currentPrice, pips, direction, symbol) {
  // Determine pip value (0.0001 for most pairs, 0.01 for JPY pairs)
  const pipValue = symbol.includes('JPY') ? 0.01 : 0.0001;
  
  if (direction === 'sl_buy' || direction === 'tp_sell') {
    return currentPrice - (pips * pipValue);
  } else {
    return currentPrice + (pips * pipValue);
  }
}

// --------------------------------------------------
// ROOT
// --------------------------------------------------
app.get("/", (req, res) => {
  res.json({ 
    status: "✅ MetaAPI Trading Server Running",
    version: "2.0",
    endpoints: {
      "GET /account": "Get account info",
      "POST /price": "Get symbol price",
      "POST /order": "Open trade with SL/TP",
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
    res.json(price);
  } catch (error) {
    console.log("❌ /price error:", error);
    res.status(500).json({ error: error.toString() });
  }
});

// --------------------------------------------------
// ⭐ MAIN ORDER ENDPOINT (WITH SL/TP)
// --------------------------------------------------
app.post("/order", async (req, res) => {
  console.log("📩 Incoming Order Body:", JSON.stringify(req.body, null, 2));

  try {
    const { symbol, side, lot, sl, tp, slPips, tpPips, comment } = req.body;

    // Validation
    if (!symbol || !side || !lot) {
      console.log("❌ Missing required params");
      return res.status(400).json({ 
        error: "Required: symbol, side, lot",
        received: req.body
      });
    }

    const conn = await getConnection();
    const volume = Number(lot);

    // Get current price
    const priceData = await conn.getSymbolPrice(symbol);
    const currentPrice = side.toUpperCase() === "BUY" ? priceData.ask : priceData.bid;
    
    console.log(`💰 Current Price for ${symbol}: ${currentPrice}`);

    // Calculate SL/TP
    let stopLoss = null;
    let takeProfit = null;

    // Option 1: Using exact prices
    if (sl) {
      stopLoss = Number(sl);
      console.log(`🛑 SL from exact price: ${stopLoss}`);
    }
    if (tp) {
      takeProfit = Number(tp);
      console.log(`🎯 TP from exact price: ${takeProfit}`);
    }

    // Option 2: Using pips (overrides exact prices if provided)
    if (slPips) {
      const direction = side.toUpperCase() === "BUY" ? 'sl_buy' : 'sl_sell';
      stopLoss = calculatePrice(currentPrice, Number(slPips), direction, symbol);
      console.log(`🛑 SL calculated from ${slPips} pips: ${stopLoss}`);
    }
    if (tpPips) {
      const direction = side.toUpperCase() === "BUY" ? 'tp_buy' : 'tp_sell';
      takeProfit = calculatePrice(currentPrice, Number(tpPips), direction, symbol);
      console.log(`🎯 TP calculated from ${tpPips} pips: ${takeProfit}`);
    }

    // Round to proper decimal places
    if (stopLoss) stopLoss = Number(stopLoss.toFixed(5));
    if (takeProfit) takeProfit = Number(takeProfit.toFixed(5));

    console.log(`📊 Final Values - SL: ${stopLoss}, TP: ${takeProfit}`);

    // Execute order with SL/TP directly
    let result;
    const orderOptions = {
      comment: comment || "n8n-auto"
    };

    console.log(`🚀 Creating ${side.toUpperCase()} order...`);

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

    console.log("✅ Order Result:", JSON.stringify(result, null, 2));

    // Return success with all details
    res.json({
      success: true,
      message: "Order executed with SL/TP",
      order: {
        orderId: result.orderId,
        positionId: result.positionId,
        symbol: symbol,
        side: side.toUpperCase(),
        volume: volume,
        openPrice: currentPrice,
        stopLoss: stopLoss,
        takeProfit: takeProfit,
        comment: comment || "n8n-auto"
      },
      rawResult: result
    });

  } catch (err) {
    console.log("❌ /order error:", err.toString());
    console.log("❌ Full error:", err);
    res.status(500).json({ 
      success: false,
      error: err.toString(),
      message: err.message,
      details: err
    });
  }
});

// --------------------------------------------------
// CLOSE POSITION
// --------------------------------------------------
app.post("/close", async (req, res) => {
  console.log("📩 Close Position Body:", req.body);

  try {
    const { positionId } = req.body;

    if (!positionId) {
      return res.status(400).json({ 
        error: "positionId is required" 
      });
    }

    const conn = await getConnection();
    const result = await conn.closePosition(positionId);

    console.log("✅ Position closed:", result);

    res.json({
      success: true,
      message: "Position closed successfully",
      result: result
    });

  } catch (err) {
    console.log("❌ /close error:", err);
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
  console.log(`🚀 MetaApi Server v2.0 running on port ${PORT}`);
  console.log(`📡 Ready to receive orders with SL/TP`);
});
