let requestURL = "http://localhost:3000/api/cameras";
let postURL = requestURL + "/order" ; 
const productSelect = localStorage["productSelect"];
let products = [];


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
        const myH3 = document.createElement('h3');
        const myPara = document.createElement('p');
        const formDelete = document.createElement('form');
        const buttonDelete = document.createElement('button');
        const iconDelete = document.createElement('i');

        products.push(objJson._id);
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
    localStorage["requestURL"] = requestURL;
    localStorage["productSelect"] = productSelect;
}

async function order(){
    const orderForm = document.querySelector('form');
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const targ = e.target;
        const contact = new Contact(targ.lastName.value, targ.firstName.value, targ.address.value, targ.city.value, targ.email.value);
        const postJSON = JSON.stringify({contact, products});
        console.log(postJSON);
        fetch(postURL, {
            method: "POST",
            body : postJSON,
        })
        .catch(error => alert("Erreur POST : " + error))
    })
}

/*async function asyncFunction(){
    try{
        console.log(products);
        console.log(localStorage);
        await showBasket();
        await order();
    }catch(error){
        alert("Erreur : " + error)
    }
}


asyncFunction();
*/



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






