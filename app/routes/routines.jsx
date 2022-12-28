import { Link, Outlet, useCatch, useFetcher } from '@remix-run/react'
import { json } from '@remix-run/node'
import { useEffect, useState } from 'react'
import { createRoutine } from '~/utils'
//comps
import SelectedRoutine from '~/components/routines/SelectedRoutine'
import NewRoutine from '~/components/routines/NewRoutine'
import NoRoutines from '~/components/routines/NoRoutines'

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
  if (_action == 'createRoutine') {
    // const {} = data
    // const { createdRoutine } = await createRoutine({})
    // if (createdRoutine.error) throw json(createdRoutine)
    // return json(createdRoutine)
  }

  // fallback throw
  throw json(
    { name: 'noActionNoData', error: 'noActionNoData', message: 'no action given or no data' },
    { status: 400, statusText: 'No Action given or no data' }
  )
}

const Routines = () => {
  // routine state
  const [routines, setRoutines] = useState([])
  const [singleRoutine, setSingleRoutine] = useState({})
  //error and message handling
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  // opens list of routines
  const [isNav, setIsNav] = useState(false)
  // used in searching activities and filtering them
  const [filterBy, setFilterBy] = useState('name')
  const [filterValue, setFilterValue] = useState('')
  //creating an object for props
  const localState = {
    filterBy,
    setRoutines,
    setSingleRoutine,
    setError,
    setMessage,
    setFilterBy,
    setFilterValue
  }
  const activitiesFetcher = useFetcher()

  useEffect(() => {
    if (singleRoutine.id) {
      activitiesFetcher.load('/activities/allactivities')
    }
  }, [filterValue])

  let allActs = activitiesFetcher.data?.activities ?? []

  const handleIsNav = () => setIsNav(!isNav)

  // CBs for activities
  const filteredActivitiesCB = (activity) => {
    const activities = singleRoutine?.activities
    const { id } = activity.id
    // check to see if the activity includes our filterValue
    const isContainsFilterValue = activity[filterBy].includes(filterValue)
    // check to see if it's already in the routine
    const isNotAlreadyAttached = activities?.length ? !activities.some((act) => id == act.id) : true
    // if it already has it (true) we don't want it (switch to false)
    // we want to make sure both conditions are true
    return isNotAlreadyAttached && isContainsFilterValue
  }

  // comp for map
  const SingleSearchedAct = ({ activity }) => (
    <div key={activity.id}>
      <p>
        <strong>{activity.name}</strong>
      </p>
      <p>{activity.description}</p>
    </div>
  )

  const allActsMapCB = (activity) => <SingleSearchedAct key={activity.id} activity={activity} />

  // filters and maps for activities
  let filteredAllActs = allActs.filter(filteredActivitiesCB)
  let actsMap = filteredAllActs.map(allActsMapCB)

  return (
    <article style={{ display: 'flex' }}>
      <section style={{ width: '66%' }}>
        <h1>Routines</h1>
        <h2 style={{ marginBottom: '0px' }}>Create a New Routine</h2>
        <NewRoutine />
        <h2>Selected Routine</h2>
        {singleRoutine.id && <SelectedRoutine activity={singleRoutine} />}
        <section>
          <h2>List of Routines</h2>
          {!isNav && (
            <Link className="generic-link" to="./allroutines" onClick={handleIsNav}>
              Get Routines?
            </Link>
          )}
          {isNav && <Outlet context={localState} />}
          {!routines.length && <NoRoutines error={error} message={message} />}
        </section>
      </section>
      <section style={{ width: '33%' }}>
        <h2>List of Searched Activities</h2>
        {!!actsMap.length && actsMap}
      </section>
    </article>
  )
}

export default Routines
