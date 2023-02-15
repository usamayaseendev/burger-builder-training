import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../utils/firebase'

import '../Styles/OrderStyles.css'

const Orders = () => {
  const [orders, setorders] = useState([])

  const getOrders = async () => {
    // get the order from firestore
    // query = query();
    let email = JSON.parse(localStorage.getItem('user')).email
    // console.log('user', email)

    const q = query(collection(db, 'users'), where('email', '==', email))
    const querySnapshot = await getDocs(q)
    let ordersData = []
    if (!querySnapshot.empty) {
      querySnapshot.forEach(doc => {
        // console.log('doc data = ', doc.data())
        ordersData.push(...doc.data().orders)
      })
      // console.log('ordersData', ordersData)
      setorders(ordersData)
    } else {
      // console.log('hello')
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  if (orders.length == 0) {
    return (
      <main className='main'>
        <h1>You have no orders</h1>
      </main>
    )
  }

  return (
    <main className='main'>
      {orders.map(data => {
        return (
          <div key={Math.random()} className='order'>
            <p>
              Ingredients :<span>Bacon ({data.ingredients.Bacon.present})</span>
              <span>Cheese ({data.ingredients.Cheese.present})</span>
              <span>Lettuce ({data.ingredients.Lettuce.present})</span>
              <span>Meat ({data.ingredients.Meat.present})</span>
            </p>
            <p>
              Price <strong>USD {data.price.toFixed(2)}</strong>
            </p>
          </div>
        )
      })}
    </main>
  )
}

export default Orders
