/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Footer from '../../components/Footer'
import './index.css'
import Navbar from '../../components/Navbar'
import Counter from '../../components/Counter'

class Cart extends Component {
  state = {isCartEmpty: true, isPaid: false}

  // ----[  event modules ] ----

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
    const modNullCarts = carts.map(cartItem => {
      if (cartItem.id === id) {
        if (cartItem.quantity > 1) {
          return {...cartItem, quantity: cartItem.quantity - 1}
        }
        return '*'
      }
      return cartItem
    })
    const modifiedCartItems = modNullCarts.filter(cartItem => cartItem !== '*')
    localStorage.setItem('cartData', JSON.stringify(modifiedCartItems))
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

  doPayment = () => {
    localStorage.setItem('cartData', JSON.stringify([]))
    this.setState({isPaid: true, isCartEmpty: false})
  }

  removeAllCartItems = () => {
    localStorage.setItem('cartData', JSON.stringify([]))
    this.setState({isCartEmpty: true})
  }

  // ---- [  sub modules ] ----

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

  renderRemoveBtn = () => (
    <div id="cartHeader" className="d-flex justify-content-end mb-2">
      <button
        type="button"
        className="btn btn-danger"
        onClick={this.removeAllCartItems}
      >
        Remove All
      </button>
    </div>
  )

  renderPaymentBlock = () => (
    <div className="d-flex justify-content-end mt-3">
      <button
        type="button"
        className="btn btn-warning text-white"
        onClick={this.doPayment}
      >
        Place Order
      </button>
    </div>
  )

  renderSuccessView = () => {
    localStorage.setItem('cartData', JSON.stringify([]))
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

  renderTotalCost = () => {
    const parsedCartItems = JSON.parse(localStorage.getItem('cartData'))
    let totalCost = 0
    parsedCartItems.map(cartItem => {
      totalCost += cartItem.quantity * cartItem.cost
      return cartItem
    })
    return totalCost
  }

  renderFoodImage = url => <img src={url} alt="food" className="food-image" />

  renderFoodDetails = cartItem => {
    const removeItem = () => this.onRemoveItem(cartItem.id)
    const increaseItem = () => this.onIncreaseItem(cartItem.id)
    return (
      <div className="d-flex flex-column justify-content-center flex-lg-row justify-content-lg-between align-items-lg-center flex-grow-1 p-2">
        <h1 className="fs-4 w-200px">{cartItem.name}</h1>
        <Counter
          quantity={cartItem.quantity}
          onRemoveItem={removeItem}
          onIncreaseItem={increaseItem}
        />
        <h1 className="fs-5">Rs. {cartItem.cost * cartItem.quantity}</h1>
      </div>
    )
  }

  renderCard = cartItem => (
    <li className="border-rounded d-flex mb-3" key={cartItem.id}>
      {this.renderFoodImage(cartItem.image_url)}
      {this.renderFoodDetails(cartItem)}
    </li>
  )

  renderCartCards = () => {
    const stringifiedCartItems = localStorage.getItem('cartData')
    const parsedCartItems = JSON.parse(stringifiedCartItems)
    if (stringifiedCartItems === null || parsedCartItems.length === 0) {
      this.setState({isCartEmpty: true})
    }
    return (
      <ul className="col-12 col-lg-8">
        {parsedCartItems.map(cartItem => this.renderCard(cartItem))}
      </ul>
    )
  }

  renderSummaryCard = () => {
    const rowBetweenClass = 'd-flex justify-content-between align-items-center'
    const deliveryCharges = 0
    const deliveryChargesView = deliveryCharges === 0 ? 'FREE' : deliveryCharges
    return (
      <div className="col-12 col-lg-4 bg-warning-subtle p-3 align-self-lg-start">
        <h1 className="fs-4 fw-bold">ORDER SUMMARY:</h1>
        <div className="bg-white p-2">
          <h1 className="fs-4">
            Products-<span className="badge bg-info">1</span>
          </h1>
          <hr />
          <div className={rowBetweenClass}>
            <h1 className="fs-4">Product Total</h1>
            <b className="fs-4">Rs.{this.renderTotalCost()}</b>
          </div>
          <hr />
          <div className={rowBetweenClass}>
            <h1 className="fs-4">Delivery</h1>
            <b className="fs-4">{deliveryChargesView}</b>
          </div>
          <hr />
          <div className={rowBetweenClass}>
            <b className="fs-4">Total</b>
            <b className="fs-3">
              Rs.{this.renderTotalCost() + deliveryCharges}
            </b>
          </div>
          {this.renderPaymentBlock()}
        </div>
      </div>
    )
  }

  renderCartItems1 = () => (
    <div className="container mt-3 mb-3 h-25">
      {this.renderRemoveBtn()}
      <div className="row">
        {this.renderCartCards()}
        {this.renderSummaryCard()}
      </div>
    </div>
  )

  renderView = () => {
    const {isCartEmpty, isPaid} = this.state
    if (isPaid) {
      return this.renderSuccessView()
    }
    return isCartEmpty ? this.renderEmptyCart() : this.renderCartItems1()
  }

  render() {
    return (
      <>
        <Navbar activeNav="CART" />
        {this.renderView()}
        <Footer />
      </>
    )
  }
}

export default Cart
