import React, { useEffect, useState } from 'react'
import '../Styles/HomeStyles.css'
import { useNavigate } from 'react-router-dom'
import OrderConfirmationModal from '../Components/Modal'
import Burger from './Burger'
import BurgerBuilder from './BurgerBuilder'
import PropTypes from 'prop-types'

const Home = props => {
  const { user, setActiveItem } = props
  const [price, setPrice] = useState(0)
  const [animateButton, setAnimate] = useState(false)
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  let navigate = useNavigate()

  // List of Ingredients and their prices
  const Ingredients = {
    Lettuce: 0.5,
    Bacon: 0.7,
    Cheese: 0.4,
    Meat: 1.3
  }
  // Selected Ingredients
  const [selectedIngredients, setSelectedIngredients] = useState({
    Lettuce: {
      present: 0,
      removed: 0
    },
    Bacon: {
      present: 0,
      removed: 0
    },
    Cheese: {
      present: 0,
      removed: 0
    },
    Meat: {
      present: 0,
      removed: 0
    }
  })

  const addIngredient = item => {
    setSelectedIngredients({
      ...selectedIngredients,
      [item]: {
        ...selectedIngredients[item],
        present: selectedIngredients[item].present + 1
      }
    })

    // if all present selected ingredients == 0
    let timeoutNum = 500
    if (
      Object.keys(selectedIngredients).every(ingredient => {
        return selectedIngredients[ingredient].present === 0
      })
    ) {
      setAnimate(true)
      setTimeout(() => {
        setAnimate(false)
      }, timeoutNum)
    }
  }

  const removeIngredient = item => {
    setSelectedIngredients({
      ...selectedIngredients,
      [item]: {
        present: selectedIngredients[item].present - 1,
        removed: selectedIngredients[item].removed + 1
      }
    })
  }

  const isEmpty = () =>
    Object.keys(selectedIngredients).every(ingredient => {
      return selectedIngredients[ingredient].present === 0
    })

  // Update Price When A New Ingredient is added or removed
  useEffect(() => {
    let newPrice = 3
    Object.keys(selectedIngredients).forEach(ingredient => {
      newPrice +=
        Ingredients[ingredient] * selectedIngredients[ingredient].present +
        Ingredients[ingredient] * selectedIngredients[ingredient].removed * 2
    })
    // The Price of removedIngredients will be double counted
    // 1- for the original ingredient
    // 2- for the removed ingredient

    setPrice(newPrice)
  }, [selectedIngredients])

  const orderNow = () => {
    setShow(true)
  }

  const checkout = () => {
    setActiveItem('None')
    navigate('/checkout', {
      state: {
        selectedIngredients: selectedIngredients,
        price: price
      }
    })
  }

  const signUp = () => {
    setActiveItem('Login')
    navigate('/auth', {
      state: {
        selectedIngredients: selectedIngredients,
        price: price
      }
    })
  }

  return (
    <div className='home-container'>
      <OrderConfirmationModal
        show={show}
        handleClose={handleClose}
        price={price}
        Lettuce={selectedIngredients.Lettuce.present}
        Bacon={selectedIngredients.Bacon.present}
        Cheese={selectedIngredients.Cheese.present}
        Meat={selectedIngredients.Meat.present}
        checkout={checkout}
      />
      {
        //? Center Burger
      }
      <Burger
        Lettuce={selectedIngredients.Lettuce.present}
        Bacon={selectedIngredients.Bacon.present}
        Cheese={selectedIngredients.Cheese.present}
        Meat={selectedIngredients.Meat.present}
        isEmpty={isEmpty}
      />
      {
        //? Burger Ingredients
      }
      <BurgerBuilder
        Lettuce={selectedIngredients.Lettuce.present}
        Bacon={selectedIngredients.Bacon.present}
        Cheese={selectedIngredients.Cheese.present}
        Meat={selectedIngredients.Meat.present}
        isEmpty={isEmpty}
        orderNow={orderNow}
        addIngredient={addIngredient}
        removeIngredient={removeIngredient}
        signUp={signUp}
        animateButton={animateButton}
        user={user}
        price={price}
      />
    </div>
  )
}
Home.propTypes = {
  user: PropTypes.object,
  setActiveItem: PropTypes.func
}

export default Home
