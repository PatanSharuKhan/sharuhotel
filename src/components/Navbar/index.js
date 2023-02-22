import {Link} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import './index.css'

const Navbar = props => {
  const {removePermission, updateMenu} = props
  const renderImage = () => (
    <img
      className="navbar_logo"
      src="https://res.cloudinary.com/ddm4qkgda/image/upload/v1675511877/Frame_274_u2ev4l.png"
      alt="website logo"
    />
  )
  const renderLogoTitle = () => <h1 className="navbar_title">Tasty Kitchens</h1>

  const renderLinks = () => (
    <ul className="navbar_links-box">
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
          onClick={removePermission}
        >
          Logout
        </button>
      </li>
    </ul>
  )
  const renderHamburger = () => (
    <button type="button" className="navbar_hamburger-btn" onClick={updateMenu}>
      <GiHamburgerMenu className="navbar_hamburger-icon" />
    </button>
  )

  return (
    <div className="navbar_inner-box">
      <Link to="/" className="d-flex-logo">
        {renderImage()}
        {renderLogoTitle()}
      </Link>
      {renderHamburger()}
      {renderLinks()}
    </div>
  )
}

export default Navbar
