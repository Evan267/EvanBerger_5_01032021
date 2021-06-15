let requestURL = localStorage["requestURL"];
const productSelect = localStorage["productSelect"];
let totalPrice = localStorage["totalPrice"];

let objLinea = localStorage.getItem("order");
let objJson = JSON.parse(objLinea);

console.log(objJson);

const thanks = document.getElementById("text");
thanks.innerHTML = "Bonjour M/Mme " + objJson.contact.firstName + " " + objJson.contact.lastName + ",<br> Nous vous remercions de votre commande. Le prix total est de " + totalPrice/100 + " € et le numéro de la commande est " + objJson.orderId + ".";


localStorage.clear();
localStorage["requestURL"] = requestURL;
localStorage["productSelect"] = productSelect;
