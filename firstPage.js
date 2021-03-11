console.log(localStorage)
localStorage["requestURL"] = "http://localhost:3000/api/cameras";
let requestURL = localStorage["requestURL"];
let productRequestURL;


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



            myImg.src = camera[i]["imageUrl"];
            myH3.textContent = camera[i]["name"];
            myPara.textContent = camera[i]["price"] / 100 + " €";
            myLink.href = "product.html";

            myLink.addEventListener('click', function(event){
                localStorage["productSelect"] = id;
            });

            section.appendChild(myLink);
            myLink.appendChild(myFigure);
            myFigure.appendChild(myImg);
            myFigure.appendChild(myFigcaption);
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




/*
class Camera {
    constructor(objet) {
        this.lenses = response[objet]["lenses"];
        this.id = response[objet]["_id"];
        this.name = response[objet]["name"];
        this.price = response[objet]["price"];
        this.description = response[objet]["description"];
        this.image = response[objet]["imageUrl"];
    }
}

request.open("GET", requestURL);
request.send()

const firstCamera = new Camera(1);

id.textContent = firstCamera;


    fetch('http://localhost:3000/api/cameras')
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            return console.log(json)
        })
        .catch(function(error){
            return alert("Erreur : " + error)
        });


request.onreadystatechange = function(){
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let cam = JSON.parse(this.responseText);
        showCamera(cam);
    }
}

      let lenses = camera[i].lenses;
      for (var j = 0; j < lenses.length; j++) {
        var listItem = document.createElement('li');
        listItem.textContent = lenses[j];
        myList.appendChild(listItem);
      }
    

*/
