// ===== SERVER MD5 SICBO VIP =====
const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

// ===== CONFIG =====
const KEY = "s029019ca";
const VIP_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 ngày

// ===== API KÍCH HOẠT =====
app.post("/api/activate", (req, res) => {
  const { key } = req.body;
  if (key !== KEY) {
    return res.json({ success: false, message: "Key không hợp lệ" });
  }

  return res.json({
    success: true,
    expire: Date.now() + VIP_DURATION
  });
});

// ===== VALIDATE MD5 =====
function isValidMD5(hash) {
  return /^[a-f0-9]{32}$/i.test(hash);
}

// ===== PHÂN TÍCH HASH (DETERMINISTIC) =====
function analyzeHash(hash) {
  const lastBytes = hash.slice(-8);
  const decimalValue = parseInt(lastBytes, 16);
  const result = (decimalValue % 16) + 3;
  const group = result <= 10 ? "XỈU" : "TÀI";

  return {
    hash,
    lastBytes,
    decimalValue,
    result,
    group
  };
}

// ===== API PHÂN TÍCH =====
app.post("/api/analyze", (req, res) => {
  const { hash } = req.body;

  if (!isValidMD5(hash)) {
    return res.json({ success: false, message: "MD5 không hợp lệ" });
  }

  const data = analyzeHash(hash.toLowerCase());
  res.json({ success: true, data });
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log("🚀 Server chạy tại cổng", PORT);
});
