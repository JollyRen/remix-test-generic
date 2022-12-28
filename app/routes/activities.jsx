import { Link, Outlet, useCatch } from '@remix-run/react'
import { useState } from 'react'
import { json } from '@remix-run/node'
import { createActivity } from '~/utils'
//comps
import NewActivity from '~/components/activities/NewActivity.jsx'
import RoutinesByActivity from '~/components/activities/RoutinesByActivity.jsx'
import NoActivities from '~/components/activities/NoActivities.jsx'
import SelectedActivity from '~/components/activities/SelectedActivity.jsx'

export function CatchBoundary() {
  const caught = useCatch()
  const { error, name, message } = caught.data
  console.log(caught)
  const liStyle = { listStyleType: 'none' }
  const divStyle = { display: 'flex', flexFlow: 'column', alignItems: 'center' }

  return (
    <div style={divStyle}>
      <h1>Error</h1>
      <h2>Status: {caught.status}</h2>
      <p>{name}</p>
      <ul>
        <li style={liStyle}>{error}</li>
        <li style={liStyle}>{message}</li>
      </ul>
    </div>
  )
}

export const action = async ({ request }) => {
  const formData = await request.formData()
  const { _action, ...data } = Object.fromEntries(formData)

  // throw if no actions
  if (!_action)
    throw json(
      { name: 'noActionNoData', error: 'noActionNoData', message: 'no action given or no data' },
      { status: 400, statusText: 'No Action given or no data' }
    )

  // actions
  if (_action == 'createActivity') {
    const { name, description } = data
    const { createdActivity } = await createActivity({ name, description })

    if (createdActivity.error) throw json(createdActivity)
    return json(createdActivity)
  }

  // fallback throw
  return json(
    { name: 'noActionNoData', error: 'noActionNoData', message: 'no action given or no data' },
    { status: 400, statusText: 'No Action given or no data' }
  )
}

function Activities() {
  const [activities, setActivities] = useState([])
  const [singleActivity, setSingleActivity] = useState({})
  const [routines, setRoutines] = useState([])
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [isNav, setIsNav] = useState(false)

  const localState = {
    setActivities,
    setSingleActivity,
    setRoutines,
    setError,
    setMessage
  }

  const handleIsNav = () => {
    setIsNav(!isNav)
  }

  console.log(singleActivity)
  return (
    <div>
      <h1>Activities</h1>
      <h2 style={{ marginBottom: '0px' }}>Create a New Activity</h2>
      <NewActivity />
      <h2>Selected Activity</h2>
      {singleActivity.id && <SelectedActivity activity={singleActivity} />}
      <h2>Routines By Selected Activity</h2>
      {!!routines.length && <RoutinesByActivity routines={routines} />}
      <div>
        <h2>List of Activities</h2>
        {!isNav && (
          <Link className="generic-link" to="./allactivities" onClick={handleIsNav}>
            Get Activities?
          </Link>
        )}
        {isNav && <Outlet context={localState} />}
        {!activities.length && <NoActivities error={error} message={message} />}
      </div>
    </div>
  )
}

export default Activities
