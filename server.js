const express = require('express');
const app = express();

app.use(express.json());

let payments = {};

app.post('/createPayment', (req, res) => {
  const token = Date.now().toString();
  payments[token] = { amount: req.body.amount, paid: false };
  res.json({ token });
});

app.get('/checkPayment', (req, res) => {
  res.json(payments[req.query.token] || {});
});

app.post('/pay', (req, res) => {
  const token = req.body.token;
  if (payments[token]) {
    payments[token].paid = true;
    res.json({ status: "PAID" });
  } else {
    res.status(404).end();
  }
});

app.listen(process.env.PORT || 3000);