const ID_client = "781828046792-73342ej98s4r81mh7au8hrgrui7mt1cf.apps.googleusercontent.com"
const URL_de_redirection = "http://127.0.0.1:5500/callback.html"
let url = "";
let autentification = localStorage.getItem("autentification");
let token = "";
let expires_in = "";
let droits = "";
let code = "";

console.log("Start script...");

function autentify(ID_client,URL_de_redirection) {
    url = "https://accounts.google.com/o/oauth2/v2/auth?client_id="+ID_client+"&redirect_uri="+URL_de_redirection+"&response_type=code&scope=https://www.googleapis.com/auth/webmasters";
    window.location.href = url;  
    
}

async function obtenirToken(code,ID_client,URL_de_redirection) {;
    url = "https://oauth2.googleapis.com/token";
    const params = {
        code: code,
        client_id: ID_client,
        client_secret: "",
        redirect_uri: URL_de_redirection,
        grant_type: "authorization_code"
    };

    try {
        let response = await fetch (url,{
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams(params)
        })
        response = await response.json();
        console.log("Response : "+response);
        token= response.access_token;
        console.log("Token : "+token);
        expires_in = response.expires_in;
        console.log("Expires in : "+expires_in);
        droits = response.scope;
        console.log("Droits : "+droits);
    } catch (error) {
        console.log("Erreur : "+error);
    }
}

if (autentification == null) {
    setTimeout(function(){
        autentify(ID_client,URL_de_redirection);
    },3000);
}else{if (autentification=="true") {
    setTimeout(function(){
        code = localStorage.getItem("code");
        console.log("Code : "+code);
        obtenirToken(code,ID_client,URL_de_redirection);

        setTimeout(function(){
            localStorage.clear();
            console.log("Clear localStorage");
        },20000);
    },2000);
}else {
    console.log("Erreur, content of localStorage : "+localStorage.getItem("autentification"));
}
}
