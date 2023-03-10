import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../utils/firebase'
import '../Styles/LoginStyles.css'
import '../Styles/loader.css'
import { MAX_PASSWORD_LENGTH } from '../utils/Constants'

const Login = props => {
  const { setUser, setActiveItem } = props
  const [email, setEmail] = useState({
    value: '',
    errorMessage: ''
  })
  const [password, setPassword] = useState({
    value: '',
    errorMessage: ''
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const [mode, setMode] = useState('SIGN IN')

  const changeMode = () => {
    if (mode === 'SIGN IN') {
      setMode('REGISTER')
    } else {
      setMode('SIGN IN')
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setIsLoading(true)

    // Checking if the user exists already
    const q = query(collection(db, 'users'), where('email', '==', email.value))
    const querySnapshot = await getDocs(q)

    if (mode === 'REGISTER') {
      // Check For Password Being Atleast 6 Characters
      let timeoutNum = 1000
      if (querySnapshot.empty) {
        if (password.value.length < MAX_PASSWORD_LENGTH) {
          setTimeout(() => {
            setIsLoading(false)
          }, timeoutNum)
          setErrorMessage('WEAK_PASSWORD : Password should be at least 6 characters')
          return
        }

        try {
          const docRef = await addDoc(collection(db, 'users'), {
            email: email.value,
            password: password.value,
            orders: []
          })
          // set the user to localStorage
          const user = {
            email: email.value,
            password: password.value,
            orders: [],
            id: docRef.id
          }
          // ? SETTING THE POST-SIGNUP SETTINGS
          localStorage.setItem('user', JSON.stringify(user)) //?STORE THE USER IN LOCAL storage
          setUser(user)
          setActiveItem('Burger Builder')
          if (location.state) {
            // User was redirected from the burger builder page
            navigate('/checkout', {
              state: {
                selectedIngredients: location.state.selectedIngredients,
                price: location.state.price
              }
            })
          } else {
            navigate('/')
          }
        } catch (e) {
          setErrorMessage(e.message)
        }
      } else {
        setErrorMessage('EMAIL_EXISTS')
        setIsLoading(false)
      }
    }
    // for SIGN IN
    else {
      const loginQuery = query(
        collection(db, 'users'),
        where('email', '==', email.value),
        where('password', '==', password.value)
      )
      const loginQuerySnapShot = await getDocs(loginQuery)

      if (loginQuerySnapShot.empty) {
        setErrorMessage('INVALID_CREDENTIALS')
      } else {
        // print loginQuerySnapShot
        var user = {}
        loginQuerySnapShot.forEach(doc => {
          user = {
            email: doc.data().email,
            password: doc.data().password,
            orders: doc.data().orders,
            id: doc.id
          }
        })
        // console.log('logged IN ', user)
        // ? POST-LOG IN SETTINGS
        localStorage.setItem('user', JSON.stringify(user)) //?STORE THE USER IN LOCAL storage
        setUser(user)
        setActiveItem('Burger Builder')
        // This Navigation will depened if the user was redirected from the burger builder page
        if (location.state) {
          // User was redirected from the burger builder page

          navigate('/checkout', {
            state: {
              selectedIngredients: location.state.selectedIngredients,
              price: location.state
            }
          })
          // console.log(location.state.selectedIngredients)
        } else {
          // console.log('No ingredients selected')
          navigate('/')
        }
      }
      setIsLoading(false)
    }
  }

  return (
    <main className='main'>
      <div className='form-container'>
        {errorMessage && <p id='error'> {errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          {isLoading ? (
            <section className='loader'>loader...</section>
          ) : (
            <>
              <div>
                <input
                  type='email'
                  id='email'
                  placeholder='E-mail Address'
                  value={email.value}
                  onChange={event => {
                    if (event.target.value.length === 0)
                      setEmail({
                        value: event.target.value,
                        errorMessage: 'Please enter a valid email'
                      })
                    else {
                      setEmail({
                        value: event.target.value,
                        errorMessage: ''
                      })
                    }
                  }}
                />
                {email.errorMessage && <p className='field-error'>{email.errorMessage}</p>}
              </div>
              <div>
                <input
                  type='password'
                  id='password'
                  placeholder='Password'
                  value={password.value}
                  onChange={event => {
                    if (event.target.value.length < MAX_PASSWORD_LENGTH)
                      setPassword({
                        value: event.target.value,
                        errorMessage: 'Please enter a valid'
                      })
                    else {
                      setPassword({
                        value: event.target.value,
                        errorMessage: ''
                      })
                    }
                  }}
                />
                {password.errorMessage && <p className='field-error'>{password.errorMessage}</p>}
              </div>
            </>
          )}
          <button type='submit' className='buttons button-success'>
            SUBMIT
          </button>
        </form>
        <button onClick={changeMode} className='buttons button-auth'>
          {mode === 'SIGN IN' ? 'REGISTER' : 'SIGN IN'}
        </button>
      </div>
    </main>
  )
}
Login.propTypes = {
  setUser: PropTypes.func.isRequired,
  setActiveItem: PropTypes.func.isRequired
}

export default Login
