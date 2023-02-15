import React from 'react'
import '../Styles/HomeStyles.css'
import PropTypes from 'prop-types'

const BurgerBuilder = props => {
  const {
    user,
    price,
    Lettuce,
    Cheese,
    Bacon,
    Meat,
    removeIngredient,
    addIngredient,
    isEmpty,
    signUp,
    orderNow,
    animateButton
  } = props
  return (
    <div id='burger-builder-container'>
      {/* Price */}
      <p id='price-text' className='mt-2'>
        Current price: <strong>${price.toFixed(2)}</strong>
      </p>
      {/* Ingredients */}
      <div className='ingredients'>
        <p className='ingredients-text'>Lettuce</p>
        <div className='ingredient-actions'>
          <button
            disabled={Lettuce === 0}
            className={'ingredient-button remove-button ' + (Lettuce === 0 ? 'disabled' : '')}
            onClick={() => removeIngredient('Lettuce')}
          >
            Less
          </button>
          <button className='ingredient-button add-button' onClick={() => addIngredient('Lettuce')}>
            More
          </button>
        </div>
      </div>
      <div className='ingredients'>
        <p className='ingredients-text'>Bacon</p>
        <div className='ingredient-actions'>
          <button
            disabled={Bacon === 0}
            className={'ingredient-button remove-button ' + (Bacon === 0 ? 'disabled' : '')}
            onClick={() => removeIngredient('Bacon')}
          >
            Less
          </button>
          <button className='ingredient-button add-button' onClick={() => addIngredient('Bacon')}>
            More
          </button>
        </div>
      </div>
      <div className='ingredients'>
        <p className='ingredients-text'>Cheese</p>
        <div className='ingredient-actions'>
          <button
            disabled={Cheese === 0}
            className={'ingredient-button remove-button ' + (Cheese === 0 ? 'disabled' : '')}
            onClick={() => removeIngredient('Cheese')}
          >
            Less
          </button>
          <button className='ingredient-button add-button' onClick={() => addIngredient('Cheese')}>
            More
          </button>
        </div>
      </div>
      <div className='ingredients'>
        <p className='ingredients-text'>Meat</p>
        <div className='ingredient-actions'>
          <button
            disabled={Meat === 0}
            className={'ingredient-button remove-button ' + (Meat === 0 ? 'disabled' : '')}
            onClick={() => removeIngredient('Meat')}
          >
            Less
          </button>
          <button className='ingredient-button add-button' onClick={() => addIngredient('Meat')}>
            More
          </button>
        </div>
      </div>
      <button
        id='order-button'
        disabled={isEmpty()}
        className={animateButton ? 'enabled-animation' : '' + (isEmpty() ? 'disabled' : '')}
        onClick={user === null ? signUp : orderNow}
      >
        {user === null ? 'SIGN UP FOR ORDER' : 'ORDER NOW'}
      </button>
    </div>
  )
}

BurgerBuilder.propTypes = {
  addIngredient: PropTypes.func.isRequired,
  removeIngredient: PropTypes.func.isRequired,
  orderNow: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired,
  isEmpty: PropTypes.func.isRequired,
  Lettuce: PropTypes.number,
  Bacon: PropTypes.number,
  Cheese: PropTypes.number,
  Meat: PropTypes.number,
  user: PropTypes.object,
  animateButton: PropTypes.bool.isRequired
}

export default BurgerBuilder
