const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Bot } = require("grammy");

const app = express();
const bot = new Bot("7882885644:AAFViuyV0uMLIbJEV2_1VnEQmC2nBiMMKKE");

app.use(cors());
app.use(bodyParser.json());

const paidUsers = new Map();

app.post("/api/donate", (req, res) => {
  const userId = req.body.userId;
  const productName = req.body.productName || "Test Product";
  const productDescription = req.body.productDescription || "Test description";
  const currency = req.body.currency || "USD";
  const amount = req.body.amount || 1;

  const prices = [{ label: productName, amount }];

  return bot.api
    .createInvoiceLink(
      "Donate",
      "donate!",
      "payload",
      "provider_token",
      "XTR",
      prices
    )
    .then((invoice) => {
      console.log(invoice);
      res.status(200).json({ invoice_link: invoice });
    })
    .catch((err) => {
      console.error("Error sending invoice:", err);
      res.status(500).json({ error: "Failed to send the invoice." });
    });
});

// bot.on("pre_checkout_query", (ctx) => {
//   return ctx.answerPreCheckoutQuery(true).catch(() => {
//     console.error("answerPreCheckoutQuery failed");
//   });
// });

// bot.on("message:successful_payment", (ctx) => {
//   if (!ctx.message || !ctx.message.successful_payment || !ctx.from) {
//     return;
//   }

//   paidUsers.set(
//     ctx.from.id,
//     ctx.message.successful_payment.telegram_payment_charge_id
//   );
//   console.log(ctx.message.successful_payment);
// });

// app.get("/api/status/:userId", (req, res) => {
//   const userId = req.params.userId;
//   const statusMessage = paidUsers.has(userId)
//     ? "You have paid"
//     : "You have not paid yet";
//   res.status(200).json({ message: statusMessage });
// });

// app.post("/api/refund", (req, res) => {
//   const userId = req.body.userId;

//   if (!paidUsers.has(userId)) {
//     return res
//       .status(400)
//       .json({ error: "You have not paid yet, there is nothing to refund" });
//   }

//   bot.api
//     .refundStarPayment(userId, paidUsers.get(userId))
//     .then(() => {
//       paidUsers.delete(userId);
//       res.status(200).json({ message: "Refund successful" });
//     })
//     .catch(() => res.status(500).json({ error: "Refund failed" }));
// });

const startBot = async () => {
  await bot.start();
  console.log("Bot started and listening for updates");
};

startBot();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
