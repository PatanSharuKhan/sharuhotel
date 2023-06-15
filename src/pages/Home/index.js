/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import Navbar from '../../components/Navbar'
import Buffer from '../../components/Buffer'
import RestaurantHeader from '../../components/RestaurantHeader'
import Footer from '../../components/Footer'
import './index.css'
import Carousal from '../../components/Carousal'

class Home extends Component {
  state = {
    offers: [],
    isLoadingBuffer: false,
    isLoadingContent: false,
    offset: 0,
    LIMIT: 9,
    total: 0,
    restaurants: [],
    sortOption: 'Lowest',
  }

  componentDidMount() {
    this.fetchCarousal()
    this.fetchRestaurants()
  }

  fetchCarousal = async () => {
    this.setState({isLoadingBuffer: true})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const {offers} = data
      this.setState({offers, isLoadingBuffer: false})
    }
  }

  fetchRestaurants = async () => {
    this.setState({isLoadingContent: true})
    const {offset, LIMIT, sortOption} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}&sort_by_rating=${sortOption}`
    const options = {
      method: 'GET',
      headers: {authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const {restaurants} = data
      const {total} = data
      this.setState({restaurants, isLoadingContent: false, total})
    }
  }

  updateSortOption = option => {
    this.setState(
      {sortOption: option, offset: 0, LIMIT: 9},
      this.fetchRestaurants,
    )
  }

  DecreaseByOnePage = () => {
    const {offset, LIMIT} = this.state
    if (offset !== 0) {
      this.setState({offset: offset - LIMIT}, this.fetchRestaurants)
    }
  }

  IncreaseByOnePage = () => {
    const {offset, LIMIT, total} = this.state
    if (offset < total && total - offset >= LIMIT) {
      this.setState({offset: offset + LIMIT}, this.fetchRestaurants)
    }
  }

  renderCarousalBlock = () => {
    const {isLoadingBuffer, offers} = this.state
    return (
      <ul className="container mt-2">
        {isLoadingBuffer ? <Buffer /> : <Carousal offers={offers} />}
      </ul>
    )
  }

  renderRestaurantHeaderBlock = () => {
    const {sortOption} = this.state
    return (
      <div className="container d-lg-flex justify-content-lg-between align-items-lg-end mb-2">
        <RestaurantHeader
          updateSortOption={this.updateSortOption}
          activeSort={sortOption}
        />
      </div>
    )
  }

  renderRestaurantListBlock = () => {
    const {isLoadingContent} = this.state
    return isLoadingContent ? <Buffer /> : this.renderRestaurantList()
  }

  renderRestaurantImage = url => (
    <img src={url} alt="restaurant" className="restaurant-thumbnail" />
  )

  renderRestaurantDesc = restaurant => {
    const userRating = restaurant.user_rating
    return (
      <div className="restaurant-data d-flex flex-column justify-content-center ps-2">
        <h4 className="restaurant_card-title">{restaurant.name}</h4>
        <p className="mb-0">{restaurant.cuisine}</p>
        <div>
          <p className="restaurant_card-rating mb-0">
            <AiFillStar color="gold" />
            <span className="restaurant_card-rate me-1">
              {userRating.rating}
            </span>
            ({userRating.total_reviews} reviews)
          </p>
        </div>
      </div>
    )
  }

  renderRestaurantCard = () => {
    const {restaurants} = this.state
    return restaurants.map(restaurant => (
      <Link
        key={restaurant.id}
        to={`/restaurant/${restaurant.id}`}
        className="restaurant-data col-12 col-md-6 col-lg-4 mb-2"
      >
        <li className="list-unstyled d-flex p-2" testid="restaurant-item">
          {this.renderRestaurantImage(restaurant.image_url)}
          {this.renderRestaurantDesc(restaurant)}
        </li>
      </Link>
    ))
  }

  renderRestaurantList = () => (
    <div className="container">
      <ul id="restaurantListBox" className="row ps-0">
        {this.renderRestaurantCard()}
      </ul>
    </div>
  )

  renderPreviousBtn = offset => (
    <li
      //   className="page-item disabled"
      testid="pagination-left-button"
      onClick={this.DecreaseByOnePage}
      className={offset === 0 ? 'page-item disabled' : 'c-pointer page-item '}
    >
      <p className="page-link">Previous</p>
    </li>
  )

  renderCounter = (activePage, totalPages) => (
    <li className="page-item ">
      <p className="page-link bg-orange text-white">
        {activePage} of {totalPages}
      </p>
    </li>
  )

  renderNextBtn = (offset, LIMIT, total) => (
    <li
      testid="pagination-right-button"
      onClick={this.IncreaseByOnePage}
      className={`${
        offset + LIMIT > total ? 'disabled page-item' : 'c-pointer page-item'
      }`}
    >
      <p className="page-link">Next</p>
    </li>
  )

  renderPagination = () => {
    const {offset, LIMIT, total} = this.state
    const activePage = Math.ceil(offset / 9) + 1
    const totalPages = Math.ceil(total / LIMIT)
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          {this.renderPreviousBtn(offset)}
          {this.renderCounter(activePage, totalPages)}
          {this.renderNextBtn(offset, LIMIT, total)}
        </ul>
      </nav>
    )
  }

  renderPaginationBlock = () => {
    const {isLoadingContent} = this.state
    return (
      !isLoadingContent && (
        <div className="container d-flex justify-content-center align-items-center mt-3 mb-3">
          {this.renderPagination()}
        </div>
      )
    )
  }

  render() {
    return (
      <>
        <Navbar activeNav="HOME" />
        {this.renderCarousalBlock()}
        {this.renderRestaurantHeaderBlock()}
        <hr className="container mb-1" />
        {this.renderRestaurantListBlock()}
        <hr className="container mb-1" />
        {this.renderPaginationBlock()}
        <Footer />
      </>
    )
  }
}

export default Home
