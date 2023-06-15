import './index.css'
import {AiOutlineStar} from 'react-icons/ai'

const Banner = props => {
  const {bannerDetails} = props
  return (
    <div className="banner-box">
      <img
        src={bannerDetails.image_url}
        alt={bannerDetails.name}
        className="banner_image"
      />
      <div className="banner_data">
        <h1 className="banner_title">{bannerDetails.name}</h1>
        <p className="banner_cuisine">{bannerDetails.cuisine}</p>
        <p className="banner_location">{bannerDetails.location}</p>
        <div className="banner_rating_price">
          <div className="banner_rating">
            <p>
              <AiOutlineStar /> {bannerDetails.rating}
            </p>
            <p>{bannerDetails.reviews_count}+Ratings</p>
          </div>
          <div className="banner_price">
            <p>Rs. {bannerDetails.cost_for_two}</p>
            <p>Cost for two</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
