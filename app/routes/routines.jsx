import { Link, Outlet, useCatch, useFetcher, useActionData } from '@remix-run/react'
import { json } from '@remix-run/node'
import { useEffect, useState } from 'react'
import { createRoutine, attachActToRoutine } from '~/utils'
//comps
import SelectedRoutine from '~/components/routines/SelectedRoutine'
import NewRoutine from '~/components/routines/NewRoutine'
import NoRoutines from '~/components/routines/NoRoutines'
import SingleSearchedAct from '~/components/routines/SingleSearchedAct'

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
  console.log('routines action', formData)
  const { _action, ...data } = Object.fromEntries(formData)

  // throw if no actions
  if (!_action)
    throw json(
      { name: 'noActionNoData', error: 'noActionNoData', message: 'no action given or no data' },
      { status: 400, statusText: 'No Action given or no data' }
    )

  // actions
  if (_action == 'createRoutine') {
    const { name, goal, isPublic } = data
    const { createdRoutine } = await createRoutine({ name, goal, isPublic })
    if (createdRoutine.error) throw json(createdRoutine)
    return json(createdRoutine)
  }

  if (_action == 'attachActToRoutine') {
    const { activityId, count, duration, routineId } = data
    const { attachedAct } = attachActToRoutine({ activityId, count, duration, routineId })
    if (attachedAct?.error) throw json(attachedAct)
    console.log('attachedAct', attachedAct)
    return json(attachedAct)
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
  const fetcher = useFetcher()
  const actionData = useActionData()

  useEffect(() => {
    if (singleRoutine.id) {
      fetcher.load('/activities/allactivities')
    }
    console.log('actionData, useEffect: ', actionData?.data)
    if (actionData?.data.attachedAct) {
      const newRoutine = {
        ...singleRoutine,
        activities: [...singleRoutine.activities, actionData.data.attachedAct]
      }
      setSingleRoutine(newRoutine)
    }
  }, [filterValue, actionData?.data])

  let allActs = fetcher.data?.activities ?? []

  const handleIsNav = () => setIsNav(!isNav)

  // CBs for activities
  const filteredActivitiesCB = (activity) => {
    const activities = singleRoutine.activities || []
    const { id } = activity
    const activityData = activity[filterBy].toLowerCase()
    // check to see if the activity includes our filterValue
    const isContainsFilterValue = activityData.includes(filterValue)
    // check to see if it's already in the routine
    const isNotAlreadyAttached = !activities.some((act) => id == act.id)
    // if it already has it (true) we don't want it (switch to false)

    // we want to make sure both conditions are true
    return isNotAlreadyAttached && isContainsFilterValue
  }

  // filters and maps for activities
  const allActsMapCB = (activity) => (
    <SingleSearchedAct key={activity.id} activity={activity} routineId={singleRoutine.id} />
  )

  let filteredAllActs = allActs.filter(filteredActivitiesCB)
  let actsMap = filteredAllActs.map(allActsMapCB)

  return (
    <article style={{ display: 'flex' }}>
      <section style={{ width: '66%', marginBottom: '50px' }}>
        <h1>Routines</h1>
        <h2 style={{ marginBottom: '0px' }}>Create a New Routine</h2>
        <NewRoutine />
        <h2>Selected Routine</h2>
        {singleRoutine.id && <SelectedRoutine routine={singleRoutine} localState={localState} />}
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
