/* eslint-disable react/no-unknown-property */
import './index.css'
import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import Counter from '../Counter'

class FoodCard extends Component {
  state = {}

  addToCart = () => {
    const {each, addItem} = this.props
    addItem(each.id)
  }

  onRemoveItem = () => {
    const {each, decreaseItem} = this.props
    decreaseItem(each.id)
  }

  onIncreaseItem = () => {
    const {each, increaseItem} = this.props
    increaseItem(each.id)
  }

  // --------[ sub blocks ]--------------------------------------

  renderAddButton = () => (
    <button
      type="button"
      className="badge bg-warning border w-60px text-light"
      onClick={this.addToCart}
    >
      ADD
    </button>
  )

  renderCounter = () => {
    const {each} = this.props
    return (
      <Counter
        quantity={each.quantity}
        onRemoveItem={this.onRemoveItem}
        onIncreaseItem={this.onIncreaseItem}
      />
    )
  }

  renderCounterBlock = () => {
    const {each} = this.props
    if (each.quantity > 0) {
      return this.renderCounter()
    }
    return this.renderAddButton()
  }

  renderNameRatingBlock = () => {
    const {each} = this.props
    return (
      <>
        <p className="food_card-title mb-0">{each.name}</p>
        <p className="mb-0">Rs.{each.cost}</p>
        <p className="food_card-rating">
          <AiFillStar fill="gold" />
          {each.rating}
        </p>
      </>
    )
  }

  // --------main blocks--------------------------------------

  renderFoodImage = () => {
    const {each} = this.props
    return (
      <img src={each.image_url} alt="restaurant" className="food-card-image" />
    )
  }

  renderFoodDesc = () => (
    <div className="d-flex flex-column justify-content-center ms-2 food-desc flex-grow-1">
      {this.renderNameRatingBlock()}
      {this.renderCounterBlock()}
    </div>
  )

  render() {
    return (
      <li
        className="food-card col-12 col-md-6 col-lg-4 list-unstyled d-flex mb-3"
        testid="foodItem"
      >
        {this.renderFoodImage()}
        {this.renderFoodDesc()}
      </li>
    )
  }
}
export default FoodCard
