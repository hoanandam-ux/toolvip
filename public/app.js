let sessionToken = null;

async function activateKey() {

    const key = document.getElementById("keyInput").value.trim();
    const status = document.getElementById("status");

    if (!key) return;

    status.innerText = "Đang xác minh...";

    const res = await fetch("/api/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key })
    });

    const data = await res.json();

    if (data.success) {
        sessionToken = data.token;

        document.getElementById("keyBox").style.display = "none";
        document.getElementById("mainBox").classList.remove("hidden");

        status.innerText = "VIP kích hoạt thành công";
    } else {
        status.innerText = "Key sai";
    }
}

async function analyzeHash() {

    const hash = document.getElementById("hashInput").value.trim();
    const result = document.getElementById("result");

    if (!sessionToken) {
        result.innerText = "Chưa kích hoạt VIP";
        return;
    }

    const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hash, token: sessionToken })
    });

    const data = await res.json();
    result.innerText = data.result || "Lỗi";
}
