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
  const {updateSortOption, activeSort} = props

  const changeSort = event => {
    updateSortOption(event.target.value)
  }

  const renderDescription = () => (
    <div>
      <h1>Popular Restaurants</h1>
      <p>
        Select Your favourite restaurant special dish and make your day happy...
      </p>
    </div>
  )

  const renderOption = each => (
    <option
      key={each.id}
      value={each.value}
      selected={activeSort === each.value ? 'selected' : ''}
    >
      {each.displayText}
    </option>
  )

  const renderSortBox = () => (
    <div className="d-flex align-items-center mb-2">
      <MdOutlineSort className="sort-icon" />
      <p className="mb-0 me-1">Rating</p>
      <select
        id="select"
        className="form-select w-150px"
        aria-label="Default select example"
        onChange={changeSort}
      >
        {sortByOptions.map(each => renderOption(each))}
      </select>
    </div>
  )

  return (
    <>
      {renderDescription()}
      {renderSortBox()}
    </>
  )
}
export default RestaurantHeader
