const Url = "http://localhost:3000/api/v1/drums";
const button = document.getElementById("addButton");
const data = {};

const field = document.getElementById("bigFeild");
const inputData = () => {
  data.name = document.getElementById("productname").value;
  data.brand = document.getElementById("brand").value;
  data.price = document.getElementById("price").value;
  data.url = document.getElementById("url").value;
};
function append(baseElem, ...args) {
  return args.forEach(arg => baseElem.appendChild(arg));
}
const createItem = (id, name, brand, price, url) => {
  field.setAttribute("class", "col-lg-9");
  const cardField = document.createElement("div");
  cardField.setAttribute("class", "card mt-4");
  const img = document.createElement("img");
  img.setAttribute("class", "card-img-top img-fluid");
  img.setAttribute("alt", "");
  img.setAttribute("src", `${url}`);
  const cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");
  const idTag = document.createElement("h4");
  idTag.textContent = `ID: ${id}`;
  const nameTag = document.createElement("h4");
  nameTag.textContent = `NAME: ${name}`;
  const brandTag = document.createElement("h4");
  brandTag.textContent = `BRAND: ${brand}`;
  const priceTag = document.createElement("h4");
  priceTag.textContent = `PRICE: ${price}`;
  append(cardBody, idTag, nameTag, brandTag, priceTag);
  append(cardField, img, cardBody);
  append(field, cardField);
};
$(document).ready(function() {
  $("#showButton").click(function() {
    $.get(Url, function(drums, status) {
      const children = field.children;
      for (let i = children.length - 1; i >= 0; --i) {
        children[i].remove();
      }
      drums.map(drum => {
        const { id, name, brand, price, url } = drum;
        createItem(id, name, brand, price, url);
      });
    });
  });
});

$(document).ready(function() {
  $("#searchButton").click(function() {
    inputData();
    const target = data.name;
    $.get(`${Url}/${target}`, function(drums, status) {
      const children = field.children;
      for (let i = children.length - 1; i >= 0; --i) {
        children[i].remove();
      }
      drums.map(drum => {
        const { id, name, brand, price, url } = drum;
        createItem(id, name, brand, price, url);
      });
    });
  });
});

$(document).ready(function() {
  $("#addButton").click(function() {
    inputData();
    $.post(Url, data, function(drums, status) {
      const children = field.children;
      for (let i = children.length - 1; i >= 0; --i) {
        children[i].remove();
      }
      drums.map(drum => {
        const { id, name, brand, price, url } = drum;
        createItem(id, name, brand, price, url);
      });
    });
  });
});

$(document).ready(function() {
  $("#updateButton").click(function() {
    inputData();
    data.id = document.getElementById("productId").value;
    const target = data.id;
    $.ajax({
      url: Url + "/" + target,
      type: "PATCH",
      data: data,
      success: function(drum) {
        const children = field.children;
        for (let i = children.length - 1; i >= 0; --i) {
          children[i].remove();
        }
        const { id, name, brand, price, url } = drum[0];
        createItem(id, name, brand, price, url);
      }
    });
  });
});

$(document).ready(function() {
  $("#deleteButton").click(function() {
    inputData();
    data.id = document.getElementById("productId").value;
    target = data.id || data.name;
    console.log(target);
    $.ajax({
      url: Url + "/" + target,
      type: "DELETE",
      success: function(drums) {
        const children = field.children;
        for (let i = children.length - 1; i >= 0; --i) {
          children[i].remove();
        }
        drums.map(drum => {
          const { id, name, brand, price, url } = drum;
          createItem(id, name, brand, price, url);
        });
      }
    });
  });
});

$(document).ready(function() {
  $("#resetButton").click(function() {
    const children = field.children;
    for (let i = children.length - 1; i >= 0; --i) {
      children[i].remove();
    }
  });
});
