const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

/* ================= CONFIG ================= */
const VIP_KEY = "s029019ca";
const VIP_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 ngày

/* ================= UTIL ================= */
function isValidMD5(hash) {
  return /^[a-f0-9]{32}$/i.test(hash);
}

function analyzeHash(hash) {
  const lastBytes = hash.slice(-8);
  const decimalValue = parseInt(lastBytes, 16);
  const result = (decimalValue % 16) + 3; // 3-18
  const group = result <= 10 ? "XỈU" : "TÀI";

  return {
    hash,
    lastBytes,
    decimalValue,
    result,
    group
  };
}

/* ================= API KÍCH HOẠT KEY ================= */
app.post("/api/activate", (req, res) => {
  const { key } = req.body;

  if (key !== VIP_KEY) {
    return res.json({
      success: false,
      message: "Key không hợp lệ"
    });
  }

  return res.json({
    success: true,
    expire: Date.now() + VIP_DURATION
  });
});

/* ================= API PHÂN TÍCH MD5 ================= */
app.post("/api/analyze", (req, res) => {
  const { hash } = req.body;

  if (!isValidMD5(hash)) {
    return res.json({
      success: false,
      message: "MD5 không hợp lệ (32 ký tự hex)"
    });
  }

  const data = analyzeHash(hash.toLowerCase());
  res.json({ success: true, data });
});

/* ================= HEALTH CHECK ================= */
app.get("/api/status", (req, res) => {
  res.json({ status: "Server đang hoạt động" });
});

app.listen(PORT, () => {
  console.log("🚀 Server chạy tại cổng", PORT);
});
