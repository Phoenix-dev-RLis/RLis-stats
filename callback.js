localStorage.setItem("autentification", true);
const code = new URLSearchParams(window.location.search).get('code')
localStorage.setItem("code", code);
window.location.href = "http://127.0.0.1:5500/index.html";