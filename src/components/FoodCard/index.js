/* eslint-disable react/no-unknown-property */
import './index.css'
import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import Counter from '../Counter'

class FoodCard extends Component {
  render() {
    const {each, addItem, decreaseItem, increaseItem} = this.props
    const addToCart = () => {
      addItem(each.id)
    }
    const onRemoveItem = () => {
      decreaseItem(each.id)
    }
    const onIncreaseItem = () => {
      increaseItem(each.id)
    }
    return (
      <li className="food_card-box" testid="foodItem">
        <img
          src={each.image_url}
          alt="restaurant"
          className="food_card-image"
        />
        <div className="food_card-data">
          <p className="food_card-title">{each.name}</p>
          <p>Rs.{each.cost}</p>
          <p className="food_card-rating">
            <AiFillStar fill="gold" />
            {each.rating}
          </p>
          {/* if the quantity in cart is zero then (add-button) will be displayed else (counter) */}
          {each.quantity > 0 ? (
            <Counter
              quantity={each.quantity}
              onRemoveItem={onRemoveItem}
              onIncreaseItem={onIncreaseItem}
            />
          ) : (
            <button
              type="button"
              className="food_card-add-btn"
              onClick={addToCart}
            >
              ADD
            </button>
          )}
        </div>
      </li>
    )
  }
}
export default FoodCard
