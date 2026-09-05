const express = require("express");
const { Wallet } = require("./wallet");

const app = express();
app.use(express.json());

const wallets = {}; // userId -> Wallet (simulado en memoria)

function getWallet(userId) {
  if (!wallets[userId]) wallets[userId] = new Wallet(0);
  return wallets[userId];
}

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "pagaya-backend" });
});

app.post("/wallet/:userId/deposit", (req, res) => {
  try {
    const wallet = getWallet(req.params.userId);
    const balance = wallet.deposit(Number(req.body.amount));
    res.status(200).json({ balance });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/wallet/:userId/pay", (req, res) => {
  try {
    const wallet = getWallet(req.params.userId);
    const balance = wallet.pay(Number(req.body.amount));
    res.status(200).json({ balance });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/wallet/:userId", (req, res) => {
  const wallet = getWallet(req.params.userId);
  res.status(200).json({ balance: wallet.balance, history: wallet.history });
});

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`PagaYa backend escuchando en :${PORT}`));
}
