localStorage.setItem("autentification", true);
const code = new URLSearchParams(window.location.search).get('code')
localStorage.setItem("code", code);
window.location.href = "https://rlis-stats.vercel.app/index.html";
