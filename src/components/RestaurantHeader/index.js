import {MdOutlineSort} from 'react-icons/md'
import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const RestaurantHeader = props => {
  const {updateSortOption} = props
  const changeSort = event => {
    updateSortOption(event.target.value)
  }
  return (
    <>
      <div>
        <h1>Popular Restaurants</h1>
        <p>
          Select Your favourite restaurant special dish and make your day
          happy...
        </p>
      </div>
      <div className="sorting-container">
        <MdOutlineSort className="sort-icon" />

        <p>Sort By</p>
        <select className="select-sort" id="select" onChange={changeSort}>
          {sortByOptions.map(each => (
            <option key={each.id} value={each.value}>
              {each.displayText}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}
export default RestaurantHeader
