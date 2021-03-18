let requestURL = localStorage["requestURL"];
const productSelect = localStorage["productSelect"];
let postURL = requestURL + "/order" ; 
let totalPrice = localStorage["totalPrice"];

let objLinea = localStorage.getItem("order");
let objJson = JSON.parse(objLinea);

const myPara = document.querySelector('p');
myPara.innerHTML = "Bonjour M/Mme " + objJson.contact.firstName + " " + objJson.contact.lastName + ", <br> Nous vous remercions de votre commande. Le prix total est de " + totalPrice/100 + " € et le numéro de la commande est " + objJson.orderId + ".";

localStorage.clear();
localStorage["requestURL"] = requestURL;
localStorage["productSelect"] = productSelect;
console.log(localStorage);