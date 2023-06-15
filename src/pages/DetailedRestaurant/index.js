/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Cookies from 'js-cookie'
import Navbar from '../../components/Navbar'
import Banner from '../../components/Banner'
import FoodCard from '../../components/FoodCard'
import Buffer from '../../components/Buffer'
import Footer from '../../components/Footer'
import './index.css'

class DetailedRestaurant extends Component {
  state = {
    foodItems: [],
    restaurantDetails: [],
    isLoading: false,
  }

  componentDidMount() {
    this.fetchRestaurantDetails()
  }

  fetchRestaurantDetails = async () => {
    this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const foodItems = data.food_items
      this.setState({foodItems, restaurantDetails: data, isLoading: false})
    }
  }

  addItem = id => {
    //   on click add button update both state and local storage.
    const {foodItems} = this.state
    const modList = foodItems.map(each => {
      if (each.id === id) {
        let carts
        const isCartDataEmpty = () => {
          carts = JSON.parse(localStorage.getItem('cartData'))
          if (carts === null) return true
          return false
        }

        if (isCartDataEmpty()) {
          localStorage.setItem(
            'cartData',
            JSON.stringify([{...each, quantity: 1}]),
          )
        } else {
          localStorage.setItem(
            'cartData',
            JSON.stringify([...carts, {...each, quantity: 1}]),
          )
        }
        return {...each, quantity: 1}
      }
      return each
    })
    this.setState({foodItems: modList})
  }

  increaseItem = id => {
    //   increasing the product quantity in local storage
    const carts = JSON.parse(localStorage.getItem('cartData'))
    const modCarts = carts.map(each => {
      if (each.id === id) {
        return {...each, quantity: each.quantity + 1}
      }
      return each
    })
    localStorage.setItem('cartData', JSON.stringify(modCarts))
    //   increasing the product quantity in state
    const {foodItems} = this.state
    const modFoodItems = foodItems.map(each => {
      if (each.id === id) {
        return {...each, quantity: each.quantity + 1}
      }
      return each
    })
    this.setState({foodItems: modFoodItems})
  }

  decreaseItem = id => {
    // if one quantity then remove product in localStorage
    // if more quantity then reduce quantity in localStorage
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

    // if one quantity then remove product in State
    // if more quantity then reduce quantity in State
    const {foodItems} = this.state
    const modFoodItems = foodItems.map(each => {
      if (each.id === id) {
        return {...each, quantity: each.quantity - 1}
      }
      return each
    })
    this.setState({foodItems: modFoodItems})
  }

  // --------sub blocks-------------------------------------------

  renderFoodList = () => {
    const {foodItems} = this.state
    return foodItems.map(each => (
      <FoodCard
        key={each.id}
        each={each}
        addItem={this.addItem}
        decreaseItem={this.decreaseItem}
        increaseItem={this.increaseItem}
      />
    ))
  }

  renderBuffer = () => <Buffer testid="restaurant-details-loader" />

  renderBanner = restaurantDetails => (
    <Banner bannerDetails={restaurantDetails} />
  )

  // --------main blocks-------------------------------------------

  renderBannerBlock = () => {
    const {restaurantDetails, isLoading} = this.state

    const code = isLoading
      ? this.renderBuffer()
      : this.renderBanner(restaurantDetails)
    return code
  }

  renderFoodItemsBlock = () => {
    const {isLoading} = this.state
    return isLoading ? (
      <Buffer />
    ) : (
      <div className="container mt-3">
        <h1>Dishes Available</h1>
        <hr />
        <ul className="row ps-0">{this.renderFoodList()}</ul>
      </div>
    )
  }

  render() {
    return (
      <>
        <Navbar />
        {this.renderBannerBlock()}
        {this.renderFoodItemsBlock()}
        <Footer />
      </>
    )
  }
}

export default DetailedRestaurant
