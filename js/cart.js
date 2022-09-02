/* global Cart */
'use strict';

// let cart;

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  allItems = cartItems;
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  let tbodyEl = document.querySelector('#cart tbody');
  tbodyEl.innerHTML = '';
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  let tbodyEl = document.querySelector('#cart tbody');

  for (let i = 0; i < allItems.length; i++) {
    let trEl = document.createElement('tr');
    tbodyEl.appendChild(trEl);
    let tdEl = document.createElement('td');
    trEl.appendChild(tdEl);
    let pEl = document.createElement('p');
    pEl.textContent = 'X';
    pEl.id = allItems[i].product;
    tdEl.appendChild(pEl);
    tdEl = document.createElement('td');
    tdEl.textContent = allItems[i].product;
    trEl.appendChild(tdEl);
    tdEl = document.createElement('td');
    tdEl.textContent = allItems[i].quantity;
    trEl.appendChild(tdEl);
  }
}

function removeItemFromCart(event) {
  let clickedElement = event.target.id;
  if (typeof clickedElement == 'string' && clickedElement !== '') {
    if (confirm(`Are you sure you want to delete ${clickedElement}?`)) {
      removeItem(clickedElement);
      renderCart();
    }
  }
}

// This will initialize the page and draw the cart on screen
renderCart();

document.querySelector('#cart').addEventListener('click', removeItemFromCart);
