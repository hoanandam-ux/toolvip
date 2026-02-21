const statusEl = document.getElementById("status");
const keyBox = document.getElementById("keyBox");
const mainBox = document.getElementById("mainBox");
const resultEl = document.getElementById("result");

function checkVIP(){
  const exp = localStorage.getItem("vip_expire");
  if(exp && parseInt(exp) > Date.now()){
    keyBox.classList.add("hidden");
    mainBox.classList.remove("hidden");
    statusEl.innerText = "🟢 VIP đến: " + new Date(parseInt(exp)).toLocaleString();
  }
}

async function activateKey(){
  const key = document.getElementById("keyInput").value.trim();

  const res = await fetch("/api/activate",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({key})
  });

  const data = await res.json();
  if(!data.success){
    alert("❌ Key không hợp lệ");
    return;
  }

  localStorage.setItem("vip_expire", data.expire);
  location.reload();
}

async function analyzeHash(){
  const hash = document.getElementById("hashInput").value.trim();

  const res = await fetch("/api/analyze",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({hash})
  });

  const data = await res.json();
  if(!data.success){
    resultEl.innerText = data.message;
    return;
  }

  const d = data.data;
  resultEl.innerHTML = `
    🔐 MD5: <b>${d.hash}</b><br>
    📊 HEX cuối: <b>${d.lastBytes}</b><br>
    🔢 Decimal: <b>${d.decimalValue}</b><br>
    🎯 Kết quả: <b>${d.result} (${d.group})</b>
  `;
}

checkVIP();
