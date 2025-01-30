const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

// endpoint 1. total price of the items

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalCartPrice = newItemPrice + cartTotal;
  res.send(totalCartPrice.toString());
});

//endpoint 2. Apply a discount based on membership status
function applyDiscount(cartTotal) {
  let discount = 10; // 10%
  return cartTotal - cartTotal * (discount / 100);
}
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  if (isMember) {
    cartTotal = applyDiscount(cartTotal);
    res.send(cartTotal.toString());
  } else {
    res.send(cartTotal.toString());
  }
});

//Endpoint 3 : Calculate tax on the cart total
function applyTax(cartTotal) {
  let tax = 5; // 5%
  return cartTotal * (tax / 100);
}
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  cartTotal = applyTax(cartTotal);
  res.send(cartTotal.toString());
});

// Endpoint 4 : Estimate delivery time based on shipping method

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let deliverDay;
  if (shippingMethod == 'standard') {
    deliverDay = distance / 50;
  } else {
    deliverDay = distance / 100;
  }
  res.send(deliverDay.toString());
});

//Endpoint 5 : Calculate the shipping cost based on weight and distance

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});

//Endpoint 6 : Calculate loyalty points earned from a purchase

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = purchaseAmount * 2;
  res.send(loyaltyPoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
