const express = require("express");
const MetaApi = require("metaapi.cloud-sdk").default;

const app = express();

// --------------------------------------------------
// REQUIRED FOR RENDER (Fix JSON & limits errors)
// --------------------------------------------------
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));
// --------------------------------------------------
// 🔐 ضع التوكن الخاص بك
// --------------------------------------------------
const token = "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI5MWJiYTE1YTJiZGJkYTU0N2U1OGRiMjEyMGNjZjNmMSIsImFjY2Vzc1J1bGVzIjpbeyJpZCI6InRyYWRpbmctYWNjb3VudC1tYW5hZ2VtZW50LWFwaSIsIm1ldGhvZHMiOlsidHJhZGluZy1hY2NvdW50LW1hbmFnZW1lbnQtYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbImFjY291bnQ6JFVTRVJfSUQkOjg2ZTQ0NjhmLWE1N2QtNDg5ZS1hMjJhLWRiNjZjZDcwYTNjYiJdfSx7ImlkIjoibWV0YWFwaS1yZXN0LWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiYWNjb3VudDokVVNFUl9JRCQ6ODZlNDQ2OGYtYTU3ZC00ODllLWEyMmEtZGI2NmNkNzBhM2NiIl19LHsiaWQiOiJtZXRhYXBpLXJwYy1hcGkiLCJtZXRob2RzIjpbIm1ldGFhcGktYXBpOndzOnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyJhY2NvdW50OiRVU0VSX0lEJDo4NmU0NDY4Zi1hNTdkLTQ4OWUtYTIyYS1kYjY2Y2Q3MGEzY2IiXX0seyJpZCI6Im1ldGFhcGktcmVhbC10aW1lLXN0cmVhbWluZy1hcGkiLCJtZXRob2RzIjpbIm1ldGFhcGktYXBpOndzOnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyJhY2NvdW50OiRVU0VSX0lEJDo4NmU0NDY4Zi1hNTdkLTQ4OWUtYTIyYS1kYjY2Y2Q3MGEzY2IiXX0seyJpZCI6Im1ldGFzdGF0cy1hcGkiLCJtZXRob2RzIjpbIm1ldGFzdGF0cy1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciJdLCJyZXNvdXJjZXMiOlsiYWNjb3VudDokVVNFUl9JRCQ6ODZlNDQ2OGYtYTU3ZC00ODllLWEyMmEtZGI2NmNkNzBhM2NiIl19LHsiaWQiOiJyaXNrLW1hbmFnZW1lbnQtYXBpIiwibWV0aG9kcyI6WyJyaXNrLW1hbmFnZW1lbnQtYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiXSwicmVzb3VyY2VzIjpbImFjY291bnQ6JFVTRVJfSUQkOjg2ZTQ0NjhmLWE1N2QtNDg5ZS1hMjJhLWRiNjZjZDcwYTNjYiJdfV0sImlnbm9yZVJhdGVMaW1pdHMiOmZhbHNlLCJ0b2tlbklkIjoiMjAyMTAyMTMiLCJpbXBlcnNvbmF0ZWQiOmZhbHNlLCJyZWFsVXNlcklkIjoiOTFiYmExNWEyYmRiZGE1NDdlNThkYjIxMjBjY2YzZjEiLCJpYXQiOjE3NjM1MDkzMDN9.BaQ2S72kw58n4H9--eRkSDmPugxHG4HNCHnXzgVEGHkeNgQZh1psWjxbfRIrqLT0pH7yCcp4WnAfmEP7ffFn9CAgLDRTKhi1QnehZFIl1X3RoGrvpTEKEOmh2x7BCpHShDWQJJrD20quYhkLCpEuLOz9QXwUp2uT4ohVT-UDvJvbPnURR5oHkCsen_r2pRhAXzdKCkl2fqTxebwAm3fVYtV-D0oFLNRiQi4xWPxBQi37CKVrXyUzlCKg4hOT_V_uSDvIp6qhzAnBomnSb8D52hMt9Za7CoY2MWwHGsF0nHOKYFLdOVaZkctcYVx2RpLSzFsx4cRQvVY5zcpPkgmnGMgQuF9b1CsRJXHwTYP5JIoya-u_U8nnBLbDgpoWB5wd-GSbbH1cCgWCw-l3Y2oxpuokqgh8Ut4XW2ki-DT1F1_9nisQM9p_f8hj2G1ZBxREqv1wnaxMm0wzpTSP_UmtQyl3LNFA-TeNRFnzFAF6rKGC6uDUTHOthXWDDBxHkxYsmIsXBDYrHY8kae6W82eUFg_Bw_5ii-fc5xcSIY99NtD9gAp8R69CfGIBvll6x3Ke62LhZAPg2Tjbnu099qFypGn3_Prsbvc0W-36GEvwChsiTGVCNEhMD0F1cduy5gl7uZhO-2EoYt-PzMBwLg209oxWvZXPZu8F9daJGzaX2mE";
const accountId = "86e4468f-a57d-489e-a22a-db66cd70a3cb";

