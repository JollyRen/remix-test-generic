import { json } from '@remix-run/node'
import { useLoaderData, useOutletContext } from '@remix-run/react'
import { useEffect, useState } from 'react'
import NewActivity from '~/components/NewActivity'
import SingleActivity from '~/components/SingleActivity'
import RoutinesByActivity from '~/components/RoutinesByActivity'
import { getActivities } from '~/utils'

export const loader = async () => {
  const response = await getActivities()
  console.log('getActivities:', response)

  return json(response)
}

function Index() {
  const loaderData = useLoaderData()
  const {
    activityState: [publicActivities, setPublicActivities]
  } = useOutletContext()

  const [routinesByActivity, setRoutinesByActivity] = useState([])
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (loaderData?.activities?.length) {
      const { message, activities } = loaderData
      console.log(message)
      setPublicActivities(activities)
    }
    if (loaderData?.error) {
      const { name, error, message } = loaderData
      setError(error)
      setMessage(message)
      console.error(`loader error`, error)
    }
  }, [loaderData])

  //mapping util for Activities
  const activityMapCB = (activity) => (
    <SingleActivity
      key={activity.id}
      activity={activity}
      routinesState={[routinesByActivity, setRoutinesByActivity]}
    />
  )
  console.log('publicActivities:', publicActivities)
  console.log('routinesByActivity:', routinesByActivity)

  // map for activities
  const activityMap = publicActivities.length ? publicActivities.map(activityMapCB) : null

  // no activities comp
  const noActivities = error && (
    <p>
      <span style={{ fontWeight: 'bold' }}>{message}</span>
    </p>
  )

  //mapping util for Routines
  return (
    <div>
      <h1>Activities</h1>
      <h2 style={{ marginBottom: '0px' }}>Create a New Activity</h2>
      <NewActivity />
      <h2>Routines By Selected Activity</h2>
      {routinesByActivity.length < 1 ? null : (
        <RoutinesByActivity routinesState={[routinesByActivity, setRoutinesByActivity]} />
      )}
      <h2>List of Activities</h2>
      {activityMap}
      {noActivities}
    </div>
  )
}

export default Index
