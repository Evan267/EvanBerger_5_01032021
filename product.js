let requestURL = localStorage["requestURL"] + "/" + localStorage["productSelect"];
console.log(localStorage)

class basketAdd{
    constructor(obj, lense, quantity){
        this.obj = obj,
        this.lense = lense,
        this.quantity = quantity
    }
}

function showCamera(jsonObj) {
    let camera = jsonObj;
    const id = camera._id;
    const productImg = document.querySelector('img');
    const productName = document.querySelector('h1');
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
        let quantity = document.getElementById("quantity").value;
        let lense = document.getElementById("lense").value;
        let objLinea = JSON.stringify({camera, quantity, lense});
        localStorage.setItem(id, objLinea); 
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