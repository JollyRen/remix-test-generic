import { useState } from 'react'
import { useFetcher } from '@remix-run/react'
import SingleRA from './SingleRA'

const SingleRoutine = ({ routine, localState, last }) => {
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
    setSingleRoutine // for formatting
  } = localState

  const [isSeeActs, setIsSeeActs] = useState(false)

  // map and filter callbacks
  const routineActMapCB = (activity) => <SingleRA key={activity.id} activity={activity} />

  // filters and maps
  const activitiesMap = activities.map(routineActMapCB)

  // event handlers
  const handleRoutineSelected = () => {
    setSingleRoutine(routine)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  const handleSeeActivities = () => setIsSeeActs(!isSeeActs)

  const activityList = isSeeActs ? (
    <ul>
      {!!activitiesMap.length && activitiesMap}
      <p onClick={handleSeeActivities} style={{ cursor: 'pointer', color: 'blue' }}>
        Close Activities
      </p>
    </ul>
  ) : (
    <p onClick={handleSeeActivities} style={{ cursor: 'pointer', color: 'blue' }}>
      See Activities
    </p>
  )

  return (
    <li style={{ listStyleType: 'none', backgroundColor: 'rgb(0,0,0,0.1)', padding: '8px' }}>
      <h4>
        Name: {name}{' '}
        <button type="button" onClick={handleRoutineSelected}>
          Select Activitiy
        </button>
      </h4>
      <p>Creator: {creatorName}</p>
      <p>Goal: {goal}</p>
      {!!activities.length && <strong>Activities: </strong>}
      {!!activities.length && activityList}
      {!last ? <hr /> : null}
    </li>
  )
}
export default SingleRoutine