// --------------------------------------------------
// Initialize MetaApi
// --------------------------------------------------
const api = new MetaApi(token);

// --------------------------------------------------
// CONNECT FUNCTION
// --------------------------------------------------
async function getConnection() {
  console.log("\n\n============== NEW REQUEST ==============");
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
// Helper: Calculate price from pips
// --------------------------------------------------
function calcPrice(price, pips, direction, symbol) {
  const pipValue = symbol.includes("JPY") ? 0.01 : 0.0001;
  return direction === "minus"
    ? price - pips * pipValue
    : price + pips * pipValue;
}

// --------------------------------------------------
// ROOT
// --------------------------------------------------
app.get("/", (req, res) => {
  res.json({
    status: "MetaApi Server v3.0 Running",
    endpoints: {
      "POST /order": "Open trade with SL/TP",
      "GET /positions": "List open positions",
      "POST /close": "Close trade",
      "POST /price": "Get price"
    }
  });
});

// --------------------------------------------------
// 🟦 ORDER ENDPOINT
// --------------------------------------------------
app.post("/order", async (req, res) => {
  console.log("📩 Incoming Order Body:", JSON.stringify(req.body, null, 2));

  try {
    const { symbol, side, lot, sl, tp, slPips, tpPips, comment } = req.body;

    if (!symbol || !side || !lot) {
      return res.status(400).json({
        success: false,
        error: "Missing fields: symbol, side, lot are required!"
      });
    }

    const conn = await getConnection();
    const volume = Number(lot);

    // Fetch price
    const priceData = await conn.getSymbolPrice(symbol);
    const currentPrice =
      side.toUpperCase() === "BUY" ? priceData.ask : priceData.bid;

    console.log(`💰 Current Price for ${symbol}: ${currentPrice}`);

    // SL & TP final variables
    let stopLoss = null;
    let takeProfit = null;

    // Direct SL/TP
    if (sl) stopLoss = Number(sl);
    if (tp) takeProfit = Number(tp);

    // Pips-based SL/TP
    if (slPips) {
      stopLoss =
        side.toUpperCase() === "BUY"
          ? calcPrice(currentPrice, slPips, "minus", symbol)
          : calcPrice(currentPrice, slPips, "plus", symbol);
    }
    if (tpPips) {
      takeProfit =
        side.toUpperCase() === "BUY"
          ? calcPrice(currentPrice, tpPips, "plus", symbol)
          : calcPrice(currentPrice, tpPips, "minus", symbol);
    }

    if (stopLoss) stopLoss = Number(stopLoss.toFixed(5));
    if (takeProfit) takeProfit = Number(takeProfit.toFixed(5));

    console.log(`📊 Final SL: ${stopLoss}`);
    console.log(`📊 Final TP: ${takeProfit}`);

    // --------------------------------------------------
    // STEP 1 — Open Market Order WITHOUT SL/TP
    // --------------------------------------------------
    let order;

    console.log(`🚀 Opening ${side.toUpperCase()} order...`);

    if (side.toUpperCase() === "BUY") {
      order = await conn.createMarketBuyOrder(symbol, volume, {
        comment
      });
    } else {
      order = await conn.createMarketSellOrder(symbol, volume, {
        comment
      });
    }

    console.log("📌 Order Response:", order);

    if (!order.positionId) {
      throw new Error("❌ No positionId returned from MetaApi – cannot modify SL/TP!");
    }

    // --------------------------------------------------
    // STEP 2 — Wait 1 sec then modify SL/TP
    // --------------------------------------------------
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("🛠️ Applying SL/TP to position:", order.positionId);

    const modifyResult = await conn.modifyPosition(order.positionId, {
      stopLoss: stopLoss || undefined,
      takeProfit: takeProfit || undefined
    });

    console.log("🔧 Modify Result:", modifyResult);

    return res.json({
      success: true,
      message: "Trade executed successfully with SL/TP",
      symbol,
      side,
      lot,
      stopLoss,
      takeProfit,
      positionId: order.positionId,
      orderMeta: order,
      modify: modifyResult
    });

  } catch (err) {
    console.log("❌ ERROR:", err);

    return res.status(500).json({
      success: false,
      error: err.toString()
    });
  }
});

// --------------------------------------------------
// POSITIONS
// --------------------------------------------------
app.get("/positions", async (req, res) => {
  try {
    const conn = await getConnection();
    const positions = await conn.getPositions();

    res.json({
      count: positions.length,
      positions
    });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

// --------------------------------------------------
// CLOSE POSITION
// --------------------------------------------------
app.post("/close", async (req, res) => {
  try {
    const { positionId } = req.body;

    if (!positionId) {
      return res.status(400).json({ error: "positionId is required!" });
    }

    const conn = await getConnection();
    const result = await conn.closePosition(positionId);

    res.json({
      success: true,
      result
    });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

// --------------------------------------------------
// START SERVER
// --------------------------------------------------
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 MetaApi Server v3.0 running on port ${PORT}`);
});

