let requestURL = localStorage["requestURL"] + "/" + localStorage["productSelect"];

function showCamera(jsonObj) {
    let camera = jsonObj;
    const id = camera._id;
    const productImg = document.querySelector('img');
    const productName = document.querySelector('h2');
    const productDescription = document.getElementById('p1');
    const productPrice = document.getElementById('p2');
    const selectLense = document.querySelector('select');
    const addToBasket = document.querySelector('button')

    productImg.src = camera.imageUrl;
    productName.textContent = camera.name;
    productDescription.textContent = camera.description;
    productPrice.textContent = camera.price / 100 + " €";

    let lenses = camera.lenses;
      for (var j = 0; j < lenses.length; j++) {
        var selectItem = document.createElement('option');
        selectItem.textContent = lenses[j];
        selectItem.value = lenses[j];
        selectLense.appendChild(selectItem);
    };

    addToBasket.addEventListener("click", function(){
        let objLinea = JSON.stringify(camera);
        localStorage.setItem(id, objLinea); 
        console.log(localStorage.getItem(id));
    });

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
