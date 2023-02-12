import React, { useState } from "react";

import "./OrderStyles.css";

const Orders = (props) => {
  const { user } = props;

  const orders = [
    {
      ingredients: {
        Lettuce: 2,
        Bacon: 3,
        Cheese: 1,
        Meat: 2,
      },
      price: 10,
    },
  ];

  return (
    <main className="main">
      {orders.map((data) => {
        return (
          <div key={Math.random()} className="order">
            <p>
              Ingredients :<span>Bacon ({data.ingredients.Bacon})</span>
              <span>Cheese ({data.ingredients.Cheese})</span>
              <span>Lettuce ({data.ingredients.Lettuce})</span>
              <span>Meat ({data.ingredients.Meat})</span>
            </p>
            <p>
              Price <strong>USD {data.price.toFixed(2)}</strong>
            </p>
          </div>
        );
      })}
    </main>
  );
};

export default Orders;
