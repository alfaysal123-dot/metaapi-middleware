const express = require("express");
const MetaApi = require("metaapi.cloud-sdk").default;

const app = express();
app.use(express.json());

// --------------------------------------------------
// 🔐 ضع التوكن الخاص بك
// --------------------------------------------------
const token = "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI5MWJiYTE1YTJiZGJkYTU0N2U1OGRiMjEyMGNjZjNmMSIsImFjY2Vzc1J1bGVzIjpbeyJpZCI6InRyYWRpbmctYWNjb3VudC1tYW5hZ2VtZW50LWFwaSIsIm1ldGhvZHMiOlsidHJhZGluZy1hY2NvdW50LW1hbmFnZW1lbnQtYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiXSwicmVzb3VyY2VzIjpbImFjY291bnQ6JFVTRVJfSUQkOjg2ZTQ0NjhmLWE1N2QtNDg5ZS1hMjJhLWRiNjZjZDcwYTNjYiJdfSx7ImlkIjoibWV0YWFwaS1yZXN0LWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiYWNjb3VudDokVVNFUl9JRCQ6ODZlNDQ2OGYtYTU3ZC00ODllLWEyMmEtZGI2NmNkNzBhM2NiIl19LHsiaWQiOiJtZXRhYXBpLXJwYy1hcGkiLCJtZXRob2RzIjpbIm1ldGFhcGktYXBpOndzOnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyJhY2NvdW50OiRVU0VSX0lEJDo4NmU0NDY4Zi1hNTdkLTQ4OWUtYTIyYS1kYjY2Y2Q3MGEzY2IiXX0seyJpZCI6Im1ldGFhcGktcmVhbC10aW1lLXN0cmVhbWluZy1hcGkiLCJtZXRob2RzIjpbIm1ldGFhcGktYXBpOndzOnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyJhY2NvdW50OiRVU0VSX0lEJDo4NmU0NDY4Zi1hNTdkLTQ4OWUtYTIyYS1kYjY2Y2Q3MGEzY2IiXX0seyJpZCI6Im1ldGFzdGF0cy1hcGkiLCJtZXRob2RzIjpbIm1ldGFzdGF0cy1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciJdLCJyZXNvdXJjZXMiOlsiYWNjb3VudDokVVNFUl9JRCQ6ODZlNDQ2OGYtYTU3ZC00ODllLWEyMmEtZGI2NmNkNzBhM2NiIl19LHsiaWQiOiJyaXNrLW1hbmFnZW1lbnQtYXBpIiwibWV0aG9kcyI6WyJyaXNrLW1hbmFnZW1lbnQtYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiXSwicmVzb3VyY2VzIjpbImFjY291bnQ6JFVTRVJfSUQkOjg2ZTQ0NjhmLWE1N2QtNDg5ZS1hMjJhLWRiNjZjZDcwYTNjYiJdfV0sImlnbm9yZVJhdGVMaW1pdHMiOmZhbHNlLCJ0b2tlbklkIjoiMjAyMTAyMTMiLCJpbXBlcnNvbmF0ZWQiOmZhbHNlLCJyZWFsVXNlcklkIjoiOTFiYmExNWEyYmRiZGE1NDdlNThkYjIxMjBjY2YzZjEiLCJpYXQiOjE3NjMzMTk5NTN9.X...";
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

    if (side.toUpperCase() === "BUY") {
      result = await conn.createMarketBuyOrder(symbol, lot, {
        stopLoss: sl,
        takeProfit: tp,
        comment: comment || "n8n-auto"
      });
    } else if (side.toUpperCase() === "SELL") {
      result = await conn.createMarketSellOrder(symbol, lot, {
        stopLoss: sl,
        takeProfit: tp,
        comment: comment || "n8n-auto"
      });
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
app.listen(10000, () => {
  console.log("MetaApi middleware running on port 10000");
});
