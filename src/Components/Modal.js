import { Modal } from 'reactstrap'
import '../Styles/HomeStyles.css'
import PropTypes from 'prop-types'

const OrderConfirmationModal = props => {
  const { show, handleClose, price, Lettuce, Bacon, Cheese, Meat, checkout } = props
  return (
    <Modal isOpen={show} size='md' centered={true} className='modal'>
      <div className='modal-body'>
        <div>
          <h3>Your Order Summary:</h3>
          <ul>
            <li>
              <span className='ingreds'>lettuce</span>: {Lettuce}
            </li>
            <li>
              <span className='ingreds'>bacon</span>: {Bacon}
            </li>
            <li>
              <span className='ingreds'>cheese</span>: {Cheese}
            </li>
            <li>
              <span className='ingreds'>meat</span>: {Meat}
            </li>
          </ul>
          <p>
            <strong>Total Price: ${price.toFixed(2)}</strong>
          </p>
          <p>Continue to Checkout?</p>
          <button id='cancel' onClick={handleClose}>
            CANCEL
          </button>
          <button id='continue' onClick={checkout}>
            CONTINUE
          </button>
        </div>
      </div>
    </Modal>
  )
}
OrderConfirmationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  price: PropTypes.number,
  Lettuce: PropTypes.number,
  Bacon: PropTypes.number,
  Cheese: PropTypes.number,
  Meat: PropTypes.number,
  checkout: PropTypes.func.isRequired
}

export default OrderConfirmationModal
