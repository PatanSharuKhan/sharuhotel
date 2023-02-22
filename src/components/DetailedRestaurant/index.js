import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiFillCloseCircle} from 'react-icons/ai'
import Cookies from 'js-cookie'
import Navbar from '../Navbar'
import Banner from '../Banner'
import FoodCard from '../FoodCard'
import Buffer from '../Buffer'
import Footer from '../Footer'
import './index.css'

class DetailedRestaurant extends Component {
  state = {
    isNavHided: true,
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
        //   if the local storage is empty, then create and store data.
        const carts = JSON.parse(localStorage.getItem('cartData'))
        // console.log(carts)
        if (carts === null) {
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
        // console.log({...each, quantity: 1})
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

  removePermission = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/')
  }

  updateMenu = () => {
    this.setState(prev => ({
      isNavHided: !prev.isNavHided,
    }))
  }

  renderHideMenu = () => (
    <ul className="navbar_links-box nlb">
      <li className="navbar_home-orange">
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/cart">Cart</Link>
      </li>
      <li>
        <button
          type="button"
          className="navbar_logout-btn"
          onClick={this.removePermission}
        >
          Logout
        </button>
      </li>
      <li>
        <button
          onClick={this.updateMenu}
          type="button"
          className="navbar_close-btn"
        >
          <AiFillCloseCircle />
        </button>
      </li>
    </ul>
  )

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

  render() {
    const {isNavHided, restaurantDetails, isLoading} = this.state
    return (
      <div className="detailed-restaurant-box">
        <div className="navbar_outer-box">
          <Navbar
            removePermission={this.removePermission}
            updateMenu={this.updateMenu}
          />
        </div>
        {/* navbar is hided and when clicked on hamburger then navbar will be shown */}
        {isNavHided ? null : (
          <div className="navbar_hide-menu">{this.renderHideMenu()}</div>
        )}

        {isLoading ? (
          <Buffer testid="restaurant-details-loader" />
        ) : (
          <>
            <div className="detailed_banner-outer-box">
              <Banner bannerDetails={restaurantDetails} />
            </div>
            <ul className="detailed_food-list">{this.renderFoodList()}</ul>
          </>
        )}
        <div className="footer-box">
          <Footer />
        </div>
      </div>
    )
  }
}

export default DetailedRestaurant
