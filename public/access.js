const Url = "http://localhost:3000/api/v1/drums";
const button = document.getElementById("addButton");
const data = {};

const field = document.getElementById("bigFeild");
const inputData = () => {
  data.id = 15;
  data.name = document.getElementById("productname").value;
  data.brand = document.getElementById("brand").value;
  data.price = document.getElementById("price").value;
  data.url = document.getElementById("url").value;
};
button.addEventListener("click", () => inputData());
function append(baseElem, ...args) {
  return args.forEach(arg => baseElem.appendChild(arg));
}
const createItem = (name, brand, price, url) => {
  field.setAttribute("class", "col-lg-9");
  const cardField = document.createElement("div");
  cardField.setAttribute("class", "card mt-4");
  const img = document.createElement("img");
  img.setAttribute("class", "card-img-top img-fluid");
  img.setAttribute("alt", "");
  img.setAttribute("src", `${url}`);
  const cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");
  const nameTag = document.createElement("h4");
  nameTag.textContent = `NAME: ${name}`;
  const brandTag = document.createElement("h4");
  brandTag.textContent = `BRAND: ${brand}`;
  const priceTag = document.createElement("h4");
  priceTag.textContent = `PRICE: ${price}`;
  append(cardBody, nameTag, brandTag, priceTag);
  append(cardField, img, cardBody);
  append(field, cardField);
};
$(document).ready(function() {
  $("#showButton").click(function() {
    $.get(Url, function(drums, status) {
      drums.map(drum => {
        const { name, brand, price, url } = drum;
        createItem(name, brand, price, url);
      });
    });
  });
});

$(document).ready(function() {
  $("#addButton").click(function() {
    $.post(Url, data, function(data, status) {
      inputData();
      console.log(`${data} and status is ${status}`);
    });
  });
});
