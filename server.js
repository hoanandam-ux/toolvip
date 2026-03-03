const express = require("express");
const crypto = require("crypto");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const SECRET_KEY = process.env.SECRET_KEY || "VipSecure_2026_Render";
const VALID_KEYS = ["VIP-2026-SECURE"]; // không đưa ra frontend

// ========================
// Activate API
// ========================
app.post("/api/activate", (req, res) => {
    const { key } = req.body;

    if (!key) {
        return res.json({ success: false });
    }

    if (VALID_KEYS.includes(key)) {

        const token = crypto
            .createHash("sha256")
            .update(key + SECRET_KEY)
            .digest("hex");

        return res.json({
            success: true,
            token
        });
    }

    res.json({ success: false });
});

// ========================
// Analyze API
// ========================
app.post("/api/analyze", (req, res) => {

    const { hash, token } = req.body;

    if (!hash || !token) {
        return res.status(403).json({ error: "Unauthorized" });
    }

    const validToken = crypto
        .createHash("sha256")
        .update("VIP-2026-SECURE" + SECRET_KEY)
        .digest("hex");

    if (token !== validToken) {
        return res.status(403).json({ error: "Invalid token" });
    }

    // Logic phân tích thật ở server
    const lastChar = hash.slice(-1);
    const result = parseInt(lastChar, 16) % 2 === 0 ? "XỈU" : "TÀI";

    res.json({ result });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
