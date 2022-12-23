import { json } from '@remix-run/node'
import { useCatch, useLoaderData, useOutletContext } from '@remix-run/react'
import { useEffect } from 'react'
import { getActivities } from '~/utils'
import SingleActivity from './$activityId'

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
  const { activities } = await getActivities()
  // console.log('getActivities:', activities)

  if (activities.error) throw json(activities, { status: 500, statusText: activities.message })
  // const activityTest = []
  // for (let i = 0; i < 10; i++) {
  //   activityTest.push({
  //     id: i,
  //     name: `name${i}`,
  //     description: `description${i}`
  //   })
  // }

  // return json({ message: 'this is a test', activities: activityTest })
  return json(activities)
}

const AllActivities = () => {
  const { setActivities, setRoutines, setError, setMessage } = useOutletContext()

  const loaderData = useLoaderData()
  // console.log('loaderData:', loaderData)
  let actArr = []
  let loaderError = ''
  let loaderMessage = ''

  if (loaderData) {
    actArr = loaderData.activities || []
    loaderError = loaderData.error || ''
    loaderMessage = loaderData.message || ''
  }

  const activityMapCB = (activity) => (
    <SingleActivity key={activity.id} activity={activity} setRoutines={setRoutines} />
  )

  // map for activities
  const activityMap = actArr.map(activityMapCB)

  useEffect(() => {
    if (actArr.length) setActivities(actArr)
    if (loaderError) setError(loaderError)
    if (loaderMessage) setMessage(loaderMessage)
  }, [actArr, loaderError, loaderMessage])

  return <div>{!!actArr.length && activityMap}</div>
}

export default AllActivities
