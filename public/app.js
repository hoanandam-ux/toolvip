<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Phân Tích MD5 Sicbo</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Segoe+UI&display=swap">
<style>
body{
  margin:0;
  font-family:Segoe UI;
  background:radial-gradient(circle,#0f2027,#203a43,#0a0f1c);
  height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  color:#fff;
}
.card{
  width:480px;
  max-width:95%;
  padding:28px;
  border-radius:24px;
  background:rgba(255,255,255,0.05);
  backdrop-filter:blur(20px);
  box-shadow:0 0 40px rgba(0,0,0,.6);
}
h1{text-align:center;margin:0 0 10px;}
.status{text-align:center;font-size:14px;opacity:.85;margin-bottom:18px;}
input{
  width:100%;padding:14px;margin-top:10px;
  border:none;border-radius:14px;
  background:rgba(255,255,255,.08);
  color:#fff;font-size:16px;
}
button{
  width:100%;padding:14px;margin-top:12px;
  border:none;border-radius:14px;
  font-size:16px;font-weight:bold;
  background:linear-gradient(90deg,#00c6ff,#0072ff);
  color:white;cursor:pointer;transition:.3s;
}
button:hover{transform:scale(1.04);}
.result{
  margin-top:18px;padding:18px;border-radius:18px;
  background:rgba(0,0,0,.45);
  min-height:140px;line-height:1.7;font-size:15px;
}
</style>
</head>
<body>

<div class="card">
  <h1>🎲 PHÂN TÍCH MD5 SICBO</h1>
  <div class="status">✅ Hệ thống sẵn sàng</div>

  <input id="hashInput" placeholder="Nhập mã MD5 (32 ký tự)">
  <button id="btnAnalyze">PHÂN TÍCH NGAY</button>

  <div class="result" id="result">
    Nhập MD5 để bắt đầu phân tích.
  </div>
</div>

<script src="app.js" defer></script>
</body>
</html>
