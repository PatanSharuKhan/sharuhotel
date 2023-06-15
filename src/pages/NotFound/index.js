import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/ddm4qkgda/image/upload/v1675509463/erroring_1_fks2wg.png"
      alt="not found"
      className="not-found-img"
    />
    <h1 className="not-found-title">Page Not Found</h1>
    <p className="sorry-msg">
      We are sorry, the page you requested could not be found.
    </p>
    <p className="go-back-msg">Please go back to the homepage</p>
    <Link to="/">
      <button type="button" className="home-page-btn">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
