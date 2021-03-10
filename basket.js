let requestURL = localStorage["requestURL"];

function showBasket(jsonObj) {
    let camera = jsonObj;
    const section = document.querySelector("section");

    for (let i = 0; i < camera.length; i++) {
        const id = camera[i]["_id"];
        let objLinea = localStorage.getItem(id);
        let objJson = JSON.parse(objLinea);

        const myFigure = document.createElement('figure');
        const myImg = document.createElement('img');
        const myFigcaption = document.createElement('figcaption');
        const myH3 = document.createElement('h3');
        const myPara = document.createElement('p');

        myImg.src = objJson.imageUrl;
        myH3.textContent = objJson.name;
        myPara.textContent = objJson.price / 100 + " €";

        section.appendChild(myFigure);
        myFigure.appendChild(myImg);
        myFigure.appendChild(myFigcaption);
        myFigcaption.appendChild(myH3);
        myFigcaption.appendChild(myPara);
    }
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
