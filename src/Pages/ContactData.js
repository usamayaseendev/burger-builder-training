import { arrayUnion, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import '../Styles/ContactDataStyles.css'
import '../Styles/loader.css'
import { db } from '../utils/firebase'

export const ContactData = () => {
  const [isLoading, setisLoading] = useState(false)
  const [selectedIngredients, price] = useOutletContext()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    street: '',
    zipCode: '',
    country: '',
    email: ''
  })

  const [errors, setErrors] = useState({
    name: '',
    street: '',
    zipCode: '',
    country: '',
    email: ''
  })

  // create on submit function
  const handleInputChange = event => {
    const { name, value } = event.target
    // console.log(event.target.name, event.target.value)
    setFormData({ ...formData, [name]: value })
    let zipLimit = 5

    switch (name) {
      case 'name':
        setErrors({ ...errors, name: value ? '' : 'Name is required' })
        break
      case 'street':
        setErrors({ ...errors, street: value ? '' : 'Street is required' })
        break
      case 'zipCode':
        setErrors({
          ...errors,
          zipCode: value.length === zipLimit ? '' : 'Zip code should be 5 digits'
        })
        break
      case 'country':
        setErrors({
          ...errors,
          country: value ? '' : 'Country is required'
        })
        break
      case 'email':
        setErrors({
          ...errors,
          email: value
            ? /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
              ? ''
              : 'Please enter a valid E-mail'
            : 'E-mail is required'
        })
        break
      default:
        break
    }
  }

  const confirmOrder = async e => {
    setisLoading(true)
    e.preventDefault()
    // console.log(formData)
    const newOrder = {
      ingredients: selectedIngredients,
      orderDetails: formData,
      price: price
    }

    // console.log('New Order ', newOrder)
    let email = JSON.parse(localStorage.getItem('user')).email
    // console.log('user', email)

    const q = query(collection(db, 'users'), where('email', '==', email))
    const querySnapshot = await getDocs(q)
    var user = {}
    querySnapshot.forEach(doc => {
      user = {
        email: doc.data().email,
        password: doc.data().password,
        orders: doc.data().orders,
        id: doc.id
      }
    })

    const docRef = doc(db, 'users', user.id)
    updateDoc(docRef, {
      orders: arrayUnion(newOrder)
      // orders: newOrder,
    }).then(() => {
      // console.log('Document updated')
      setisLoading(false)
      navigate('/', {
        replace: true
      })
    })
  }

  return (
    <div className='contact-div'>
      <h4>Enter your Contact Data</h4>
      <form onSubmit={confirmOrder}>
        {isLoading ? (
          <div className='loader'></div>
        ) : (
          <>
            <div className='input-container'>
              <label className='input-label'></label>
              <input
                type='text'
                name='name'
                className='input-fields'
                placeholder='Your Name'
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && <p className='validation-error'>{errors.name}</p>}
            </div>
            <div className='input-container'>
              <label className='input-label'></label>
              <input
                type='text'
                name='street'
                className='input-fields'
                placeholder='Street'
                value={formData.street}
                onChange={handleInputChange}
              />
              {errors.street && <p className='validation-error'>{errors.street}</p>}
            </div>
            <div className='input-container'>
              <label className='input-label'></label>
              <input
                type='text'
                name='zipCode'
                className='input-fields'
                placeholder='Zip Code'
                value={formData.zipCode}
                onChange={handleInputChange}
              />
              {errors.zipCode && <p className='validation-error'>{errors.zipCode}</p>}
            </div>
            <div className='input-container'>
              <label className='input-label'></label>
              <input
                type='text'
                name='country'
                className='input-fields'
                placeholder='Country'
                value={formData.country}
                onChange={handleInputChange}
              />
              {errors.country && <p className='validation-error'>{errors.country}</p>}
            </div>
            <div className='input-container'>
              <label className='input-label'></label>
              <input
                type='email'
                name='email'
                className='input-fields'
                placeholder='E-mail'
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <p className='validation-error'>{errors.name}</p>}
            </div>
            <div className='input-container'>
              <label className='input-label'></label>
              <select className='input-fields'>
                <option value='fastest'>Fastest</option>
                <option value='cheapest'>Cheapest</option>
              </select>
            </div>
            <button
              disabled={Object.values(formData).some(value => value === '')}
              type='submit'
              id='confirm-order-button'
            >
              ORDER
            </button>
          </>
        )}
      </form>
    </div>
  )
}
