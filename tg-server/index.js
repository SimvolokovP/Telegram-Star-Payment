const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Bot } = require("grammy");

const app = express();
const bot = new Bot("7882885644:AAFViuyV0uMLIbJEV2_1VnEQmC2nBiMMKKE");

app.use(cors());
app.use(bodyParser.json());

app.post("/api/donate", (req, res) => {
  const userId = req.body.userId;
  const productName = req.body.productName || "Test Product";
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
      console.log(userId);
      console.log(invoice);
      res.status(200).json({ invoice_link: invoice });
    })
    .catch((err) => {
      console.error("Error sending invoice:", err);
      res.status(500).json({ error: "Failed to send the invoice." });
    });
});

bot.on("pre_checkout_query", (ctx) => {
  return ctx.answerPreCheckoutQuery(true).catch(() => {
    console.error("answerPreCheckoutQuery failed");
  });
});

bot.on("message:successful_payment", (ctx) => {
  if (!ctx.message || !ctx.message.successful_payment || !ctx.from) {
    return;
  }

  const paymentInfo = ctx.message.successful_payment;
  console.log(paymentInfo);
  ctx
    .reply(
      `Спасибо за вашу оплату! Вы успешно оплатили ${
        paymentInfo.total_amount / 100
      } ${paymentInfo.currency} за ${paymentInfo.invoice_payload}.`
    )
    .catch((err) => {
      console.error("Error sending message to user:", err);
    });
});

const startBot = async () => {
  await bot.start();
  console.log("Bot started and listening for updates");
};

startBot();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
