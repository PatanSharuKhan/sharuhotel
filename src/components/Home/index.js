/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import ReactSlick from 'react-slick'
import {BsArrowLeftSquare, BsArrowRightSquare} from 'react-icons/bs'
import {AiFillCloseCircle, AiFillStar} from 'react-icons/ai'
import Navbar from '../Navbar'
import Buffer from '../Buffer'
import RestaurantHeader from '../RestaurantHeader'
import Footer from '../Footer'
import './index.css'

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
    isNavHided: true,
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

  removePermission = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  updateMenu = () => {
    this.setState(prev => ({
      isNavHided: !prev.isNavHided,
    }))
  }

  renderCarousal = () => {
    const settings = {
      arrows: false,
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
    }
    const {offers} = this.state
    return (
      <ReactSlick {...settings}>
        {offers.map(each => (
          <li key={each.id} className="carousal-item">
            <div>
              <img
                src={each.image_url}
                alt="offer"
                className="carousal_image"
              />
            </div>
          </li>
        ))}
      </ReactSlick>
    )
  }

  renderRestaurantList = () => {
    const {restaurants} = this.state
    return restaurants.map(each => {
      const userRating = each.user_rating
      return (
        <li className="restaurant_card" key={each.id} testid="restaurant-item">
          <Link to={`/restaurant/${each.id}`} className="restaurant-data">
            <img
              src={each.image_url}
              alt="restaurant"
              className="restaurant-thumbnail"
            />
            <div className="restaurant-thumbnail-data">
              <h4 className="restaurant_card-title">{each.name}</h4>
              <p>fast food</p>
              <div>
                <p className="restaurant_card-rating">
                  <AiFillStar color="gold" />
                  <span className="restaurant_card-rate">
                    {userRating.rating}
                  </span>
                  ({userRating.total_reviews} reviews)
                </p>
              </div>
            </div>
          </Link>
        </li>
      )
    })
  }

  renderPagination = () => {
    const {offset, LIMIT, total} = this.state
    const activePage = Math.ceil(offset / 9) + 1
    const totalPages = Math.ceil(total / LIMIT)
    return (
      <>
        <button
          type="button"
          testid="pagination-left-button"
          onClick={this.DecreaseByOnePage}
          className={`${offset === 0 ? 'btn-disabled' : 'btn-able'}`}
        >
          <BsArrowLeftSquare fill="orange" className="arrow" />
        </button>
        <p>
          <span testid="active-page-number">{activePage}</span> of {totalPages}
        </p>
        <button
          type="button"
          testid="pagination-right-button"
          onClick={this.IncreaseByOnePage}
          className={`${offset + LIMIT > total ? 'btn-disabled' : 'btn-able'}`}
        >
          <BsArrowRightSquare fill="orange" className="arrow" />
        </button>
      </>
    )
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

  render() {
    const {
      isLoadingBuffer,
      isLoadingContent,
      isNavHided,
      sortOption,
    } = this.state
    return (
      <div className="home-container">
        <div className="navbar_outer-box">
          <Navbar
            removePermission={this.removePermission}
            updateMenu={this.updateMenu}
          />
        </div>

        {isNavHided ? null : (
          <div className="navbar_hide-menu">{this.renderHideMenu()}</div>
        )}

        <ul className="carousal-box">
          {isLoadingBuffer ? <Buffer /> : this.renderCarousal()}
        </ul>

        <div className="restaurant-header">
          <RestaurantHeader
            updateSortOption={this.updateSortOption}
            activeSort={sortOption}
          />
        </div>

        <hr />

        <ul className="restaurant-list-box">
          {isLoadingContent ? <Buffer /> : this.renderRestaurantList()}
        </ul>

        <div className="pagination">{this.renderPagination()}</div>

        <div className="footer-box">
          <Footer />
        </div>
      </div>
    )
  }
}

export default Home
