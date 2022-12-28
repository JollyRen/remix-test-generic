import { useState } from 'react'
import { useFetcher } from '@remix-run/react'
import SingleRA from './SingleRA'

const SingleRoutine = ({ routine, localState }) => {
  // create a search form for activities using useFetcher() call to /activities/allactivities loader
  // filter activity by name, description on submit
  // if activity selected, set some local state

  // each activity in the list (filtered or not) will have an "attach" button that does a useFetcher() to /routines/$routineId, _action = 'attachActToRoutine'.
  // input for set and duration when activity is selected

  //
  // useFetcher for Routine_Activity update and delete
  // current routine
  const {
    id,
    creatorId,
    isPublic,
    name,
    goal,
    creatorName,
    activities // for formatting
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

  // map and filter callbacks
  const routineActMapCB = (activity) => <SingleRA key={activity.id} activity={activity} />

  // filters and maps
  const activitiesMap = activities.map(routineActMapCB)

  // event handlers
  const handleAddActivity = () => setIsAddSearch(!isAddSearch)
  const handleInputChange = (e) => setInputValue(e.target.value)
  const handleRoutineSelected = () => setSingleRoutine(routine)
  const handleSetFilterBy = (e) => setFilterBy(e.target.value)
  const handleSearch = (e) => {
    e.preventDefault()
    setFilterValue(inputValue)
    setInputValue('')
  }

  return (
    <li
      onClick={handleRoutineSelected}
      style={{ listStyleType: 'none', backgroundColor: 'rgb(0,0,0,0.1)', padding: '8px' }}>
      <h4>Name: {name}</h4>
      <p>Creator: {creatorName}</p>
      <p>Goal: {goal}</p>
      <strong>Activities: </strong>
      <ul>{!!activitiesMap.length && activitiesMap}</ul>
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
      <hr />
    </li>
  )
}
export default SingleRoutine
