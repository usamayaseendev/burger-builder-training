import React, { useEffect, useState } from "react";
import TopBun from "../Assets/Images/Top_Bun.png";
import BottomBun from "../Assets/Images/Bottom_Bun.png";
import "./HomeStyles.css";
import { styles } from "../Styles/HomeStyles";
// Create Home Component with just a text saying welcome to Home
const Home = (props) => {
  const [price, setPrice] = useState(0);
  const [animateButton, setAnimate] = useState(false);
  // const [removedIngredients, setRemovedIngredients] = useState([]);
  // List of Ingredients and their prices
  const Ingredients = {
    Lettuce: 0.5,
    Bacon: 0.7,
    Cheese: 0.4,
    Meat: 1.3,
  };
  // Selected Ingredients
  const [selectedIngredients, setSelectedIngredients] = useState({
    Lettuce: {
      present: 0,
      removed: 0,
    },
    Bacon: {
      present: 0,
      removed: 0,
    },
    Cheese: {
      present: 0,
      removed: 0,
    },
    Meat: {
      present: 0,
      removed: 0,
    },
  });

  const addIngredient = (item) => {
    setSelectedIngredients({
      ...selectedIngredients,
      [item]: {
        ...selectedIngredients[item],
        present: selectedIngredients[item].present + 1,
      },
    });
  };

  const removeIngredient = (item) => {
    setSelectedIngredients({
      ...selectedIngredients,
      [item]: {
        present: selectedIngredients[item].present - 1,
        removed: selectedIngredients[item].removed + 1,
      },
    });
  };

  // Update Price When A New Ingredient is added or removed
  useEffect(() => {
    let newPrice = 3;
    Object.keys(selectedIngredients).forEach((ingredient) => {
      newPrice +=
        Ingredients[ingredient] * selectedIngredients[ingredient].present +
        Ingredients[ingredient] * selectedIngredients[ingredient].removed * 2;
    });
    // The Price of removedIngredients will be double counted
    // 1- for the original ingredient
    // 2- for the removed ingredient

    setPrice(newPrice);
  }, [selectedIngredients]);

  // TODO: Create Order Now Logic
  const orderNow = () => {
    setAnimate(true);
    // wait for 2 seconds and set animate to false
    setTimeout(() => {
      setAnimate(false);
    }, 2000);
  };

  return (
    <div id="home-container">
      {
        //? Center Burger
      }
      <div id="burger-container" className="border border-5 border-primary">
        {
          //? Divide in 4 divs 1 for each ingredient
        }
        <img src={TopBun} alt="Top Bun" id="bun-top-image" />
        {selectedIngredients.Lettuce.present +
          selectedIngredients.Bacon.present +
          selectedIngredients.Cheese.present +
          selectedIngredients.Meat.present ===
        0 ? (
          <p id="empty-burger">No Ingredients Added</p>
        ) : (
          <>
            {
              //? Letuces
            }
            {Array(selectedIngredients.Lettuce.present)
              .fill(true)
              .map(() => (
                <div style={styles.lettuce}></div>
              ))}
            {
              //? Beacon
            }
            {Array(selectedIngredients.Bacon.present)
              .fill(true)
              .map(() => (
                <div style={styles.bacon}></div>
              ))}
            {
              //? Cheese
            }
            {Array(selectedIngredients.Cheese.present)
              .fill(true)
              .map(() => (
                <div style={styles.cheese}></div>
              ))}
            {
              //? Meat
            }
            {Array(selectedIngredients.Meat.present)
              .fill(true)
              .map(() => (
                <div style={styles.meat}></div>
              ))}
          </>
        )}
        <img src={BottomBun} alt="Bottom Bun" id="bun-bottom-image" />
      </div>
      {
        //? Burger Ingredients
      }
      <div id="burger-builder-container">
        {/* Price */}
        <p id="price-text" className="mt-2">
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
              disabled={selectedIngredients.Lettuce.present === 0}
              className={
                "ingredient-button remove-button " +
                (selectedIngredients.Lettuce.present === 0 ? "disabled" : "")
              }
              onClick={() => removeIngredient("Lettuce")}
            >
              Less
            </button>
            <button
              className="ingredient-button add-button"
              onClick={() => addIngredient("Lettuce")}
            >
              More
            </button>
          </div>
        </div>
        <div class="ingredients">
          <p className="ingredients-text">Bacon</p>
          <div className="ingredient-actions">
            <button
              disabled={selectedIngredients.Bacon.present === 0}
              className={
                "ingredient-button remove-button " +
                (selectedIngredients.Bacon.present === 0 ? "disabled" : "")
              }
              onClick={() => removeIngredient("Bacon")}
            >
              Less
            </button>
            <button
              className="ingredient-button add-button"
              onClick={() => addIngredient("Bacon")}
            >
              More
            </button>
          </div>
        </div>
        <div className="ingredients">
          <p className="ingredients-text">Cheese</p>
          <div className="ingredient-actions">
            <button
              disabled={selectedIngredients.Cheese.present === 0}
              className={
                "ingredient-button remove-button " +
                (selectedIngredients.Cheese.present === 0 ? "disabled" : "")
              }
              onClick={() => removeIngredient("Cheese")}
            >
              Less
            </button>
            <button
              className="ingredient-button add-button"
              onClick={() => addIngredient("Cheese")}
            >
              More
            </button>
          </div>
        </div>
        <div className="ingredients">
          <p className="ingredients-text">Meat</p>
          <div className="ingredient-actions">
            <button
              disabled={selectedIngredients.Meat.present === 0}
              className={
                "ingredient-button remove-button " +
                (selectedIngredients.Meat.present === 0 ? "disabled" : "")
              }
              onClick={() => removeIngredient("Meat")}
            >
              Less
            </button>
            <button
              className="ingredient-button add-button"
              onClick={() => addIngredient("Meat")}
            >
              More
            </button>
          </div>
        </div>
        {
          //TODO: Checks for Empty CART
        }
        <button
          id="order-button"
          disabled={
            selectedIngredients.Bacon.present === 0 &&
            selectedIngredients.Lettuce.present === 0 &&
            selectedIngredients.Cheese.present === 0 &&
            selectedIngredients.Meat.present === 0
          }
          // TODO: Make it Animate when Cart is not empty for the first time
          className={
            animateButton
              ? "enabled-animation"
              : "" + selectedIngredients.Bacon.present === 0 &&
                selectedIngredients.Lettuce.present === 0 &&
                selectedIngredients.Cheese.present === 0 &&
                selectedIngredients.Meat.present === 0
              ? "disabled"
              : ""
          }
          onClick={orderNow}
        >
          ORDER NOW
        </button>
      </div>
    </div>
  );
};

export default Home;
