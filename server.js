import express from "express";
import MetaApi from "metaapi.cloud-sdk";

const app = express();
app.use(express.json());

// --- حط التوكن تبعك بالكامل هنا ---
const token = "YOUR_METAAPI_TOKEN";

// --- accountId تبعك ---
const accountId = "86e4468f-a57d-489e-a22a-db66cd70a3cb";

const api = new MetaApi(token);

async function getConnection() {
  const account = await api.metatraderAccountApi.getAccount(accountId);
  const connection = account.getRpcConnection();

  await connection.connect();
  await connection.waitSynchronized();

  return connection;
}

// ---- ACCOUNT INFO ----
app.get("/account", async (req, res) => {
  try {
    const conn = await getConnection();
    const info = await conn.getAccountInformation();
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

// ---- PRICE ----
app.post("/price", async (req, res) => {
  try {
    const { symbol } = req.body;
    const conn = await getConnection();
    const price = await conn.getSymbolPrice(symbol || "EURUSD");
    res.json(price);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

// ---- BUY ----
app.post("/buy", async (req, res) => {
  try {
    const { symbol, volume } = req.body;
    const conn = await getConnection();
    const result = await conn.createMarketBuyOrder(symbol || "EURUSD", volume || 0.1);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

// ---- SELL ----
app.post("/sell", async (req, res) => {
  try {
    const { symbol, volume } = req.body;
    const conn = await getConnection();
    const result = await conn.createMarketSellOrder(symbol || "EURUSD", volume || 0.1);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

// ---- START SERVER ----
app.listen(10000, () => console.log("MetaApi middleware running on port 10000"));
