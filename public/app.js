(() => {

  const status = document.getElementById("status");
  const keyBox = document.getElementById("keyBox");
  const mainBox = document.getElementById("mainBox");
  const result = document.getElementById("result");

  const btnActivate = document.getElementById("btnActivate");
  const btnAnalyze = document.getElementById("btnAnalyze");

  let _vip = false;

  const SALT = "SicboVip_2026_!@#";

  function fingerprint() {
    return navigator.userAgent +
           screen.width +
           screen.height +
           navigator.language;
  }

  async function sha256(text) {
    const enc = new TextEncoder();
    const buf = await crypto.subtle.digest("SHA-256", enc.encode(text));
    return Array.from(new Uint8Array(buf))
      .map(b => b.toString(16).padStart(2,"0"))
      .join("");
  }

  async function activate() {

    const input = document.getElementById("keyInput").value.trim();
    if (!input) return;

    status.innerText = "⏳ Đang xác minh...";

    const computed = await sha256(input + SALT + fingerprint());

    // Hash thật của key đúng (đã tính sẵn)
    const VALID =
      "9b8f1e5bfc8dbdfc0e3e33ab5a1f9f48d7f45c79f2b10c6fd2d02a4c9f4c81aa";

    if (computed === VALID) {

      _vip = true;

      keyBox.classList.add("hidden");
      mainBox.classList.remove("hidden");

      sessionStorage.setItem("v_session", "ok");

      status.innerText = "✅ VIP kích hoạt thành công";

    } else {
      status.innerText = "❌ Key không hợp lệ";
    }
  }

  function analyze() {

    if (!_vip) {
      result.innerText = "❌ Chưa kích hoạt VIP";
      return;
    }

    const hash = document.getElementById("hashInput").value.trim();

    if (!/^[a-f0-9]{32}$/i.test(hash)) {
      result.innerText = "❌ MD5 không hợp lệ";
      return;
    }

    const last = parseInt(hash.slice(-1), 16);
    const prediction = last % 2 === 0 ? "🎲 Dự đoán: XỈU" : "🎲 Dự đoán: TÀI";

    result.innerText = prediction;
  }

  // Auto session restore
  if (sessionStorage.getItem("v_session") === "ok") {
    _vip = true;
    keyBox.classList.add("hidden");
    mainBox.classList.remove("hidden");
    status.innerText = "✅ VIP (Phiên hiện tại)";
  }

  // Event binding (không global)
  btnActivate.addEventListener("click", activate);
  btnAnalyze.addEventListener("click", analyze);

})();
