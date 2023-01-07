// activities/allactivities/:activityId

import { json } from '@remix-run/node'
import { updateActivity, getRoutinesByActivity } from '~/utils'

// actions only happen on "POST"
export const action = async ({ request, params }) => {
  const formData = await request.formData()
  const {
    _action,
    values: { ...values }
  } = Object.fromEntries(formData)
  console.log(_action, values)

  if (_action == 'updateActivity') {
    const body = {
      name: values?.name,
      description: values?.description,
      activityId: values.activityId
    }
    const activity = await updateActivity(body)
    if (activity.error) throw json(activity)
    return json(activity)
  }

  return json({})
}

// loaders only happen on "GET"
export const loader = async ({ request, params }) => {
  const { routines } = await getRoutinesByActivity(params)
  if (routines.error) throw json(routines)
  // console.log(routines)
  return json(routines)
}
