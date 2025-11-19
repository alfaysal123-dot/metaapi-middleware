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
// MetaApi SDK
// --------------------------------------------------
const api = new MetaApi(token);

// --------------------------------------------------
// 🔌 Connect to Cloud-G2
// --------------------------------------------------
async function getConnection() {
  const account = await api.metatraderAccountApi.getAccount(accountId);
  await account.reload();

  const conn = account.getRPCConnection();
  await conn.connect();
  await conn.waitSynchronized();

  return conn;
}

// ==================================================
// =============== ROUTES ============================
// ==================================================

// ---- ACCOUNT INFO ----
app.get("/account", async (req, res) => {
  try {
    const conn = await getConnection();
    const info = await conn.getAccountInformation();
    res.json(info);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// ---- PRICE ----
app.post("/price", async (req, res) => {
  try {
    const symbol = req.body.symbol || "EURUSD";
    const conn = await getConnection();
    const price = await conn.getSymbolPrice(symbol);
    res.json(price);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// ---- BUY ----
app.post("/buy", async (req, res) => {
  try {
    const { symbol = "EURUSD", volume = 0.1 } = req.body;
    const conn = await getConnection();
    const result = await conn.createMarketBuyOrder(symbol, volume);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// ---- SELL ----
app.post("/sell", async (req, res) => {
  try {
    const { symbol = "EURUSD", volume = 0.1 } = req.body;
    const conn = await getConnection();
    const result = await conn.createMarketSellOrder(symbol, volume);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// --------------------------------------------------
// ⭐ NEW: /order  (BUY/SELL with SL & TP)
// --------------------------------------------------
app.post("/order", async (req, res) => {
  try {
    const { symbol, side, lot, sl, tp, comment } = req.body;

    if (!symbol || !side || !lot) {
      return res.status(400).json({ error: "Missing symbol/side/lot" });
    }

    const conn = await getConnection();
    let result;

    // تأكد أن SL/TP أرقام صحيحة
    const stopLoss = sl ? Number(sl) : undefined;
    const takeProfit = tp ? Number(tp) : undefined;

    const orderOptions = {
      stopLoss: stopLoss,
      takeProfit: takeProfit,
      comment: comment || "n8n-auto"
    };

    if (side.toUpperCase() === "BUY") {
      result = await conn.createMarketBuyOrder(symbol, Number(lot), orderOptions);
    } else if (side.toUpperCase() === "SELL") {
      result = await conn.createMarketSellOrder(symbol, Number(lot), orderOptions);
    } else {
      return res.status(400).json({ error: "Invalid side, must be BUY or SELL" });
    }

    res.json({ status: "success", order: result });

  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});


// --------------------------------------------------
// SERVER START
// --------------------------------------------------
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("MetaApi middleware running on port " + PORT);

});
