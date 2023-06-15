import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'

const localStorageCartKey = 'cartData'

class Navbar extends Component {
  state = {isNavHided: false}

  updateMenu = () => {
    const {isNavHided} = this.state
    this.setState({
      isNavHided: !isNavHided,
    })
  }

  removePermission = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  //   -----------[ sub blocks ]----------------

  cartItemsCount = () => {
    const stringifiedCartItems = localStorage.getItem(localStorageCartKey)
    if (stringifiedCartItems === null) {
      return 0
    }
    const parsedCartItems = JSON.parse(stringifiedCartItems)
    return parsedCartItems.length
  }

  renderHomeLink = () => {
    const {activeNav} = this.props
    const isHomeActive = activeNav === 'HOME'
    return (
      <li>
        <Link to="/" className={isHomeActive ? 'text-orange' : 'text-black'}>
          Home
        </Link>
      </li>
    )
  }

  renderCartLink = () => {
    const {activeNav} = this.props
    const isCartActive = activeNav === 'CART'
    return (
      <li>
        <Link
          to="/cart"
          className={isCartActive ? 'text-orange' : 'text-black'}
        >
          Cart
          <span className="badge text-light bg-success ms-1">
            {this.cartItemsCount()}
          </span>
        </Link>
      </li>
    )
  }

  renderLogoutButton = () => (
    <li>
      <button
        type="button"
        className="btn btn-warning text-white p-1 b-0"
        onClick={this.removePermission}
      >
        Logout
      </button>
    </li>
  )

  renderCrossButton = () => (
    <li>
      <AiFillCloseCircle id="navbarCloseBtn" onClick={this.updateMenu} />
    </li>
  )

  //   -----------[ main blocks ]----------------

  renderHiddenLinks = () => (
    <ul
      id="hiddenLinksBox"
      className="d-flex justify-content-center ps-0 d-lg-none"
    >
      {this.renderHomeLink()}
      {this.renderCartLink()}
      {this.renderLogoutButton()}
      {this.renderCrossButton()}
    </ul>
  )

  renderLinks = () => (
    <ul id="linksBox">
      {this.renderHomeLink()}
      {this.renderCartLink()}
      {this.renderLogoutButton()}
    </ul>
  )

  renderHamburger = () => (
    <button type="button" id="hamburgerBtn" onClick={this.updateMenu}>
      <GiHamburgerMenu id="hamburgerIcon" />
    </button>
  )

  renderLogoTitle = () => (
    <h1 id="navbarTitle" className="text-orange">
      Tasty Kitchens
    </h1>
  )

  renderImage = () => (
    <img
      id="navbarLogo"
      className="me-2"
      src="https://res.cloudinary.com/ddm4qkgda/image/upload/v1675511877/Frame_274_u2ev4l.png"
      alt="website logo"
    />
  )

  render() {
    const {isNavHided} = this.state
    const navbarSectionClasses = 'container-fluid p-2 sticky-top'
    const navbarContainerClasses =
      'container d-flex justify-content-between align-items-center'
    const navbarLogoBlockClasses = 'd-flex align-items-center'
    return (
      <div id="navbarSection" className={navbarSectionClasses}>
        <div id="navbarContainer" className={navbarContainerClasses}>
          <Link to="/" id="navbarLogoBlock" className={navbarLogoBlockClasses}>
            {this.renderImage()}
            {this.renderLogoTitle()}
          </Link>
          {this.renderHamburger()}
          {this.renderLinks()}
        </div>
        {isNavHided && this.renderHiddenLinks()}
      </div>
    )
  }
}

export default withRouter(Navbar)
