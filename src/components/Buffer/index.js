/* eslint-disable react/no-unknown-property */
import Loader from 'react-loader-spinner'
import './index.css'

const Buffer = () => (
  // eslint-disable-next-line react/no-unknown-property
  <span testid="restaurants-list-loader">
    <span testid="restaurants-offers-loader">
      <div testid="loader " className="loader-container">
        <Loader type="Oval" width="40px" height="40px" color="orange" />
      </div>
    </span>
  </span>
)

export default Buffer
