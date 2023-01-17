import { useFetcher } from '@remix-run/react'
import { useState } from 'react'
import SingleRA from './SingleRA'

const SelectedRoutine = ({ routine, localState }) => {
  const fetcher = useFetcher()
  const {
    id,
    creatorId,
    isPublic,
    name,
    goal,
    creatorName,
    activities //formatting
  } = routine

  // setters from above
  const {
    filterBy,
    setSingleRoutine,
    setFilterValue,
    setFilterBy // for formatting
  } = localState

  // search flag
  const [isAddSearch, setIsAddSearch] = useState(false)
  // input state
  const [inputValue, setInputValue] = useState('')

  //event handlers
  const handleAddActivity = () => setIsAddSearch(!isAddSearch)
  const handleInputChange = (e) => setInputValue(e.target.value)
  const handleSetFilterBy = (e) => setFilterBy(e.target.value)
  const handleSearch = (e) => {
    e.preventDefault()
    setFilterValue(inputValue.toLowerCase())
    setInputValue('')
  }

  return (
    <section style={{ padding: '20px', backgroundColor: 'rgb(0,0,0,0.1)' }}>
      <h3>{name} </h3>
      <p>Creator's Name: {creatorName}</p>
      <p>Goal: {goal}</p>
      <p>Activities: </p>
      <ul>
        {!activities.length ? (
          <p>No Activities listed for this routine yet</p>
        ) : (
          activities.map((RA) => <SingleRA key={RA.id} activity={RA} />)
        )}
      </ul>
      {isAddSearch ? (
        <div>
          <p style={{ cursor: 'pointer', color: 'blue' }} onClick={handleAddActivity}>
            Stop Searching
          </p>
          <form onSubmit={handleSearch}>
            <label htmlFor="input">
              Search for an Activity
              <input title="input" type="text" onChange={handleInputChange} value={inputValue} />
            </label>
            <button type="submit">Search</button>
            <fieldset>
              <legend>Filter By</legend>
              <label htmlFor="name">
                Name
                <input
                  title="name"
                  onClick={handleSetFilterBy}
                  type="radio"
                  value="name"
                  checked={filterBy == 'name'}
                  readOnly
                />
              </label>
              <label htmlFor="desc">
                Description
                <input
                  title="desc"
                  type="radio"
                  onClick={handleSetFilterBy}
                  value="description"
                  checked={filterBy == 'description'}
                  readOnly
                />
              </label>
            </fieldset>
          </form>
        </div>
      ) : (
        <p style={{ cursor: 'pointer', color: 'blue' }} onClick={handleAddActivity}>
          Add Activity?
        </p>
      )}
    </section>
  )
}
export default SelectedRoutine
