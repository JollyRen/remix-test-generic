import { useEffect } from 'react'
import { json } from '@remix-run/node'
import { useCatch, useLoaderData, useActionData, useOutletContext } from '@remix-run/react'
import SingleRoutine from '~/components/routines/SingleRoutine'
import { getRoutines, createRoutine } from '~/utils'

export function ErrorBoundary({ error }) {
  console.error(error)
  return (
    <div>
      <p>Uh oh! There's an Error!</p>
      <p>{error.detail}</p>
    </div>
  )
}

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

export const loader = async ({ request }) => {
  console.log('allroutines loader')
  const { routines } = await getRoutines()
  if (routines.error) throw json(routines, { status: 500, statusText: routines.message })
  return json(routines)
}

export const action = async ({ request }) => {
  try {
    // getting form data
    const formData = await request.formData()
    const { _action, ...data } = Object.fromEntries(formData)
    console.log(_action, data)

    //if no action
    if (!_action) {
      throw json({ message: 'No Action in request', error: 'noAction' })
    }

    // actions
    if (_action == 'createRoutine') {
      let { name, goal, isPublic } = data
      const { createdRoutine } = await createRoutine({ name, goal, isPublic })
      if (createdRoutine.error) throw json(createdRoutine)
      return json(createdRoutine)
    }

    // something unexpected
    throw json({ message: 'unknownError occured in action', error: 'unknownError' })
  } catch (error) {
    // error fetching
    console.error(error)
    throw json({ error, message: 'error fetching request' })
  }
}

const AllRoutines = () => {
  const {
    filterBy,
    setRoutines,
    setSingleRoutine,
    setError,
    setMessage,
    setFilterValue,
    setFilterBy
  } = useOutletContext()

  const localState = {
    filterBy,
    setSingleRoutine,
    setFilterValue,
    setFilterBy
  }

  const loaderData = useLoaderData()

  let routArr = []
  let loaderError = ''
  let loaderMessage = ''

  if (loaderData) {
    routArr = loaderData.routines || []
    loaderError = loaderData.error || ''
    loaderMessage = loaderData.message || ''
  }

  const routineCB = (routine, idx) => {
    return (
      <SingleRoutine
        key={routine.id}
        routine={routine}
        localState={localState}
        last={idx == routArr.length - 1 ? true : false}
      />
    )
  }

  const routineMap = routArr.map(routineCB)

  useEffect(() => {
    if (routArr.length) setRoutines(routArr)
    if (loaderError) setError(loaderError)
    if (loaderMessage) setMessage(loaderMessage)
  }, [routArr, loaderError, loaderMessage])

  return <div>{!!routArr.length && routineMap}</div>
}

export default AllRoutines
