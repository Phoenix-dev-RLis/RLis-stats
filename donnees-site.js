const ID_client = "781828046792-73342ej98s4r81mh7au8hrgrui7mt1cf.apps.googleusercontent.com"
const URL_de_redirection = https://rlis-stats.vercel.app/
let url = "";
let params = "";
let autentification = localStorage.getItem("autentification");
let token = "";
let expires_in = "";
let droits = "";
let code = "";
let urlUser = [];
let droitsUser = {};

console.log("Start script...");

function autentify(ID_client,URL_de_redirection) {
    try {
        url = "https://accounts.google.com/o/oauth2/v2/auth?client_id="+ID_client+"&redirect_uri="+URL_de_redirection+"&response_type=code&scope=https://www.googleapis.com/auth/webmasters.readonly";
    } catch (error) {
        console.log("Erreur dans la fonction autentify : "+error);
    }
    window.location.href = url;  
    
}

async function obtenirToken(code,ID_client,URL_de_redirection) {;
    url = "https://oauth2.googleapis.com/token";
    params = {
        code: code,
        client_id: ID_client,
        client_secret: prompt("you know"),
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
        });
        
        if (!response.ok) {
            throw new Error("HTTP error! status: " + response.status+"|||| Erreur au niveau de la recuperation des token dans 'obtenirToken'");
        }
        response = await response.json();
        console.log("Response : "+response);
        sessionStorage.setItem("token", token);
        console.log("Token : "+response.access_token);
        expires_in = response.expires_in;
        console.log("Expires in : "+expires_in);
        droits = response.scope;
        console.log("Droits : "+droits);
        
        localStorage.removeItem("autentification")
        autentification=localStorage.getItem("autentification");
        
        return response.access_token;
    } catch (error) {
        
        localStorage.removeItem("autentification"); 
        autentification=localStorage.getItem("autentification");
        
        throw new Error("Erreur dans la fonction obtenirToken : "+error);
    }
}

async function obtenirSiteDeLaConsole(token) {;

    url = "https://www.googleapis.com/webmasters/v3/sites";
    params = {
        method: "GET",
        headers: {
            "authorization": "Bearer "+token,
            "content-type":"application/json",
            "accept":"application/json"
        }
    }
    //envoie de la requête, on attend la réponse
    try {
        let responseConsole = await fetch (url,params);
        responseConsole = await responseConsole.json();
        console.log(responseConsole)
        console.log("Site et niveau de permission :");

        responseConsole.siteEntry.forEach(element => {
            console.log("Url du site : "+element.siteUrl);
            console.log("Droits : "+element.permissionLevel);
            console.log("--------------------------------------------------------------------------------");
            urlUser.push(element.siteUrl);
            droitsUser[element.siteUrl] = element.permissionLevel;
            sessionStorage.setItem("urlUser",urlUser);
            sessionStorage.setItem("droitsUser",droitsUser);
        });
        console.log("Fin de la liste");
        console.log("urlUser : "+urlUser);
        console.log("droitsUser : "+droitsUser);


    } catch (error) {
        console.log("Erreur dans la fonction obtenirSiteDeLaConsole : "+error);
    }
}
console.log("etat of autentification: "+autentification);
if (autentification == null) {
    setTimeout(function(){
        autentify(ID_client,URL_de_redirection);
    },3000);
}else{if (autentification=="true") {
    setTimeout(async function(){
        code = localStorage.getItem("code");
        console.log("Code : "+code);
        token = await obtenirToken(code,ID_client,URL_de_redirection);
        obtenirSiteDeLaConsole(token);
        
        setTimeout(function(){
            localStorage.clear();
            sessionStorage.clear();
            console.log("Clear localStorage");
        },20000);
    },2000);
}else {
    console.log("Erreur, content of localStorage : "+localStorage.getItem("autentification"));
    localStorage.clear();
    sessionStorage.clear();
    console.log("Clear localStorage");
}
}
