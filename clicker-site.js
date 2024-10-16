const ID_client = "781828046792-73342ej98s4r81mh7au8hrgrui7mt1cf.apps.googleusercontent.com"
const URL_de_redirection = "https://rlis-stats.vercel.app"
function autentification(ID_client,URL_de_redirection) {
    const url = "https://accounts.google.com/o/oauth2/v2/auth?client_id="+ID_client+"&redirect_uri="+URL_de_redirection+"&response_type=code&scope=https://www.googleapis.com/auth/webmasters";
    try {
        fetch(url)
        .then(response => response.text())
        .then(text => {
            console.log("Autentification réussie : "+text);
        })
    } catch (error) {
        console.log("Erreur : "+error);
    }
    
}

autentification(ID_client,URL_de_redirection);
