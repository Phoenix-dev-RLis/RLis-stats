function actualiserListeSites(urlUser) {
    urlUser.forEach(element => {
        let elementCreer = document.createElement("li").innerText = element;
        document.querySelector("#list-site").appendChild(elementCreer);
    });
}