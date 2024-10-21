function actualiserMenuSites(urlUser) {
    let i = 1;
    if (document.getElementsByClassName("liste-site-visible").length===0) {
        document.querySelector("#home-page").classList.remove("hidden");
        document.querySelector("#home-page").classList.add("liste-site-visible");
        urlUser.forEach(element => {
            if (document.querySelector("#list-site").innerText.includes(element)) {
            //sauter l'itération si l'url est déjà dans la liste
            } else {
                let elementCreer = document.createElement("li");
                elementCreer.id = "site-"+i;
                elementCreer.className = "liste-site-visible";
                document.querySelector("#list-site").appendChild(elementCreer);

                let buttonCreer = document.createElement("button");
                buttonCreer.innerText = element;
                buttonCreer.id = "button-"+i;
                buttonCreer.className = "list-site-visible";
                buttonCreer.innerText = element;
                //a rajouter plus tard: buttonCreer.onclick = ...
                document.querySelector(("#site-"+i)).appendChild(buttonCreer);
            }
            i++;
        });
    } else if (document.getElementsByClassName("liste-site-visible").length>0) {
        urlUser.forEach(element => {
                if (document.querySelector(("#site-"+i))) {
                document.querySelector("#home-page").classList.remove("liste-site-visible");
                document.querySelector("#home-page").classList.add("hidden");
                document.querySelector("#list-site-ul").classList.remove("liste-site-visible");
                document.querySelector("#list-site-ul").classList.add("hidden");
                document.querySelector("#button-"+i).classList.remove("list-site-visible");
                document.querySelector("#button-"+i).classList.add("hidden");
                document.querySelector(("#site-"+i)).removeChild(document.querySelector("#button-"+i));
                document.querySelector("#list-site").removeChild(document.querySelector(("#site-"+i)));
                }
                i++;
            }
            
        );
    } else {
        throw new Error("Erreur dans la fonction actualiserMenuSites");
    }
    
}
