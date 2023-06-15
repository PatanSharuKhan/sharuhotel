import './index.css'
import ReactSlick from 'react-slick'

const Carousal = ({offers}) => {
  const settings = {
    arrows: false,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  }

  return (
    <ReactSlick {...settings}>
      {offers.map(each => (
        <li key={each.id} className="carousal-item">
          <div>
            <img
              src={each.image_url}
              alt="offer"
              className="carousal-image w-100"
            />
          </div>
        </li>
      ))}
    </ReactSlick>
  )
}

export default Carousal
