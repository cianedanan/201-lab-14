'use strict';

let allItems = [];

// Cart constructor.
const CartItem = function (product, quantity) {
  this.product = product;
  this.quantity = quantity;
};

function addItem(product, quantity) {
  allItems.push(new CartItem(product, quantity));
}

function saveToLocalStorage(data) {
  localStorage.setItem('cart', JSON.stringify(data));
}

function removeItem(item) {
  let storedData = localStorage.getItem('cart');
  allItems = JSON.parse(storedData);

  for (let i = 0; i < allItems.length; i++) {
    if (allItems[i].product == item) {
      allItems.splice(i, 1);
      saveToLocalStorage(allItems);
    }
  }
}

// Product constructor.
const Product = function (filePath, name) {
  this.filePath = filePath;
  this.name = name;
  Product.allProducts.push(this);
};

Product.allProducts = [];

function generateCatalog() {
  new Product('assets/bag.jpg', 'Bag');
  new Product('assets/banana.jpg', 'Banana');
  new Product('assets/bathroom.jpg', 'Bathroom');
  new Product('assets/boots.jpg', 'Boots');
  new Product('assets/breakfast.jpg', 'Breakfast');
  new Product('assets/bubblegum.jpg', 'Bubblegum');
  new Product('assets/chair.jpg', 'Chair');
  new Product('assets/cthulhu.jpg', 'Cthulhu');
  new Product('assets/dog-duck.jpg', 'Dog-Duck');
  new Product('assets/dragon.jpg', 'Dragon');
  new Product('assets/pen.jpg', 'Pen');
  new Product('assets/pet-sweep.jpg', 'Pet Sweep');
  new Product('assets/scissors.jpg', 'Scissors');
  new Product('assets/shark.jpg', 'Shark');
  new Product('assets/sweep.png', 'Sweep');
  new Product('assets/tauntaun.jpg', 'Taun-Taun');
  new Product('assets/unicorn.jpg', 'Unicorn');
  new Product('assets/water-can.jpg', 'Water Can');
  new Product('assets/wine-glass.jpg', 'Wine Glass');
}

// Initialize the app by creating the big list of products with images and names
generateCatalog();
