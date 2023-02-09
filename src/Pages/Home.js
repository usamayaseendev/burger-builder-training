import React, { useEffect, useState } from "react";
import TopBun from "../Assets/Images/Top_Bun.png";
import BottomBun from "../Assets/Images/Bottom_Bun.png";
import "./HomeStyles.css";
// Create Home Component with just a text saying welcome to Home
const Home = (props) => {
  const [price, setPrice] = useState(0);
  // List of Ingredients and their prices
  const Ingredients = {
    Lettuce: 0.5,
    Bacon: 0.7,
    Cheese: 0.4,
    Meat: 1.3,
  };
  // Selected Ingredients
  const [selectedIngredients, setSelectedIngredients] = useState({
    Lettuce: 0,
    Bacon: 0,
    Cheese: 0,
    Meat: 0,
  });

  // Update Price When A New Ingredient is added or removed
  useEffect(() => {
    const price =
      3 +
      Ingredients.Lettuce * selectedIngredients.Lettuce +
      Ingredients.Bacon * selectedIngredients.Bacon +
      Ingredients.Cheese * selectedIngredients.Cheese +
      Ingredients.Meat * selectedIngredients.Meat;

    setPrice(price);
  }, [selectedIngredients]);

  const ChangeIngredient = (item) => {
    switch (item) {
      case "Lettuce":
        setSelectedIngredients({
          ...selectedIngredients,
          Lettuce: selectedIngredients.Lettuce + 1,
        });
        break;
      case "Bacon":
        setSelectedIngredients({
          ...selectedIngredients,
          Bacon: selectedIngredients.Bacon + 1,
        });
        break;
      case "Cheese":
        setSelectedIngredients({
          ...selectedIngredients,
          Cheese: selectedIngredients.Cheese + 1,
        });
        break;
      case "Meat":
        setSelectedIngredients({
          ...selectedIngredients,
          Meat: selectedIngredients.Meat + 1,
        });
        break;
      default:
        break;
    }
  };

  // TODO: Create Order Now Logic
  const orderNow = () => {
    // activate model
  };

  return (
    <div id="home-container">
      <div id="burger-container">
        <img src={TopBun} alt="Top Bun" id="bun-top-image" />
        <p id="empty-burger">No Ingredients Added</p>
        <img src={BottomBun} alt="Bottom Bun" id="bun-bottom-image" />
      </div>
      <div id="burger-builder-container">
        {/* Price */}
        <p id="price-text">
          Current price: <strong>${price.toFixed(2)}</strong>
        </p>
        {/* Ingredients */}
        {
          //TODO: Checks for disabled state of button
        }
        <div class="ingredients">
          <p className="ingredients-text">Lettuce</p>
          <div className="ingredient-actions">
            <button
              disabled={true}
              className="ingredient-button remove-button disabled"
              onClick={() => ChangeIngredient("Lettuce")}
            >
              Less
            </button>
            <button
              className="ingredient-button add-button disabled"
              onClick={() => ChangeIngredient("Lettuce")}
            >
              More
            </button>
          </div>
        </div>
        <div class="ingredients">
          <p className="ingredients-text">Bacon</p>
          <div className="ingredient-actions">
            <button
              className="ingredient-button remove-button"
              onClick={() => ChangeIngredient("Bacon")}
            >
              Less
            </button>
            <button
              className="ingredient-button add-button"
              onClick={() => ChangeIngredient("Bacon")}
            >
              More
            </button>
          </div>
        </div>
        <div className="ingredients">
          <p className="ingredients-text">Cheese</p>
          <div className="ingredient-actions">
            <button
              className="ingredient-button remove-button"
              onClick={() => ChangeIngredient("Cheese")}
            >
              Less
            </button>
            <button
              className="ingredient-button add-button"
              onClick={() => ChangeIngredient("Cheese")}
            >
              More
            </button>
          </div>
        </div>
        <div className="ingredients">
          <p className="ingredients-text">Meat</p>
          <div className="ingredient-actions">
            <button
              className="ingredient-button remove-button"
              onClick={() => ChangeIngredient("Meat")}
            >
              Less
            </button>
            <button
              className="ingredient-button add-button"
              onClick={() => ChangeIngredient("Meat")}
            >
              More
            </button>
          </div>
        </div>
        {
          //TODO: Checks for Empty CART
        }
        <button id="order-button" onClick={orderNow}>
          ORDER NOW
        </button>
      </div>
    </div>
  );
};

export default Home;
