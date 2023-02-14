import React, { useEffect, useState } from "react";
import TopBun from "../Assets/Images/Top_Bun.png";
import BottomBun from "../Assets/Images/Bottom_Bun.png";
import "../Styles/CheckoutStyles.css";
import { styles } from "../Styles/HomeStyles";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const Checkout = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [price, setprice] = useState(null);
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

  const cancelOrder = () => {
    props.setActiveItem("Burger Builder");
    navigate("/", {
      replace: true,
    });
  };

  useEffect(() => {
    if (location.state) {
      setSelectedIngredients(location.state.selectedIngredients);
      setprice(location.state.price);
    } else {
      console.log("Not redirected from any page");
      navigate("/", {
        replace: true,
      });
    }
  }, []);

  return (
    <div id="home-container">
      <h1>We hope it tastes well!</h1>
      <div id="burger-container">
        {
          //? Divide in 4 divs 1 for each ingredient
        }
        {
          // TODO: Change Top And Bottom Bun Images
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
      <button className="button" onClick={cancelOrder} id="cancel">
        Cancel
      </button>
      <Link to={"contact-data"} className="button" id="continue">
        Continue
      </Link>
      <Outlet context={[selectedIngredients, price]} />
    </div>
  );
};

export default Checkout;
