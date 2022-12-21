import { redirect, json } from '@remix-run/node'
import { Form, useActionData, useLoaderData } from '@remix-run/react'
import { useOutletContext } from 'public/build/_shared/chunk-C4NPS3YA'
import {
  getActivities,
  getRoutinesByActivity,
  createActivity,
  updateActivity
} from '~/utils/index.js'

export const loader = async ({ request: req, params }) => {
  const activities = await getActivities()
  return json({ activities })
}

export const action = async ({ request: req, params }) => {
  if (req._action == 'createActivity') {
    const body = {
      name: req.name,
      description: req.description
    }
    const createdActivity = await createActivity(body)
    return json(createdActivity)
  }
  if (req._action == 'updateActivity') {
    const body = {
      name: req?.name,
      description: req?.description,
      activityId: req.activityId
    }
    const updatedActivity = await updateActivity(body)
    return json(updatedActivity)
  }
  if (req._action == 'getRoutinesByActivity') {
    const body = { activityId: req.activityId }
    const routines = await getRoutinesByActivity(body)
    return json({ routines })
  }
  return
}

function Activities() {
  const { activities: fetchedActivities } = useLoaderData()
  const { routines: fetchedRoutines } = useActionData()
  const {
    routineState: [publicRoutines, setPublicRoutines],
    activityState: [puclicActivities, setPublicActivities]
  } = useOutletContext()

  return (
    <div>
      <h1>Activities</h1>
      <h2>Create a New Activity</h2>
      <Form method="post">
        <button type="submit" name="_action" value="createActivity"></button>
      </Form>
    </div>
  )
}

export default Activities
