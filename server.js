import express from "express";
import MetaApi from "metaapi.cloud-sdk";

const app = express();
app.use(express.json());

// --- حط التوكن تبعك بالكامل هنا ---
const token = "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI5MWJiYTE1YTJiZGJkYTU0N2U1OGRiMjEyMGNjZjNmMSIsImFjY2Vzc1J1bGVzIjpbeyJpZCI6InRyYWRpbmctYWNjb3VudC1tYW5hZ2VtZW50LWFwaSIsIm1ldGhvZHMiOlsidHJhZGluZy1hY2NvdW50LW1hbmFnZW1lbnQtYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiXSwicmVzb3VyY2VzIjpbImFjY291bnQ6JFVTRVJfSUQkOjg2ZTQ0NjhmLWE1N2QtNDg5ZS1hMjJhLWRiNjZjZDcwYTNjYiJdfSx7ImlkIjoibWV0YWFwaS1yZXN0LWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiYWNjb3VudDokVVNFUl9JRCQ6ODZlNDQ2OGYtYTU3ZC00ODllLWEyMmEtZGI2NmNkNzBhM2NiIl19LHsiaWQiOiJtZXRhYXBpLXJwYy1hcGkiLCJtZXRob2RzIjpbIm1ldGFhcGktYXBpOndzOnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyJhY2NvdW50OiRVU0VSX0lEJDo4NmU0NDY4Zi1hNTdkLTQ4OWUtYTIyYS1kYjY2Y2Q3MGEzY2IiXX0seyJpZCI6Im1ldGFhcGktcmVhbC10aW1lLXN0cmVhbWluZy1hcGkiLCJtZXRob2RzIjpbIm1ldGFhcGktYXBpOndzOnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyJhY2NvdW50OiRVU0VSX0lEJDo4NmU0NDY4Zi1hNTdkLTQ4OWUtYTIyYS1kYjY2Y2Q3MGEzY2IiXX0seyJpZCI6Im1ldGFzdGF0cy1hcGkiLCJtZXRob2RzIjpbIm1ldGFzdGF0cy1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciJdLCJyZXNvdXJjZXMiOlsiYWNjb3VudDokVVNFUl9JRCQ6ODZlNDQ2OGYtYTU3ZC00ODllLWEyMmEtZGI2NmNkNzBhM2NiIl19LHsiaWQiOiJyaXNrLW1hbmFnZW1lbnQtYXBpIiwibWV0aG9kcyI6WyJyaXNrLW1hbmFnZW1lbnQtYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiXSwicmVzb3VyY2VzIjpbImFjY291bnQ6JFVTRVJfSUQkOjg2ZTQ0NjhmLWE1N2QtNDg5ZS1hMjJhLWRiNjZjZDcwYTNjYiJdfV0sImlnbm9yZVJhdGVMaW1pdHMiOmZhbHNlLCJ0b2tlbklkIjoiMjAyMTAyMTMiLCJpbXBlcnNvbmF0ZWQiOmZhbHNlLCJyZWFsVXNlcklkIjoiOTFiYmExNWEyYmRiZGE1NDdlNThkYjIxMjBjY2YzZjEiLCJpYXQiOjE3NjMzMTk5NTN9.X7kCSHteC3nslr0MFLMHtzjdpOWFhgpQvwCle7_TGJwoM4-YUOm1S0rUti7Sxy0VZwU6eyN8xfNbq6U6yUbRHVJ0PfiXzC9jrWW6FiTekyK_2GYh8Z30gltPpBrFA699GTbquPca-WlSk1fLk-ViNSY2OLOJAFgZdTWiwxCfG-rt5ret0H_ecpx-6livMkkGOW1B9fOkAQtWQB-GOtXK1MJZZGRaDbM8kP9CUyzQmyW69xA_3D3aDOLWA1PtOeEdt9EecdKDEKmbdMWk5yNYFkTMRvetatF1-MIAxpVpoODR31aXX0dnDtrhpfaW2prX9H8JPTKOUyzdmuxSnrvxnaO_v-mgs6S30JVEppN0yHU_bHtDxYKxmfUgsKy6o44ybTPCyrKA9ZZM3iuQ5PNNQyouXxsCwPOHau5fwMMeIP12zHFCOhUAmj56zD-fDp40LB-2h96AMMufHL9967eelDlTdKT0W3DpfVGeLTYIUVBb7jDQM38CNFBNUuGaA-ctbgcrIZKOsavw8xCSrH4XRfYOpAAUnqApN7DhbMUUjP6hBFdTl4SMF8WW65WXdN2nyWNfJytYRQ4Pdrm8PNWnwkFZq6YJp2qgE5dq0PWeiOuxFuLPHLNSo4Fdaj8vHfB58zJTlUaJJfeGOFughkV-BTT4pEKKHH9frrMU9896V5Y";

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
