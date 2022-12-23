// import { json } from '@remix-run/node'
// import {
//   useActionData
//   // useCatch,
//   // useLoaderData,
//   // // useOutletContext,
//   // useTransition
// } from '@remix-run/react'
// // import { useEffect, useState } from 'react'
// import NewActivity from '~/components/NewActivity'
// // import SingleActivity from '~/components/SingleActivity'
// import RoutinesByActivity from '~/components/RoutinesByActivity'
// // import { getActivities } from '~/utils'
// import { useState } from 'react'
// import NoActivities from '~/components/NoActivities'
// import AllActivities from '~/components/AllActivities'
// export const loader = async () => {
//   const { activities } = await getActivities()
//   console.log('getActivities:', activities)

//   if (activities.error) throw json(activities, { status: 500, statusText: activities.message })

//   return json(activities)
// }

// export const action = async ({ request }) => {
//   if (!request) throw json({ error: 'No Request Sent', name: 'noRequest', message: 'No Request' })
//   const formData = await request.formData()
//   const { _action, ...values } = Object.fromEntries(formData)
//   if (_action == 'getRoutinesByActivity') {
//     //do stuff here
//   }
//   return null
// }

// export function CatchBoundary() {
//   const caught = useCatch()
//   const { error, name, message } = caught.data
//   console.log(caught)
//   const liStyle = { listStyleType: 'none' }
//   const divStyle = { display: 'flex', flexFlow: 'column', alignItems: 'center' }

//   return (
//     <div style={divStyle}>
//       <h1>Error</h1>
//       <h2>Status: {caught.status}</h2>
//       <p>{name}</p>
//       <ul>
//         <li style={liStyle}>{error}</li>
//         <li style={liStyle}>{message}</li>
//       </ul>
//     </div>
//   )
// }

// function Index() {
//   // const transition = useTransition()
//   // const activities = useLoaderData()
//   const routines = useActionData()
//   const [activities, setActivities] = useState([])
//   console.log('loader', activities)
//   const [error, setError] = useState('')
//   const [message, setMessage] = useState('')

//   const localState = {
//     activityState: [activities, setActivities],
//     errorState: [error, setError],
//     messageState: [message, setMessage]
//   }
// console.log('action', routines)
// const { activities: actArray, message } = activities
// const {
//   activityState: [publicActivities, setPublicActivities]
// } = useOutletContext()

// const [routinesByActivity, setRoutinesByActivity] = useState([])
// const [error, setError] = useState('')
// const [message, setMessage] = useState('')

// useEffect(() => {
//   if (activities.activities) {
//     const { message, activities: actArray } = activities
//     console.log(message)
//     setPublicActivities(actArray)
//   }
//   if (activities.error) {
//     const { error } = activities
//     setError(error.error)
//     setMessage(error.message)
//     console.error(`loader error`, error)
//   }
//   if (!activities.activities && !activities.error)
// }, [activities])

//mapping util for Activities
// const activityMapCB = (activity) => <SingleActivity key={activity.id} activity={activity} />
// // map for activities
// const activityMap = activities.map(activityMapCB)

//mapping util for Routines
//   return (
//     <div>
//       <h1>Activities</h1>
//       <h2 style={{ marginBottom: '0px' }}>Create a New Activity</h2>
//       <NewActivity />
//       <h2>Routines By Selected Activity</h2>
//       {routines && <RoutinesByActivity routines={routines} />}
//       <div>
//         <h2>List of Activities</h2>
//         <AllActivities localState={localState} />
//         {!activities.length && <NoActivities message={message} />}
//       </div>
//     </div>
//   )
// }

// export default Index

import { Link, Outlet, useActionData, useLoaderData } from '@remix-run/react'
import { useState } from 'react'
//comps
import NewActivity from '~/components/activities/NewActivity'
import RoutinesByActivity from '~/components/RoutinesByActivity'
import NoActivities from '~/components/activities/NoActivities'
// import AllActivities from '~/components/activities/AllActivities'

function Index() {
  const [activities, setActivities] = useState([])
  const [routines, setRoutines] = useState([])
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [isNav, setIsNav] = useState(false)

  const localState = {
    setActivities,
    setRoutines,
    setError,
    setMessage
  }

  const handleIsNav = () => {
    setIsNav(!isNav)
  }
  return (
    <div>
      <h1>Activities</h1>
      <h2 style={{ marginBottom: '0px' }}>Create a New Activity</h2>
      <NewActivity />
      <h2>Routines By Selected Activity</h2>
      {routines && <RoutinesByActivity routines={routines} />}
      <div>
        <h2>List of Activities</h2>
        {!isNav && (
          <Link className="generic-link" to="./allactivities" onClick={handleIsNav}>
            Get Activities?
          </Link>
        )}
        <Outlet context={localState} />
        {!activities.length && <NoActivities error={error} message={message} />}
      </div>
    </div>
  )
}

export default Index
