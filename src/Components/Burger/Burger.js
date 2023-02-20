import TopBun from '../../Assets/Images/Top_Bun.png'
import BottomBun from '../../Assets/Images/Bottom_Bun.png'
import React from 'react'
import '../../Styles/HomeStyles'
import PropTypes from 'prop-types'
import { styles } from '../../Styles/HomeStyles'

const Burger = props => {
  const { isEmpty, Lettuce, Cheese, Bacon, Meat } = props
  return (
    <div id='burger-container'>
      {
        //? Divide in 4 divs 1 for each ingredient
      }
      <img src={TopBun} alt='Top Bun' id='bun-top-image' />
      {isEmpty() ? (
        <p id='empty-burger'>No Ingredients Added</p>
      ) : (
        <>
          {
            //? Letuces
          }
          {Array(Lettuce)
            .fill(true)
            .map(() => (
              <div key={Math.random()} style={styles.lettuce}></div>
            ))}
          {
            //? Beacon
          }
          {Array(Bacon)
            .fill(true)
            .map(() => (
              <div key={Math.random()} style={styles.bacon}></div>
            ))}
          {
            //? Cheese
          }
          {Array(Cheese)
            .fill(true)
            .map(() => (
              <div key={Math.random()} style={styles.cheese}></div>
            ))}
          {
            //? Meat
          }
          {Array(Meat)
            .fill(true)
            .map(() => (
              <div key={Math.random()} style={styles.meat}></div>
            ))}
        </>
      )}
      <img src={BottomBun} alt='Bottom Bun' id='bun-bottom-image' />
    </div>
  )
}

Burger.propTypes = {
  isEmpty: PropTypes.func.isRequired,
  Lettuce: PropTypes.number.isRequired,
  Cheese: PropTypes.number.isRequired,
  Bacon: PropTypes.number.isRequired,
  Meat: PropTypes.number.isRequired
}

export default Burger
