let requestURL = "http://localhost:3000/api/cameras";
let postURL = requestURL + "/order" ; 
const productSelect = localStorage["productSelect"];
let products = [];
let totalPrice = 0;
localStorage.removeItem("requestURL");
localStorage.removeItem("productSelect");
let submitError = document.getElementById("submitError");



class Contact{
    constructor(firstName, lastName, address, city, email){
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
    }
}

function showBasket(camera, i) {
    let objKey = localStorage.key(i);
    let objLinea = localStorage.getItem(objKey);
    let objJson = JSON.parse(objLinea);

    const basketTable = document.getElementById("basket-table");
    const total = document.getElementById("total");

    const tableRow = document.createElement('tr');
    const imgCell = document.createElement('td');
    const myImg = document.createElement('img');
    const productName = document.createElement('td');
    const lenseCell = document.createElement('td');
    const selectLense = document.createElement('select');
    const quantityCell = document.createElement('td');
    const quantity = document.createElement('input');
    const priceCell = document.createElement('td');
    const deleteCell = document.createElement('td');
    const formDelete = document.createElement('form');
    const buttonDelete = document.createElement('button');
    const iconDelete = document.createElement('i');

    products.push(camera._id);
    totalPrice += camera.price * objJson.quantity;
    total.textContent = "Prix total : " + totalPrice/100 + " €";
    quantity.type = "number";
    quantity.name = "quantity";
    quantity.id= "quantity";
    quantity.className = "form-control";
    quantity.value = objJson.quantity;
    myImg.src = camera.imageUrl;
    productName.textContent = camera.name;
    priceCell.textContent = camera.price * quantity.value / 100 + " €";
    buttonDelete.className = "btn btn-danger";
    iconDelete.className = "fas fa-trash-alt";

    selectLense.className = "form-control";
    let lenses = camera.lenses;
    for (var j = 0; j < lenses.length; j++) {
        var selectItem = document.createElement('option');
        selectItem.textContent = lenses[j];
        selectItem.value = lenses[j];
        selectLense.appendChild(selectItem);
    };

    quantity.addEventListener("change", function(){
        objJson.quantity = quantity.value;
        location.href = "basket.html";
        let objLinea2 = JSON.stringify(objJson);
        localStorage.setItem(objKey, objLinea2);
    })
    
    buttonDelete.addEventListener("click", function(){
        localStorage.removeItem(objKey);
    });


    basketTable.appendChild(tableRow);
    tableRow.appendChild(imgCell);
    imgCell.appendChild(myImg);
    tableRow.appendChild(productName);
    tableRow.appendChild(lenseCell);
    lenseCell.appendChild(selectLense);
    tableRow.appendChild(quantityCell);
    quantityCell.appendChild(quantity);
    tableRow.appendChild(priceCell);
    tableRow.appendChild(deleteCell);
    deleteCell.appendChild(formDelete);
    formDelete.appendChild(buttonDelete);
    buttonDelete.appendChild(iconDelete);
}



let form = document.forms['orderForm'];
let formLength = form.elements.length - 1;
let errorMessage = [
    "Ce champ ne doit comporter que des lettres ou des tirets. Ex: Eric, Adeline...",
    "Ce champ ne doit comporter que des lettres. Ex: Macron, Griezmann, Pogba...",
    "Ce champ doit commencer par le n° puis le nom de la rue. Ex: 23 rue principale",
    "Ce champ ne doit comporter que des lettres ou des tirets. Ex: Paris, Lyon, Marseille...",
    "Ce champ doit respecter le format des adresses mails. Ex: exemple@gmail.com..."
]

for(let i = 0; i < formLength; i++){
    let element = form.elements[i];
    let missValue = element.parentNode.querySelector("span");
    element.oninvalid = function(e) {
        e.preventDefault();
        if (!e.target.validity.valid) {
            element.className = "text-capitalize form-control border-danger shadow-none";
            if (e.target.value.length == 0) {
                console.log("good" + i);
                missValue.textContent = "Veuillez renseigner le champ"
            } else {
                missValue.textContent = errorMessage[i];
            }
        }
    };
}


function order(){
    const orderForm = document.getElementById("form");
    orderForm.addEventListener('submit', function(e) {
        if(localStorage.length == 0){
            submitError.textContent = "Il n'y a aucun article dans le panier";
            e.preventDefault();
        }else{
            localStorage["totalPrice"] = totalPrice;
            let myHeader = new Headers({'Content-Type': 'application/json'});
            e.preventDefault();
            const targ = e.target;
            const contact = new Contact(targ.firstName.value, targ.lastName.value, targ.address.value, targ.city.value, targ.email.value);
            const postJSON = JSON.stringify({contact, products});
            fetch(postURL, {
                method: "POST",
                headers : myHeader,
                body : postJSON,
            })
            .then(response => response.json())
            .then(json => localStorage.setItem("order", JSON.stringify(json)))
            .then(function(){location.href = "lastPage.html"})
            .catch(error => alert("Erreur POST : " + error))
        }  
    })
}




if(localStorage.length == 0){
    let basketSection = document.getElementById("basket");
    const basketNullPara = document.createElement('p');
    basketNullPara.textContent = "Votre panier est vide";
    basketNullPara.className = "text-center";
    basketSection.appendChild(basketNullPara);
}else{
    console.log(localStorage);
    for (let i = 0; i < localStorage.length; i++) {
        let objKey = localStorage.key(i);
        let objLinea = localStorage.getItem(objKey);
        let objJson = JSON.parse(objLinea);
        let id = objJson.id; 
        let idURL = requestURL + "/" + id;
        fetch(idURL)
            .then(function(response){
                return response.json();
            })
            .then(function(response){
                return showBasket(response, i);
            })
            .catch(function(error){
                return alert("Erreur : " + error)
            });
    }
}

