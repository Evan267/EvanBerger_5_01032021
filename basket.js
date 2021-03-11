let requestURL = "http://localhost:3000/api/cameras";


function showBasket() {
    localStorage.removeItem("requestURL");
    localStorage.removeItem("productSelect");
    const basketSection = document.getElementById("basket");
    let totalPrice = 0; 

    for (let i = 0; i < localStorage.length; i++) {
        let objKey = localStorage.key(i);
        let objLinea = localStorage.getItem(objKey);
        let objJson = JSON.parse(objLinea);

        const myFigure = document.createElement('figure');
        const myImg = document.createElement('img');
        const myFigcaption = document.createElement('figcaption');
        const myH3 = document.createElement('h3');
        const myPara = document.createElement('p');
        const formDelete = document.createElement('form');
        const buttonDelete = document.createElement('button');
        const iconDelete = document.createElement('i');

        totalPrice += objJson.price;
        myImg.src = objJson.imageUrl;
        myH3.textContent = objJson.name;
        myPara.textContent = objJson.price / 100 + " €";
        iconDelete.className = "fas fa-trash-alt";

        buttonDelete.addEventListener("click", function(){
            localStorage.removeItem(objKey);
        });

        basketSection.appendChild(myFigure);
        myFigure.appendChild(myImg);
        myFigure.appendChild(myFigcaption);
        myFigcaption.appendChild(myH3);
        myFigcaption.appendChild(myPara);
        myFigcaption.appendChild(formDelete);
        formDelete.appendChild(buttonDelete);
        buttonDelete.appendChild(iconDelete);
    }
    const total = document.createElement('p');
    total.textContent = "Total : " + totalPrice / 100 + " €";
    basketSection.appendChild(total);
}




fetch(requestURL)
    .then(function(response){
        console.log(localStorage);
        return response.json();
    })
    .then(function(response){
        return showBasket(response);
    })
    .catch(function(error){
        return alert("Erreur : " + error)
    });
