/* global Product, Cart */

'use strict';

// On screen load, we call this method to put all of the product options
function populateForm() {
  const selectElement = document.getElementById('items');

  for (let i in Product.allProducts) {
    let opt = document.createElement('option');
    opt.value = Product.allProducts[i].name;
    opt.text = Product.allProducts[i].name;
    selectElement.appendChild(opt);
  }
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {
  event.preventDefault();
  let formEl = document.getElementById('catalog');

  let name = event.target.items.value;
  let quantity = event.target.quantity.value;

  addSelectedItemToCart(name, Number(quantity));
  saveToLocalStorage(allItems);
  updateCounter();
  updateCartPreview();
}

// Add the selected item and quantity to the cart
function addSelectedItemToCart(name, quantity) {
  if (Number(quantity) > 0) {
    let storedData = localStorage.getItem('cart');
    if (storedData) {
      allItems = JSON.parse(storedData);

      let done = false;
      for (let i = 0; i < allItems.length; i++) {
        if (allItems[i].product == name) {
          let num = Number(allItems[i].quantity);
          allItems[i].quantity = num + Number(quantity);
          done = true;
        }
      }
      if (!done) {
        addItem(name, quantity);
      }
    } else {
      addItem(name, quantity);
    }
    document.getElementById('quantity').value = 0;
  }
}

function updateCounter() {
  allItems = JSON.parse(localStorage.getItem('cart'));

  let totalItems = 0;
  for (let i = 0; i < allItems.length; i++) {
    totalItems += allItems[i].quantity;
  }

  document.getElementById('itemCount').textContent = totalItems;
}

// (item & quantity) in the cart preview div
function updateCartPreview() {
  allItems = JSON.parse(localStorage.getItem('cart'));

  let divEl = document.getElementById('cartContents');
  divEl.innerHTML = '';
  let ulEl = document.createElement('ul');
  divEl.appendChild(ulEl);
  for (let i = 0; i < allItems.length; i++) {
    let liEl = document.createElement('li');
    liEl.textContent = `${allItems[i].product} - Qty: ${allItems[i].quantity}`;
    ulEl.appendChild(liEl);
  }
}

// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Fill drop down list in the form.
populateForm();

let storedData = localStorage.getItem('cart');
if (storedData) {
  updateCartPreview();
  updateCounter();
}
