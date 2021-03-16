let requestURL = "http://localhost:3000/api/cameras";
let postURL = requestURL + "/order" ; 
const productSelect = localStorage["productSelect"];
let products = [];
let request = new XMLHttpRequest;


class Contact{
    constructor(firstName, lastName, address, city, email){
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
    }
}


async function showBasket() {
    localStorage.removeItem("requestURL");
    localStorage.removeItem("productSelect");
    let totalPrice = 0;
    const basketSection = document.getElementById("basket");

    for (let i = 0; i < localStorage.length; i++) {
        let objKey = localStorage.key(i);
        let objLinea = localStorage.getItem(objKey);
        let objJson = JSON.parse(objLinea);

        const myFigure = document.createElement('figure');
        const myImg = document.createElement('img');
        const myFigcaption = document.createElement('figcaption');
        const productName = document.createElement('h3');
        const selectLense = document.createElement('select');
        const quantity = document.createElement('input');
        const price = document.createElement('p');
        const formDelete = document.createElement('form');
        const buttonDelete = document.createElement('button');
        const iconDelete = document.createElement('i');

        products.push(objJson.camera._id);
        totalPrice += objJson.camera.price;
        quantity.type = "number";
        quantity.name = "quantity";
        quantity.id= "quantity";
        quantity.value = objJson.quantity;
        myImg.src = objJson.camera.imageUrl;
        productName.textContent = objJson.camera.name;
        price.textContent = objJson.camera.price * quantity.value / 100 + " €";
        iconDelete.className = "fas fa-trash-alt";

        let lenses = objJson.camera.lenses;
        for (var j = 0; j < lenses.length; j++) {
            var selectItem = document.createElement('option');
            selectItem.textContent = lenses[j];
            selectItem.value = lenses[j];
            selectLense.appendChild(selectItem);
        };
        selectLense.value = objJson.lense;

        quantity.addEventListener("change", function(){
            objJson.quantity = quantity.value;
            location.href = "basket.html";
            let objLinea2 = JSON.stringify(objJson);
            localStorage.setItem(objKey, objLinea2);
        })



        buttonDelete.addEventListener("click", function(){
            localStorage.removeItem(objKey);
        });

        basketSection.appendChild(myFigure);
        myFigure.appendChild(myImg);
        myFigure.appendChild(myFigcaption);
        myFigcaption.appendChild(productName);
        myFigcaption.appendChild(selectLense);
        myFigcaption.appendChild(quantity);
        myFigcaption.appendChild(price);
        myFigcaption.appendChild(formDelete);
        formDelete.appendChild(buttonDelete);
        buttonDelete.appendChild(iconDelete);
    }
    const total = document.createElement('p');
    total.textContent = "Total : " + totalPrice / 100 + " €";
    basketSection.appendChild(total);
    localStorage["requestURL"] = requestURL;
    localStorage["productSelect"] = productSelect;
}

async function order(){
    const orderForm = document.querySelector('form');
    orderForm.addEventListener('submit', function(e) {
        let myHeader = new Headers({'Content-Type': 'application/json'});
        e.preventDefault();
        const targ = e.target;
        const contact = new Contact(targ.lastName.value, targ.firstName.value, targ.address.value, targ.city.value, targ.email.value);
        const postJSON = JSON.stringify({contact, products});
        console.log(postJSON);
        request.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                var response = JSON.parse(this.responseText);
                console.log(response);
            }
        };
        request.open("POST",  postURL);
        request.setRequestHeader("Content-type", "application/json");
        request.send(postJSON);
        /*fetch(postURL, {
            method: "POST",
            headers : myHeader,
            body : postJSON,
        })
        .then(function(response){
            return console.log(response)
            //location.href = "lastPage.html"
        })
        .catch(error => alert("Erreur POST : " + error))*/
    })
}



fetch(requestURL)
    .then(function(response){
        console.log(localStorage);
        console.log(products)
        return response.json();
    })
    .then(function(response){
        order();
        return showBasket(response);
    })
    .catch(function(error){
        return alert("Erreur : " + error)
    });






