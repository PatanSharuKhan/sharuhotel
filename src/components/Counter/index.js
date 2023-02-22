/* eslint-disable react/no-unknown-property */
import {Component} from 'react'

import './index.css'

class Counter extends Component {
  onDecrement = () => {
    const {onRemoveItem} = this.props
    onRemoveItem()
  }

  onIncrement = () => {
    const {onIncreaseItem} = this.props
    onIncreaseItem()
  }

  render() {
    const {quantity} = this.props
    return (
      <div className="counter_box">
        <span testid="decrement-count">
          <button
            type="button"
            onClick={this.onDecrement}
            testid="decrement-quantity"
          >
            -
          </button>
        </span>
        <span testid="active-count">
          <div className="counter_count" testid="item-quantity">
            {quantity}
          </div>
        </span>
        <span testid="increment-count">
          <button
            type="button"
            onClick={this.onIncrement}
            testid="increment-quantity"
          >
            +
          </button>
        </span>
      </div>
    )
  }
}

export default Counter
