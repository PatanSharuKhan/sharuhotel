/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Footer from '../Footer'
import './index.css'
import Navbar from '../Navbar'
import Counter from '../Counter'

class Cart extends Component {
  state = {isCartEmpty: true, isPaid: false}

  componentDidMount() {
    const cartItems = JSON.parse(localStorage.getItem('cartData'))
    if (cartItems === null || cartItems.length === 0) {
      this.setState({isCartEmpty: true})
    } else {
      this.setState({isCartEmpty: false})
    }
  }

  onRemoveItem = id => {
    const carts = JSON.parse(localStorage.getItem('cartData'))
    const modNullCarts = carts.map(each => {
      if (each.id === id) {
        if (each.quantity === 1) {
          return null
        }
        return {...each, quantity: each.quantity - 1}
      }
      return each
    })
    const modCarts = modNullCarts.filter(each => each !== null)
    localStorage.setItem('cartData', JSON.stringify(modCarts))
    this.setState({isCartEmpty: false})
  }

  onIncreaseItem = id => {
    const carts = JSON.parse(localStorage.getItem('cartData'))
    const modCarts = carts.map(each => {
      if (each.id === id) {
        return {...each, quantity: each.quantity + 1}
      }
      return each
    })
    localStorage.setItem('cartData', JSON.stringify(modCarts))
    this.setState({isCartEmpty: false})
  }

  doPayment = () => this.setState({isPaid: true})

  renderTotalCost = () => {
    const carts = JSON.parse(localStorage.getItem('cartData'))
    let totalCost = 0
    carts.map(each => {
      totalCost += each.quantity * each.cost
      return each
    })
    return <h1 testid="total-price">Rs.{totalCost}</h1>
  }

  renderEmptyCart = () => (
    <div className="cart_empty-box">
      <img
        src="https://res.cloudinary.com/ddm4qkgda/image/upload/v1676027111/cooking_1_jtzan3.png"
        alt="empty cart"
        className="cart_empty-image"
      />
      <h1 className="cart_empty-title">No Order Yet!</h1>
      <p className="cart_empty-desc">
        Your cart is empty. Add something from the menu.
      </p>
      <Link to="/">
        <button type="button" className="cart_empty-btn">
          Order Now
        </button>
      </Link>
    </div>
  )

  renderCartItems = () => {
    const carts = JSON.parse(localStorage.getItem('cartData'))
    if (carts.length === 0) {
      this.setState({isCartEmpty: true})
    }
    return (
      <div className="cart_list-box">
        {/* cart header appear in desktop mode */}
        <ul className="cart_list-header">
          <li>Item</li>
          <li>Quantity</li>
          <li>Price</li>
        </ul>
        {/* cart items will be responsive  */}
        <ul className="cart_list-body">
          {carts.map(each => {
            const removeItem = () => this.onRemoveItem(each.id)
            const increaseItem = () => this.onIncreaseItem(each.id)
            return (
              <li className="cart_list-item" key={each.id} testid="cartItem">
                <img
                  src={each.image_url}
                  alt="food"
                  className="cart_item-image"
                />
                <div className="cart_list_item-name">
                  <p>{each.name}</p>
                  <Counter
                    quantity={each.quantity}
                    onRemoveItem={removeItem}
                    onIncreaseItem={increaseItem}
                  />
                  <p>Rs. {each.cost * each.quantity}</p>
                </div>
              </li>
            )
          })}
        </ul>
        <hr className="border-dashed" />
        {/* total cost will be displayed */}
        <div>
          <div className="cart_order-total">
            <h1>Order Total:</h1>
            {this.renderTotalCost()}
          </div>
          <div className="cart_order-btn">
            <button
              type="button"
              className="place-order-btn"
              onClick={this.doPayment}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    )
  }

  renderPayment = () => {
    localStorage.removeItem('cartData')
    return (
      <div className="cart_empty-box">
        <img
          src="https://res.cloudinary.com/ddm4qkgda/image/upload/v1676426876/Vector_wshsdz.png"
          alt="payment success"
          className="cart_success-image"
        />
        <h1 className="cart_empty-title">Payment Successful</h1>
        <p className="cart_empty-desc">Thank you for ordering.</p>
        <p className="cart_empty-desc">
          Your payment is successfully completed.
        </p>
        <Link to="/">
          <button type="button" className="cart_empty-btn">
            Go To Home Page
          </button>
        </Link>
      </div>
    )
  }

  render() {
    const {isCartEmpty, isPaid} = this.state
    let code
    if (isPaid) {
      code = this.renderPayment()
    } else {
      code = isCartEmpty ? this.renderEmptyCart() : this.renderCartItems()
    }
    return (
      <div className="cart_box">
        <div className="navbar_outer-box">
          <Navbar />
        </div>
        {code}
        <div className="footer-box">
          <Footer />
        </div>
      </div>
    )
  }
}

export default Cart
