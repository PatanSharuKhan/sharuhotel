import {
  FaPinterestSquare,
  FaFacebookSquare,
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa'
import './index.css'

const Footer = () => {
  const renderLogoBlock = () => (
    <div id="footerHeaderBox" className="d-flex mb-2">
      <img
        id="footerHeaderIcon"
        className="me-2"
        src="https://res.cloudinary.com/ddm4qkgda/image/upload/v1675755895/Frame_275_xlqbhc.png"
        alt="website-footer-logo"
      />
      <h1>Tasty Kitchens</h1>
    </div>
  )

  const renderDescriptionBlock = () => (
    <p id="footerDesc" className="mb-2">
      The only thing we are serious about is food. Contact us on
    </p>
  )

  const renderSocialIconsBlock = () => (
    <ul className="footer-social-icons d-flex ps-0">
      <li>
        <FaPinterestSquare testid="pintrest-social-icon" />
      </li>
      <li>
        <FaInstagram testid="instagram-social-icon" />
      </li>
      <li>
        <FaTwitter testid="twitter-social-icon" />
      </li>
      <li>
        <FaFacebookSquare testid="facebook-social-icon" />
      </li>
    </ul>
  )

  const footerBoxClasses =
    'd-flex flex-column justify-content-center align-items-center text-white bg-black'
  return (
    <div id="footerBox" className={footerBoxClasses}>
      {renderLogoBlock()}
      {renderDescriptionBlock()}
      {renderSocialIconsBlock()}
    </div>
  )
}

export default Footer
