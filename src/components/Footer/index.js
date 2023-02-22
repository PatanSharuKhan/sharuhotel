import {
  FaPinterestSquare,
  FaFacebookSquare,
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa'
import './index.css'

const Footer = () => {
  const renderLogoSection = () => (
    <div className="footer_logo-box">
      <img
        className="footer_logo-img"
        src="https://res.cloudinary.com/ddm4qkgda/image/upload/v1675755895/Frame_275_xlqbhc.png"
        alt="website-footer-logo"
      />
      <h1>Tasty Kitchens</h1>
    </div>
  )
  const renderDescription = () => (
    <p className="footer_desc">
      The only thing we are serious about is food. Contact us on
    </p>
  )
  const renderSocialIcons = () => (
    <ul className="footer_social-icons-box">
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
  return (
    <>
      {renderLogoSection()}
      {renderDescription()}
      {renderSocialIcons()}
    </>
  )
}

export default Footer
