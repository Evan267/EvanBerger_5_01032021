console.log(localStorage)
localStorage["requestURL"] = "http://localhost:3000/api/cameras";
let requestURL = localStorage["requestURL"];
let productRequestURL;
localStorage.removeItem("order");


function showCamera(jsonObj) {
    let camera = jsonObj;
    const section = document.getElementById("section");

    for (let i = 0; i < camera.length; i++) {
            const id = camera[i]["_id"];
            const myLink = document.createElement('a');
            const myFigure = document.createElement('figure');
            const myImg = document.createElement('img');
            const myFigcaption = document.createElement('figcaption');
            const myH3 = document.createElement('h3');
            const myPara = document.createElement('p');


            myLink.href = "product.html";
            myLink.className = "stretched-link"
            myFigure.className = "card col-12 col-md-6 col-xl-4 border-0";
            myFigcaption.className = "card-body px-0 pt-2";
            myImg.src = camera[i]["imageUrl"];
            myImg.className = "card-img-top";
            myH3.textContent = camera[i]["name"];
            myH3.className = "card-title"
            myPara.textContent = camera[i]["price"] / 100 + " €";
            myPara.className = "card-text"
            

            myLink.addEventListener('click', function(event){
                localStorage["productSelect"] = id;
            });

            section.appendChild(myFigure);
            myFigure.appendChild(myImg);
            myFigure.appendChild(myLink);
            myLink.appendChild(myFigcaption);
            myFigcaption.appendChild(myH3);        
            myFigcaption.appendChild(myPara);
            
    }
}


fetch(requestURL)
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        return showCamera(response);
    })
    .catch(function(error){
        return alert("Erreur : " + error)
    });